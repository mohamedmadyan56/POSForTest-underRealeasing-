import express from 'express';
// إضافة .js في نهاية المسارات
import { signup, login, logout, getMe } from "../controllers/userAuthController.js";
import { protectUser } from '../middlewares/userAuth.js';

const router = express.Router();

// المسارات الخاصة بك
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// مسار الحصول على بيانات المستخدم الحالي (محمي بـ protectUser)
router.get("/getMe", protectUser, getMe); 

export default router; // لا تنسى تصدير الـ router عشان تستخدمه في server.js
