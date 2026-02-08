import express from "express";
import {
    getAdminNotifications,markAdminNotificationSeen,createAdminNotification,
} from "../controllers/adminNotificationsController.js"
import { protectUser } from "../middlewares/userAuth.js";


const router = express.Router();
router.get("/", protectUser, getAdminNotifications);
router.put("/:id", protectUser, markAdminNotificationSeen);

export default router

