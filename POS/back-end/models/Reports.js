import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["sales", "inventory", "customers", "invoices", "other"],
      default: "other",
    },
    period: {
      from: Date,
      to: Date,
    },
    summary: {
      type: String,
      default: "",
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
