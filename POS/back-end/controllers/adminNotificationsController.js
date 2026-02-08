import AdminNotification from "../models/adminNotifications.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAdminNotifications = catchAsync(async (req, res, next) => {
    const notes = await AdminNotification.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        results: notes.length,
        data: notes,
    });
});

export const markAdminNotificationSeen = catchAsync(async (req, res, next) => {
    const note = await AdminNotification.findByIdAndUpdate(
        req.params.id,
        { seen: true },
        { new: true }
    );

    if (!note) {
        return next(new AppError("Notifications not found", 404));
    }

    res.status(200).json({
        success: true,
        data: note,
    });
});

export const createAdminNotification = catchAsync(async (req, res, next) => {
    const { message, type } = req.body;
    if (!message || !type) {
        return next(new AppError("please provide message and type", 400));
    }

    const note = await AdminNotification.create({
        message,
        type,
    });
    res.status(201).json({
        success: true,
        data: note,
    });
});