import exprees from "express"
import {
    createCustomer,getCustomers,updateCustomer,deleteCustomer
} from "../controllers/customerController.js"


const router = exprees.Router();

import {protect,authorize} from "../middlewares/auth.js"


router.get("/",protect,getCustomers);
router.post("/",protect,authorize("manager","admin","super-admin",createCustomer));
router.put("/:id",protect,authorize("manager","admin","super-admin",updateCustomer));
router.put("/:id",protect,authorize("manager","admin","super-admin",deleteCustomer));



export default router