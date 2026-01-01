import express,{ Router } from "express";
import { registerSendOtp , registerVerifyOtp , forgotPassword, loginUser, resetPassword,logoutUser, refreshToken,getUser} from "../controller/auth.controller.js";
import passport from "passport";
import { googleAuthCallback } from "../controller/google-auth.controller.js";
import {isAuthenticated} from "../middleware/isAuthenticated.middleware.js";

const router : Router = express.Router();

router.post('/register' , registerSendOtp);
router.post('/verify-otp',registerVerifyOtp );
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get("/google",passport.authenticate("google", { scope: ["email", "profile"] }));
router.get("/google/callback",passport.authenticate("google", { session: false }),googleAuthCallback);
router.post('/logout',logoutUser);
router.post('/refresh',refreshToken)
router.get('/user',isAuthenticated,getUser);
export default router;