import express from "express"
import {
    getSettings,
    updateSettings
} from "../controllers/adminSettingsController.js"





import { protect, authorize } from "../middlewares/auth.js"
const router = express.Router();


router.get("/",protect,getSettings)
router.put("/", protect, authorize("admin"), updateSettings);
export default router