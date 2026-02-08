import express from 'express'
import {getSettings,updateSettings} from "../controllers/adminSettingsController.js"
import {protectAdmin,authorizeAdmin} from '../middlewares/adminAuth.js'
const router = express.Router();


router.get("/",getSettings);
router.put("/",updateSettings);


export default router;
