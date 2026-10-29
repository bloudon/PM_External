import { Router } from "express";
import rateLimit from "express-rate-limit";
import { TrackHeroEventBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

export function createHeroEventsRouter() {
  const router = Router();
  // Independent from form limits: watching a video must not block a lead submission.
  router.use("/hero-events", rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 40,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many measurement events." },
  }));
  router.use("/hero-events", rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 3000,
    keyGenerator: () => "homepage-intro",
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Measurement is temporarily limited." },
  }));
  router.post("/hero-events", (req, res) => {
    if (!req.is("application/json")) {
      res.status(415).json({ error: "Send a JSON event." });
      return;
    }
    const parsed = TrackHeroEventBody.safeParse(req.body);
    // Do not allow arbitrary payloads (or PII) to enter the event logs.
    if (!parsed.success || Object.keys(req.body).length !== 1) {
      res.status(400).json({ error: "Invalid homepage event." });
      return;
    }
    logger.info({ measurement: "homepage_intro", eventName: parsed.data.eventName }, "Homepage event");
    res.status(204).end();
  });
  return router;
}
