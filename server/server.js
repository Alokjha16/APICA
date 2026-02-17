import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({ credentials: true }));

await connectDB();

app.get("/", (req, res) => {
  res.send("Server is running!");
});

if(process.env.NODE_ENV !== "production"){
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, ()=> console.log("Server is running on PORT: " + PORT));
}

export default app;