import { Router } from "express";
import { createCollege, getAllActiveColleges, getAllColleges, toggleCollegeActiveStatus } from "../controller/college.controller.js";
import { injectUserFromGateway } from "@project/shared/server";

const router : Router = Router();


router.get('/', getAllColleges);
router.get('/active',getAllActiveColleges);

router.post('/',injectUserFromGateway,createCollege);
router.patch('/toggle-active-status',injectUserFromGateway,toggleCollegeActiveStatus);

export default router; 