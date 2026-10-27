import express, { type ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import { logger } from "./lib/logger";
import { createMailService, type MailService } from "./lib/mail";
import { createInquiriesRouter } from "./routes/inquiries";
import healthRouter from "./routes/health";

export function createApp(options: {
  mail?: MailService;
  production?: boolean;
  rateMax?: number;
} = {}) {
  const app = express();
  const mail = options.mail ?? createMailService();
  const production = options.production ?? process.env.NODE_ENV === "production";
  const origins = new Set(["https://permitsmanager.com", "https://www.permitsmanager.com"]);
  app.disable("x-powered-by");
  // Only the loopback Nginx hop is trusted. Nginx must overwrite X-Forwarded-For.
  app.set("trust proxy", "loopback");
  app.use(pinoHttp({
    logger,
    serializers: {
      req: req => ({ id: req.id, method: req.method, url: req.url?.split("?")[0] }),
      res: res => ({ statusCode: res.statusCode }),
    },
  }));
  app.use("/api", (_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });
  app.use("/api", (req, res, next) => {
    const origin = req.get("origin");
    const localOrigin = `${req.protocol}://${req.get("host")}`;
    if (origin && !origins.has(origin) && (production || origin !== localOrigin)) {
      res.status(403).json({ error: "This website origin is not allowed." });
      return;
    }
    // Same-origin requests and non-browser operational checks need no CORS wildcard.
    next();
  });
  app.use("/api", healthRouter);
  app.get("/api/readyz", (_req, res) => {
    res.status(mail.configured ? 200 : 503).json({ emailConfigured: mail.configured });
  });
  app.use("/api/inquiries", rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: options.rateMax ?? 5,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many submissions. Please wait 15 minutes and try again." },
  }));
  // Hard global limit for this single-instance service, even across many IPs.
  app.use("/api/inquiries", rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 100,
    keyGenerator: () => "website",
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Email submissions are busy. Please try again later." },
  }));
  app.use(express.json({ limit: "16kb" }));
  app.use("/api", createInquiriesRouter(mail));
  const handleError: ErrorRequestHandler = (err, _req, res, _next) => {
    const status = err.type === "entity.too.large" ? 413 : err instanceof SyntaxError ? 400 : 500;
    res.status(status).json({ error: status === 413 ? "Submission is too large." :
      status === 400 ? "Invalid JSON submission." : "Request could not be processed." });
  };
  app.use(handleError);
  return app;
}

export default createApp();
