import express from 'express'
import {getDasthboard} from '../controllers/adminDashboard.js';
import {protectAdmin,authorizeAdmin} from '../middlewares/adminAuth.js'
const router = express.Router();




router.get("/",protectAdmin,authorizeAdmin("admin","super-admin"),getDasthboard);
export default router ;
