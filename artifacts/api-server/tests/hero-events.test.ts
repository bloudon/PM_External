import assert from "node:assert/strict";
import { test } from "node:test";
import { once } from "node:events";
import { createApp } from "../src/app";

test("homepage measurements are allowlisted, anonymous, and separate from email", async () => {
  const server = createApp({
    production: true,
    mail: { configured: false, async send() { throw new Error("Events must never send email"); } },
  }).listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}/api/hero-events`;
  const post = (body: unknown, origin = "https://permitsmanager.com", contentType = "application/json") =>
    fetch(url, { method: "POST", headers: { "Content-Type": contentType, Origin: origin }, body: JSON.stringify(body) });
  try {
    for (const eventName of ["hero_video_start", "hero_video_half", "hero_video_complete", "hero_trial_click"]) {
      assert.equal((await post({ eventName })).status, 204);
    }
    assert.equal((await post({ eventName: "not_an_event" })).status, 400);
    assert.equal((await post({ eventName: "hero_video_start", email: "not-logged@example.invalid" })).status, 400);
    assert.equal((await post(null)).status, 400);
    assert.equal((await post({ eventName: "hero_video_start" }, "https://untrusted.invalid")).status, 403);
    assert.equal((await post({ eventName: "hero_video_start" }, "https://permitsmanager.com", "text/plain")).status, 415);
    // Event attempts consume their own limit, never the inquiry allowance.
    for (let i = 0; i < 34; i++) await post({ eventName: "hero_video_start" });
    assert.equal((await post({ eventName: "hero_video_start" })).status, 429);
    const inquiry = await fetch(url.replace("/hero-events", "/inquiries/contact"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://permitsmanager.com" },
      body: JSON.stringify({ fullName: "Test Visitor", workEmail: "visitor@example.invalid", message: "Testing form limit isolation." }),
    });
    assert.equal(inquiry.status, 503);
  } finally {
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});
