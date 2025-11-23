import express,{ Router } from "express";
import { registerUser , verifyUser, forgotPassword, loginUser, resetPassword,verifyResetPasswordOtp} from "../controllers/auth.controller.js";

const router : Router = express.Router();

router.post('/register' , registerUser);
router.post('/verify-user',verifyUser);
router.post('/login', loginUser);
router.post('/forget-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetPasswordOtp);
router.post('/reset-password', resetPassword);

export default router;