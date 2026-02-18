import express from "express";
import { getAIInsights } from "../controllers/ai.controller.js";
const router = express.Router();

router.get("/", getAIInsights);

export default router;
