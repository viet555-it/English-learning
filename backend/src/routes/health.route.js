import { Router } from "express";
import { healthCheck } from "../controllers/heath.controller.js";

const router = Router();

router.get("/health", healthCheck);

export default router;