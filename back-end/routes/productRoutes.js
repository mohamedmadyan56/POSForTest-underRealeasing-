import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

// أي حد معاه توكن يقدر يشوف المنتجات
router.get("/", protect, getProducts);

// الأدمن والمدير فقط يقدروا يضيفوا منتج
router.post("/", protect, authorize("admin", "manager"), createProduct);

// الأدمن والمدير فقط يقدروا يعدلوا منتج
router.put("/:id", protect, authorize("admin", "manager"), updateProduct);

// الأدمن فقط هو اللي يقدر يمسح منتج
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;