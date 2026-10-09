import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany();

    const users = [
      {
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        age: 26,
        gender: "Male",
        maritalStatus: 0,
        cityTier: 1,
        occupation: "Software Engineer",
        accountBalance: 400000,
        dailyTransactionFrequency: 9,
        onlineShoppingFrequency: 15,
        monthlyIncome: 95000,
        numberOfKids: 0,
      },
      {
        name: "Priya Joshi",
        email: "priya.joshi@example.com",
        age: 34,
        gender: "Female",
        maritalStatus: 1,
        cityTier: 1,
        occupation: "HR Manager",
        accountBalance: 850000,
        dailyTransactionFrequency: 6,
        onlineShoppingFrequency: 7,
        monthlyIncome: 125000,
        numberOfKids: 2,
      },
      {
        name: "Amit Kulkarni",
        email: "amit.kulkarni@example.com",
        age: 45,
        gender: "Male",
        maritalStatus: 1,
        cityTier: 2,
        occupation: "Business Owner",
        accountBalance: 1800000,
        dailyTransactionFrequency: 11,
        onlineShoppingFrequency: 5,
        monthlyIncome: 220000,
        numberOfKids: 1,
      },
      {
        name: "Sneha Patil",
        email: "sneha.patil@example.com",
        age: 23,
        gender: "Female",
        maritalStatus: 0,
        cityTier: 2,
        occupation: "Graphic Designer",
        accountBalance: 150000,
        dailyTransactionFrequency: 7,
        onlineShoppingFrequency: 18,
        monthlyIncome: 50000,
        numberOfKids: 0,
      },
      {
        name: "Vikram Reddy",
        email: "vikram.reddy@example.com",
        age: 52,
        gender: "Male",
        maritalStatus: 1,
        cityTier: 3,
        occupation: "Government Officer",
        accountBalance: 950000,
        dailyTransactionFrequency: 3,
        onlineShoppingFrequency: 2,
        monthlyIncome: 88000,
        numberOfKids: 3,
      },
      {
        name: "Neha Kapoor",
        email: "neha.kapoor@example.com",
        age: 30,
        gender: "Female",
        maritalStatus: 1,
        cityTier: 1,
        occupation: "Doctor",
        accountBalance: 2500000,
        dailyTransactionFrequency: 8,
        onlineShoppingFrequency: 6,
        monthlyIncome: 300000,
        numberOfKids: 1,
      },
      {
        name: "Rohan Mehta",
        email: "rohan.mehta@example.com",
        age: 28,
        gender: "Male",
        maritalStatus: 0,
        cityTier: 1,
        occupation: "Startup Founder",
        accountBalance: 600000,
        dailyTransactionFrequency: 13,
        onlineShoppingFrequency: 12,
        monthlyIncome: 170000,
        numberOfKids: 0,
      },
      {
        name: "Kavya Nair",
        email: "kavya.nair@example.com",
        age: 39,
        gender: "Female",
        maritalStatus: 1,
        cityTier: 2,
        occupation: "Teacher",
        accountBalance: 320000,
        dailyTransactionFrequency: 4,
        onlineShoppingFrequency: 3,
        monthlyIncome: 65000,
        numberOfKids: 2,
      },
      {
        name: "Arjun Singh",
        email: "arjun.singh@example.com",
        age: 44,
        gender: "Male",
        maritalStatus: 1,
        cityTier: 3,
        occupation: "Farmer",
        accountBalance: 180000,
        dailyTransactionFrequency: 2,
        onlineShoppingFrequency: 1,
        monthlyIncome: 42000,
        numberOfKids: 2,
      },
      {
        name: "Ananya Iyer",
        email: "ananya.iyer@example.com",
        age: 29,
        gender: "Female",
        maritalStatus: 0,
        cityTier: 1,
        occupation: "Data Analyst",
        accountBalance: 700000,
        dailyTransactionFrequency: 10,
        onlineShoppingFrequency: 14,
        monthlyIncome: 115000,
        numberOfKids: 0,
      },
    ];

    await User.insertMany(users);

    console.log("✅ 10 Users Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
