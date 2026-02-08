import express from 'express'
import {getAllTransactions,createTransaction,getTransactionById,updateTransaction,deleteTransaction}
from "../controllers/adminTransactionController.js";
import {protectAdmin,authorizeAdmin} from '../middlewares/adminAuth.js';
const router = express.Router();

router.get("/",protectAdmin,authorizeAdmin("admin","super-admin"));


router.post('/',createTransaction);
router.get("/",getAllTransactions);
router.get("/:id",getTransactionById);
router.put("/:id",updateTransaction);
router.delete("/:id",deleteTransaction);


export default router;
