import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { createInquiriesRouter } from "./inquiries";
import { createMailService } from "../lib/mail";

const router: IRouter = Router();

router.use(healthRouter);
router.use(createInquiriesRouter(createMailService()));

export default router;
