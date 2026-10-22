import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const marketingInquiriesTable = pgTable(
  "marketing_inquiries",
  {
    id: serial("id").primaryKey(),
    inquiryType: text("inquiry_type").notNull(),
    fullName: text("full_name").notNull(),
    workEmail: text("work_email").notNull(),
    companyName: text("company_name"),
    businessType: text("business_type"),
    phone: text("phone"),
    monthlyPermitVolume: text("monthly_permit_volume"),
    challenge: text("challenge"),
    message: text("message"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("marketing_inquiries_created_at_idx").on(table.createdAt)],
);

export const insertMarketingInquirySchema = createInsertSchema(
  marketingInquiriesTable,
).omit({ id: true, createdAt: true });
export type InsertMarketingInquiry = z.infer<
  typeof insertMarketingInquirySchema
>;
export type MarketingInquiry = typeof marketingInquiriesTable.$inferSelect;

export const marketingEventsTable = pgTable(
  "marketing_events",
  {
    id: serial("id").primaryKey(),
    eventName: text("event_name").notNull(),
    path: text("path").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("marketing_events_created_at_idx").on(table.createdAt)],
);

export const insertMarketingEventSchema = createInsertSchema(
  marketingEventsTable,
).omit({ id: true, createdAt: true });
export type InsertMarketingEvent = z.infer<typeof insertMarketingEventSchema>;
export type MarketingEvent = typeof marketingEventsTable.$inferSelect;
