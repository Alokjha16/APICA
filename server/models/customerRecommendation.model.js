import mongoose from "mongoose";

const CustomerRecommendationSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    product_type: {
      type: String,
      enum: ["Deposits", "Loans", "Credit Cards", "Insurance", "Investments"],
      required: true,
    },
    confidence_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ["Opened", "Ignored", "Converted"],
      default: "Opened",
    },
  },
  {
    timestamps: true, // creates createdAt and updatedAt fields
  }
);

const CustomerRecommendation = mongoose.model(
  "CustomerRecommendation",
  CustomerRecommendationSchema
);

export default CustomerRecommendation;
