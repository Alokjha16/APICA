import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import bankAnalyticsRoutes from "./routes/bankAnalytics.routes.js";
import productRoutes from "./routes/product.routes.js";
import customerRecommendationRoutes from "./routes/customerRecommendation.routes.js";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

await connectDB();

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Register route
app.use("/api/bank-analytics", bankAnalyticsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customer-recommendations", customerRecommendationRoutes);
app.use("/api/ai-insights", aiRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log("Server is running on PORT: " + PORT)
  );
}

export default app;
