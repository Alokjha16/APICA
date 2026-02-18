import express from "express";
import {
  getAllCustomerRecommendations,
  createCustomerRecommendation,
} from "../controllers/customerRecommendation.controller.js";

const router = express.Router();

// GET all customer recommendations, optional filters: ?product_type=&status=
router.get("/", getAllCustomerRecommendations);

// POST to create a recommendation
router.post("/", createCustomerRecommendation);

export default router;
