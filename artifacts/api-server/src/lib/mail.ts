import nodemailer from "nodemailer";

export type InquiryKind = "demo" | "access" | "contact";
export type MailMessage = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};
type Transport = {
  sendMail(message: MailMessage): Promise<{ accepted?: unknown[]; rejected?: unknown[] }>;
};
type MailConfig = { user: string; pass: string; from: string; to: string };
export type MailService = {
  configured: boolean;
  send(kind: InquiryKind, fields: Record<string, string>, reference: number): Promise<void>;
};

// Single bare email addresses only: no display names, lists or injected headers.
export function isMailbox(value: string): boolean {
  return value.length <= 254 && /^[^\s<>,;@\r\n]+@[^\s<>,;@\r\n]+\.[^\s<>,;@\r\n]+$/.test(value);
}

export function readMailConfig(env: NodeJS.ProcessEnv): MailConfig | undefined {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = env;
  if (SMTP_HOST !== "mail.smtp2go.com" || SMTP_PORT !== "587" ||
      !SMTP_USER?.trim() || !SMTP_PASS || /[\r\n]/.test(SMTP_USER) ||
      !SMTP_FROM || !isMailbox(SMTP_FROM) || !SMTP_TO || !isMailbox(SMTP_TO)) return;
  return { user: SMTP_USER, pass: SMTP_PASS, from: SMTP_FROM, to: SMTP_TO };
}

export function smtpOptions(config: MailConfig) {
  return {
    host: "mail.smtp2go.com",
    port: 587,
    secure: false, // Upgrade with mandatory STARTTLS; never send without TLS.
    requireTLS: true,
    auth: { user: config.user, pass: config.pass },
    tls: { rejectUnauthorized: true, minVersion: "TLSv1.2" as const },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    pool: false,
    logger: false,
    debug: false,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export function createMailService(
  env: NodeJS.ProcessEnv = process.env,
  transportFactory: (options: ReturnType<typeof smtpOptions>) => Transport =
    (options) => nodemailer.createTransport(options),
): MailService {
  const config = readMailConfig(env);
  const transport = config ? transportFactory(smtpOptions(config)) : undefined;
  const titles = { demo: "Demo request", access: "Company access request", contact: "Contact message" };
  const labels: Record<string, string> = {
    fullName: "Full name", workEmail: "Work email", companyName: "Company",
    businessType: "Business type", challenge: "Permitting details",
    phone: "Phone", monthlyPermitVolume: "Monthly permit volume", message: "Message",
  };
  return {
    configured: Boolean(config),
    async send(kind, fields, reference) {
      if (!config || !transport) throw new Error("MAIL_UNAVAILABLE");
      if (!isMailbox(fields.workEmail ?? "")) throw new Error("INVALID_REPLY_TO");
      const text = [
        `${titles[kind]} | Permits Manager`,
        `Reference: ${reference}`,
        ...Object.entries(fields).map(([key, value]) => `${labels[key] ?? key}:\n${value}`),
        ...(kind === "access" ? ["This is a company access request only. No account or invitation has been created."] : []),
      ].join("\n\n");
      const info = await transport.sendMail({
        from: config.from, to: config.to, replyTo: fields.workEmail,
        subject: `Permits Manager: ${titles[kind]} [${reference}]`,
        text,
      });
      if (!info.accepted?.length || info.rejected?.length) throw new Error("MAIL_NOT_ACCEPTED");
    },
  };
}
