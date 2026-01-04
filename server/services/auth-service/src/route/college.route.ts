import { Router } from "express";
import { createCollege, getAllActiveColleges, getAllColleges, toggleCollegeActiveStatus } from "../controller/college.controller.js";

const router : Router = Router();


router.get('/', getAllColleges);
router.get('/active',getAllActiveColleges);
router.post('/',createCollege);
router.patch('/toggle-active-status',toggleCollegeActiveStatus);

export default router; 