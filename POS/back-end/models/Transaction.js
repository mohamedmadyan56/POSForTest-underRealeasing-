import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Transaction type is required"],
      enum: ["income", "expense", "refund"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: "general",
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Transaction", transactionSchema)