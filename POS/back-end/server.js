


import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/adminAuthRouters.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import adminProjectsRoutes from "./routes/adminProjectsRoutes.js";
import adminTransactionsRoutes from "./routes/adminTransactionsRoutes.js";
import adminNotificationsRoutes from "./routes/adminNotificaitonsRoutes.js";
import adminSettingsRoutes from "./routes/adminSettingsRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import invoiceRouters from "./routes/invoiceRouters.js";
import customerRoutes from "./routes/customerRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";

dotenv.config();

const app = express();

app.use(express.json()); // عشان السيرفر يفهم الـ JSON اللي بتبعتها من Postman
app.use(cors({
  origin: "http://localhost:5173", // عنوان الفرونت-إند بتاعك
  credentials: true // ضروري جداً عشان يسمح بنقل الكوكيز والتوكن
})); // عشان يسمح للفرونت-إند يكلم الباك-إند
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/admin/dashboard", adminDashboardRoutes);
app.use("/api/v1/admin/projects", adminProjectsRoutes);
app.use("/api/v1/admin/transactions", adminTransactionsRoutes);
app.use("/api/v1/admin/notifications", adminNotificationsRoutes);
app.use("/api/v1/admin/settings", adminSettingsRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/invoices", invoiceRouters);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/notifications", notificationRoutes);
// settingsRoutes temporarily disabled due to route import fixes pending
app.use("/api/v1/users", userAuthRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE || process.env.MONGO_URI || "mongodb://localhost:27017/pos";

mongoose
  .connect(DB)
  .then(() => console.log("✅ DB connected successfully!"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});