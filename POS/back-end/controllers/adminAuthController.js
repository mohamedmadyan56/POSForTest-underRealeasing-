import catchAsync from "../utils/catchAsync.js";
import { sendAdminToken } from "../utils/generateAdminToken.js";
import AppError from "../utils/appError.js";
import User from "../models/User.js";

// Admin Register
export const adminRegister = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("Please provide name, email and password", 400));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError("Email already exists", 400));
  }

  const admin = await User.create({
    name,
    email,
    password,
    role: "admin",
  });

  await sendAdminToken(admin, res);
});

// Admin Login
export const adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const admin = await User.findOne({ email, role: "admin" }).select("+password");

  if (!admin || !(await admin.comparePassword(password, admin.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  await sendAdminToken(admin, res);
});

// Admin Logout
export const adminLogout = (req, res) => {
  res.cookie("admin_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// Get My Profile
export const getMyProfile = catchAsync(async (req, res, next) => {
  const admin = await User.findById(req.admin._id);

  if (!admin) {
    return next(new AppError("Admin not found", 404));
  }

  res.status(200).json({
    success: true,
    admin,
  });
});