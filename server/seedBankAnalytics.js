import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import BankAnalytics from "./models/bankAnalytics.model.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await BankAnalytics.deleteMany({ email: "info@thakurbankfinance.com" });

    const bank = await BankAnalytics.create({
      name: "Thakur Bank of Finance",
      email: "info@thakurbankfinance.com",

      totalCustomers: 32000,
      totalRecommendations: 8700,
      revenueGenerated: 98000000,

      genderStats: {
        male: 17600,
        female: 13900,
        other: 500,
      },

      monthlySales: [
        { month: "Jan", value: 210 },
        { month: "Feb", value: 240 },
        { month: "Mar", value: 310 },
        { month: "Apr", value: 280 },
        { month: "May", value: 350 },
        { month: "Jun", value: 400 },
        { month: "Jul", value: 390 },
        { month: "Aug", value: 420 },
        { month: "Sep", value: 460 },
        { month: "Oct", value: 520 },
        { month: "Nov", value: 610 },
        { month: "Dec", value: 750 },
      ],
    });

    console.log("✅ Bank analytics seeded successfully");
    console.log(bank);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
