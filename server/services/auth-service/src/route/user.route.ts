import { Router } from "express";
import { injectUserFromGateway } from "@project/shared/server";
import { getUser ,completeProfile, signUpAsFreelancer} from "../controller/user.controller.js";

const router : Router = Router();

router.get('/',injectUserFromGateway,getUser);
router.post('/profile',injectUserFromGateway,completeProfile);
router.post('/freelancer', injectUserFromGateway,signUpAsFreelancer)

export default router;