import express from 'express'
import {adminRegister,adminLogin,adminLogout,getMyProfile} from '../controllers/adminAuthController.js';
import { protectAdmin } from '../middlewares/adminAuth.js';
const router = express.Router()


router.post('/register',adminRegister);
router.post('/adminLogin',adminLogin);
router.get('/logout',adminLogout);
router.get('/me',getMyProfile);

export default router