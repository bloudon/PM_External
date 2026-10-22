import { Router, type IRouter } from "express";
import {
  db,
  marketingEventsTable,
  marketingInquiriesTable,
} from "@workspace/db";
import {
  SubmitAccessRequestBody,
  SubmitAccessRequestResponse,
  SubmitContactRequestBody,
  SubmitContactRequestResponse,
  SubmitDemoRequestBody,
  SubmitDemoRequestResponse,
  TrackMarketingEventBody,
  TrackMarketingEventResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/inquiries/demo", async (req, res): Promise<void> => {
  const parsed = SubmitDemoRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [inquiry] = await db
    .insert(marketingInquiriesTable)
    .values({
      inquiryType: "demo",
      fullName: parsed.data.fullName,
      workEmail: parsed.data.workEmail,
      companyName: parsed.data.companyName,
      businessType: parsed.data.businessType,
      challenge: parsed.data.challenge ?? null,
    })
    .returning({ id: marketingInquiriesTable.id });

  res.status(201).json(
    SubmitDemoRequestResponse.parse({
      id: inquiry.id,
      status: "received",
      message: "Your demo request has been received.",
    }),
  );
});

router.post("/inquiries/access", async (req, res): Promise<void> => {
  const parsed = SubmitAccessRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [inquiry] = await db
    .insert(marketingInquiriesTable)
    .values({
      inquiryType: "access",
      fullName: parsed.data.fullName,
      workEmail: parsed.data.workEmail,
      companyName: parsed.data.companyName,
      businessType: parsed.data.businessType,
      phone: parsed.data.phone ?? null,
      monthlyPermitVolume: parsed.data.monthlyPermitVolume,
    })
    .returning({ id: marketingInquiriesTable.id });

  res.status(201).json(
    SubmitAccessRequestResponse.parse({
      id: inquiry.id,
      status: "received",
      message: "Your access request has been saved. No account has been created.",
    }),
  );
});

router.post("/inquiries/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [inquiry] = await db
    .insert(marketingInquiriesTable)
    .values({
      inquiryType: "contact",
      fullName: parsed.data.fullName,
      workEmail: parsed.data.workEmail,
      companyName: parsed.data.companyName ?? null,
      message: parsed.data.message,
    })
    .returning({ id: marketingInquiriesTable.id });

  res.status(201).json(
    SubmitContactRequestResponse.parse({
      id: inquiry.id,
      status: "received",
      message: "Your message has been received.",
    }),
  );
});

router.post("/marketing-events", async (req, res): Promise<void> => {
  const parsed = TrackMarketingEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [event] = await db
    .insert(marketingEventsTable)
    .values(parsed.data)
    .returning({ id: marketingEventsTable.id });

  res.status(202).json(
    TrackMarketingEventResponse.parse({
      id: event.id,
      status: "received",
      message: "Event recorded.",
    }),
  );
});

export default router;
