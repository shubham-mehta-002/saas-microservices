import express,{ Router } from "express";
import { registerSendOtp , registerVerifyOtp , forgotPassword, loginUser, resetPassword,verifyResetPasswordOtp} from "../controllers/auth.controller.js";

const router : Router = express.Router();

router.post('/register' , registerSendOtp);
router.post('/verify-otp',registerVerifyOtp );
router.post('/login', loginUser);
router.post('/forget-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetPasswordOtp);
router.post('/reset-password', resetPassword);

export default router;