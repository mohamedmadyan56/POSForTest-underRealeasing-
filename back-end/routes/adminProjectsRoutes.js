import express from 'express'
import {createProject,getAllProjects,getProjectById,updateProject,deleteProject} from "../controllers/adminProjectsController.js"
import {protectAdmin,authorizeAdmin} from '../middlewares/adminAuth.js'
const router = express.Router();
router.get("/",protectAdmin,authorizeAdmin("admin","super-admin"));


router.post("/",createProject)

router.get("/",getAllProjects)

router.get("/:id",getProjectById)
router.put("/:id",updateProject)
router.delete("/:id",deleteProject)



export default router