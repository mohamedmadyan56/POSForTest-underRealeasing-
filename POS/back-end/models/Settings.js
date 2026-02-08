import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    // 🏪 بيانات المحل
    storeName: {
      type: String,
      default: "My Store",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    logo: {
      type: String,
      default: "",
    },

    // 💰 بيانات مالية
    taxRate: {
      type: Number,
      default: 14,
      min: [0, "Tax rate cannot be negative"],
      max: [100, "Tax rate cannot be more than 100"],
    },
    currency: {
      type: String,
      default: "EGP",
      enum: ["EGP", "USD", "SAR", "AED", "EUR"],
    },

    // 🧾 بيانات الفاتورة
    invoiceFooter: {
      type: String,
      default: "Thank you for your purchase!",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);