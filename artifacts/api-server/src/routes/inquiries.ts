import { randomInt } from "node:crypto";
import { Router } from "express";
import {
  SubmitAccessRequestBody, SubmitContactRequestBody, SubmitDemoRequestBody,
} from "@workspace/api-zod";
import { isMailbox, type InquiryKind, type MailService } from "../lib/mail";

export function createInquiriesRouter(mail: MailService) {
  const router = Router();
  const schemas = {
    demo: SubmitDemoRequestBody,
    access: SubmitAccessRequestBody,
    contact: SubmitContactRequestBody,
  };
  for (const kind of ["demo", "access", "contact"] as const) {
    router.post(`/inquiries/${kind}`, async (req, res): Promise<void> => {
      if (!req.is("application/json")) {
        res.status(415).json({ error: "Send a JSON form submission." });
        return;
      }
      const input = req.body && typeof req.body === "object" && !Array.isArray(req.body)
        ? Object.fromEntries(Object.entries(req.body).map(([key, value]) =>
          [key, typeof value === "string" ? value.trim() : value]))
        : req.body;
      const parsed = schemas[kind].safeParse(input);
      if (!parsed.success || !isMailbox(parsed.data.workEmail) ||
          /[\r\n\u0000]/.test(parsed.data.fullName) ||
          /[\r\n\u0000]/.test(parsed.data.companyName ?? "") ||
          Object.values(parsed.data).some(value =>
            typeof value === "string" && (value.includes("\u0000") ||
              (value.match(/https?:\/\//gi)?.length ?? 0) > 3))) {
        res.status(400).json({ error: "Check the form fields and remove excessive links before trying again." });
        return;
      }
      if (!mail.configured) {
        res.status(503).json({ error: "Email submissions are temporarily unavailable. Please try again later." });
        return;
      }
      // Safe integer response contract, without a database or persistent lead storage.
      const id = randomInt(1, 2 ** 48 - 1);
      try {
        await mail.send(kind as InquiryKind, parsed.data as Record<string, string>, id);
        res.status(201).json({
          id, status: "received",
          message: kind === "access"
            ? "Your access request has been submitted for email delivery. No account has been created."
            : `Your ${kind === "demo" ? "demo request" : "message"} has been submitted for email delivery.`,
        });
      } catch {
        // SMTP errors can contain credentials, addresses or message content. Never log them.
        req.log.warn({ inquiryType: kind, reference: id }, "Submission email could not be confirmed");
        res.status(502).json({ error: "We could not confirm email delivery. Your form has not been cleared; please try again later." });
      }
    });
  }
  // Explicitly retired. No storage and no emails for marketing clicks.
  router.post("/marketing-events", (_req, res) => {
    res.status(410).json({ error: "Marketing event tracking is disabled." });
  });
  return router;
}
