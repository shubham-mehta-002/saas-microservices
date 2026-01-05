import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";
import { getUser ,completeProfile, signUpAsFreelancer} from "../controller/user.controller.js";

const router : Router = Router();

router.get('/',isAuthenticated,getUser);
router.post('/profile',isAuthenticated,completeProfile);
router.post('/freelancer', isAuthenticated,signUpAsFreelancer)

export default router;