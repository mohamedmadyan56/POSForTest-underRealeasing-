import express from "express";
import {
    
  dailyReport,
  rangeReport,
  topProducts
} from "../controllers/reportsController.js"; //
import { protect, authorize } from "../middlewares/auth.js"; //

const router = express.Router();

// تقرير المبيعات اليومي - متاح للمدير والأدمن فقط
router.post("/daily", protect, authorize("manager", "admin"), dailyReport);

// تقرير المبيعات لفترة محددة - متاح للمدير والأدمن فقط
router.post("/range", protect, authorize("manager", "admin"), rangeReport);

// تقرير المنتجات الأكثر مبيعاً - متاح للمدير والأدمن فقط
router.get("/top-products", protect, authorize("manager", "admin"), topProducts);

export default router; //