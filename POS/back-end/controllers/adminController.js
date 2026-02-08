import Admin from "../models/Admin.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await Admin.find();

  res.status(200).json({
    status: "success",
    results: admins.length,
    data: { admins },
  });
});

export const getAdminById = catchAsync(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    return next(new AppError("No admin found with that ID 🔍", 404));
  }

  res.status(200).json({
    status: "success",
    data: { admin },
  });
});

export const updateAdmin = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(
      new AppError(
        "This route is not for password updates. Use /updatePassword 🔐",
        400
      )
    );
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedAdmin) {
    return next(new AppError("No admin found with that ID 🔍", 404));
  }

  res.status(200).json({
    status: "success",
    data: { admin: updatedAdmin },
  });
});

export const deleteAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    return next(new AppError("No admin found with that ID 🔍", 404));
  }

  if (req.params.id === req.admin.id) {
    return next(new AppError("You cannot delete yourself! 🚫", 400));
  }

  await Admin.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});