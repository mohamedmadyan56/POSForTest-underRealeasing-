import mongoose from "mongoose"
import validator  from"validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import timeStamp  from "console";

const userSchema = new mongoose.Schema({
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
    enum: ["admin", "manager", "super-admin","cashier"],
    default: "cashier"
  },
  passwordChangedAt: Date,
}, { timestamps: true });


userSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password)
} //  الي اليوزر هيدخله هو هو الباسورد الي في الداتا بيزpassدي فانكشن بتتأكد ان ال 
// this.password بيمثل الوزر الي طالع من الداتا بيز

userSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
}



const User = mongoose.model("User", userSchema);
export default User;