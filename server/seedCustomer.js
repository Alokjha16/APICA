import mongoose from "mongoose";
import dotenv from "dotenv";
import CustomerRecommendation from "./models/customerRecommendation.model.js";
import { connectDB } from "./config/db.js";

dotenv.config();
await connectDB();

// List of 25 customer names
const customerNames = [
  "Jain Prashal Ramesh",
  "Jain Jainam Pankaj",
  "Jaiswal Aryan Sanjay",
  "Jha Alokkumar Manoj",
  "Kadam Siddhika Santosh",
  "Kadam Vedant Jeevan",
  "Kadam Vinit Jeevan",
  "Kambli Suhani Subodh",
  "Kanaki Ravishankar Chandrakant",
  "Kanchan Ananya Harish",
  "Kankariya Tanvi Ajit",
  "Kaple Vinit Sandip",
  "Kapri Muskan Lakshman",
  "Kaunain Yasoub Shahnawaz Parwez",
  "Khan Sameer Jiyaullah",
  "Khandelwal Chinmay Gopal",
  "Kharnar Janhavi Sandeep",
  "Khatib Mohammed Zakiulla Mohd Wasiullah Khatib",
  "Konda Ananya Mohan",
  "Kosta Aditi Mahesh",
  "Kothari Aadarsh Sanjay",
  "Kothari Rudra Jitendra",
  "Jain Isha Ganesh",
  "Maurya Daksh Rajesh Kumar",
  "Badgujar Jidnyesh Deepak",
];

// Possible products and statuses
const productTypes = ["Deposits", "Loans", "Credit Cards", "Insurance", "Investments"];
const statuses = ["Opened", "Ignored", "Converted"];

// Generate random recommendations
const recommendations = customerNames.map((name) => ({
  customer_name: name,
  email: name.split(" ").join(".").toLowerCase() + "@gmail.com",
  product_type: productTypes[Math.floor(Math.random() * productTypes.length)],
  confidence_score: Math.floor(Math.random() * 41) + 60, // 60-100%
  status: statuses[Math.floor(Math.random() * statuses.length)],
}));

const seedDB = async () => {
  try {
    await CustomerRecommendation.deleteMany(); // clear existing data
    await CustomerRecommendation.insertMany(recommendations);
    console.log("✅ 25 Customer Recommendations seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedDB();
