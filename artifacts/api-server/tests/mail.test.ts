import assert from "node:assert/strict";
import { test } from "node:test";
import { once } from "node:events";
import { createApp } from "../src/app";
import { createMailService, readMailConfig, smtpOptions, type MailMessage } from "../src/lib/mail";

// Deliberately fictitious fixtures, never loaded from a real environment file.
const env = {
  SMTP_HOST: "mail.smtp2go.com", SMTP_PORT: "587",
  SMTP_USER: "test-only", SMTP_PASS: "not-a-real-password",
  SMTP_FROM: "sender@example.test", SMTP_TO: "inbox@example.test",
};
const demo = {
  fullName: "Example Person", workEmail: "visitor@example.test",
  companyName: "Example Company", businessType: "contractor",
  challenge: "Current process: Spreadsheet\n\nPermitting challenge: Track inspections",
};

async function fixture(
  run: (post: (path: string, body: unknown, headers?: Record<string, string>) => Promise<Response>,
    messages: MailMessage[], app: ReturnType<typeof createApp>) => Promise<void>,
  options: { failure?: Error; accepted?: unknown[]; rejected?: unknown[]; config?: NodeJS.ProcessEnv; limit?: number } = {},
) {
  const messages: MailMessage[] = [];
  const mail = createMailService(options.config ?? env, () => ({
    async sendMail(message) {
      messages.push(message);
      if (options.failure) throw options.failure;
      return { accepted: options.accepted ?? [env.SMTP_TO], rejected: options.rejected ?? [] };
    },
  }));
  const app = createApp({ mail, production: true, rateMax: options.limit ?? 100 });
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}`;
  try {
    await run((path, body, headers = {}) => fetch(`${url}/api${path}`, {
      method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body),
    }), messages, app);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
}

test("configuration requires SMTP2GO STARTTLS and all server-only settings", () => {
  assert.ok(readMailConfig(env));
  for (const key of Object.keys(env)) {
    assert.equal(readMailConfig({ ...env, [key]: "" }), undefined, key);
  }
  for (const override of [
    { SMTP_PORT: "465" }, { SMTP_HOST: "other.example.test" },
    { SMTP_FROM: "sender@example.test\r\nBcc: attacker@example.test" },
    { SMTP_TO: "first@example.test,second@example.test" },
  ]) assert.equal(readMailConfig({ ...env, ...override }), undefined);
  const config = readMailConfig(env)!;
  const options = smtpOptions(config);
  assert.equal(options.port, 587);
  assert.equal(options.secure, false);
  assert.equal(options.requireTLS, true);
  assert.equal(options.tls.rejectUnauthorized, true);
  assert.equal(options.debug, false);
  assert.ok(options.connectionTimeout <= 10_000);
  assert.ok(options.socketTimeout <= 20_000);
});

test("each form emails all fields with fixed headers and a contract-compatible response", async () => {
  await fixture(async (post, messages) => {
    const cases = [
      ["demo", demo],
      ["access", { ...demo, phone: "+1 555 000 0000", monthlyPermitVolume: "11-25" }],
      ["contact", { fullName: demo.fullName, workEmail: demo.workEmail,
        companyName: demo.companyName, message: "Please explain the inspection workflow." }],
    ] as const;
    for (const [kind, body] of cases) {
      const res = await post(`/inquiries/${kind}`, body);
      assert.equal(res.status, 201);
      const result = await res.json();
      assert.equal(result.status, "received");
      assert.ok(Number.isSafeInteger(result.id));
      const message = messages.at(-1)!;
      assert.equal(message.from, env.SMTP_FROM);
      assert.equal(message.to, env.SMTP_TO);
      assert.equal(message.replyTo, body.workEmail);
      assert.ok(message.subject.includes(String(result.id)));
      for (const [key, value] of Object.entries(body)) {
        // access schema intentionally ignores the extra demo challenge.
        if (kind === "access" && key === "challenge") continue;
        assert.ok(message.text.includes(value), `${kind}: ${key}`);
      }
      if (kind === "access") assert.match(result.message, /No account has been created/);
    }
  });
});

test("blank optional demo details work and supplied From/To/Subject cannot override headers", async () => {
  await fixture(async (post, messages) => {
    const { challenge: _, ...body } = demo;
    assert.equal((await post("/inquiries/demo", {
      ...body, from: "attacker@example.test", to: "attacker@example.test", subject: "Override",
    })).status, 201);
    assert.equal(messages[0].to, env.SMTP_TO);
    assert.equal(messages[0].from, env.SMTP_FROM);
    assert.ok(!messages[0].subject.includes("Override"));
    assert.ok(!messages[0].text.includes("undefined"));
  });
});

test("invalid input, email injection, oversized fields and spam do not send", async () => {
  await fixture(async (post, messages) => {
    for (const body of [
      {}, { ...demo, workEmail: "bad" },
      { ...demo, workEmail: "visitor@example.test\r\nBcc: other@example.test" },
      { ...demo, fullName: "Example\nBcc: other@example.test" },
      { ...demo, challenge: "x".repeat(2001) },
      { ...demo, challenge: "https://a.test ".repeat(4) },
    ]) assert.equal((await post("/inquiries/demo", body)).status, 400);
    assert.equal((await post("/inquiries/demo", { ...demo, challenge: "x".repeat(20_000) })).status, 413);
    assert.equal((await post("/inquiries/demo", demo, { "Content-Type": "text/plain" })).status, 415);
    assert.equal(messages.length, 0);
  });
});

test("missing mail configuration returns an explicit unavailable response, never success", async () => {
  await fixture(async (post, messages) => {
    const res = await post("/inquiries/demo", demo);
    assert.equal(res.status, 503);
    assert.equal(messages.length, 0);
  }, { config: {} });
});

for (const failure of [
  new Error("SMTP auth failed with confidential server response"),
  new Error("ETIMEDOUT with confidential details"),
]) {
  test("SMTP rejection/timeout produces a safe failure response", async () => {
    await fixture(async (post) => {
      const res = await post("/inquiries/contact", {
        fullName: demo.fullName, workEmail: demo.workEmail, message: "A valid contact message",
      });
      assert.equal(res.status, 502);
      const text = await res.text();
      assert.ok(!text.includes("confidential"));
      assert.match(text, /not been cleared/);
    }, { failure });
  });
}

test("no accepted recipient or any rejected recipient cannot report success", async () => {
  for (const option of [{ accepted: [] }, { rejected: [env.SMTP_TO] }]) {
    await fixture(async post => {
      assert.equal((await post("/inquiries/demo", demo)).status, 502);
    }, option);
  }
});

test("rate limit blocks excess messages and returns retry information", async () => {
  await fixture(async (post, messages) => {
    assert.equal((await post("/inquiries/demo", demo)).status, 201);
    const res = await post("/inquiries/demo", demo);
    assert.equal(res.status, 429);
    assert.ok(res.headers.get("retry-after"));
    assert.equal(messages.length, 1);
  }, { limit: 1 });
});

test("cross-origin submissions are blocked and marketing events are explicitly disabled", async () => {
  await fixture(async (post, messages, app) => {
    assert.equal((await post("/inquiries/demo", demo, { Origin: "https://attacker.example.test" })).status, 403);
    assert.equal((await post("/inquiries/demo", demo, { Origin: "https://permitsmanager.com" })).status, 201);
    assert.equal((await post("/marketing-events", {})).status, 410);
    assert.equal(messages.length, 1);
    const trust = app.get("trust proxy fn");
    assert.equal(trust("127.0.0.1"), true);
    assert.equal(trust("203.0.113.5"), false);
  });
});

test("success is withheld until the transport accepts the mail", async () => {
  let release!: () => void;
  let started!: () => void;
  const entered = new Promise<void>(resolve => { started = resolve; });
  const gate = new Promise<void>(resolve => { release = resolve; });
  const service = createMailService(env, () => ({
    async sendMail() { started(); await gate; return { accepted: [env.SMTP_TO] }; },
  }));
  let finished = false;
  const pending = service.send("demo", demo, 1).then(() => { finished = true; });
  await entered;
  assert.equal(finished, false);
  release();
  await pending;
  assert.equal(finished, true);
});
