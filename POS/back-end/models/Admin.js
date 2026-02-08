import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false
  },
  role: {
    type: String,
    enum: ["super-admin", "admin"],
    default: "admin"
  },
  passwordChangedAt: Date,
}, { timestamps: true })






adminSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
}

adminSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
}

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;