import { Request, Response } from "express"
import { loginUserSchema, registerUserSchema, verifyUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyResetPasswordOtpSchema } from "@project/shared"
import {User} from "../model/user.model.js";
import { asyncHandler, ValidationError,sendApiResponse , redisClient} from "@project/shared/server";
import {checkOtpRestrictions, sendOtp, verifyOtp} from "../utils/auth.helper.js";
import { PASSWORD_RESET_TOKEN_EXPIRY } from "../config/constants.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async( req : Request , res:Response) => {
	const {email} = registerUserSchema.parse(req.body);
	
	// check if user already exisits with same email
	const existingUser = await User.findOne({email});
	if(existingUser){
		throw new ValidationError("Email already registered...");
	}

	await checkOtpRestrictions({email}); 
	await sendOtp({email, subject:"Email Verification OTP"}); 

	return sendApiResponse({statusCode:200,message:"OTP sent !! Please verify your account",res})
})


export const verifyUser = asyncHandler(async(req:Request, res:Response) => {
	
	const validatedData = verifyUserSchema.parse(req.body);
	const {otp , ...userDetails} = validatedData;
	
	// check if user already exists
	const existingUser = await User.findOne({email : userDetails.email});
	if(existingUser){
		throw new ValidationError("User already exists...");
	}
	// verify OTP
	await verifyOtp({otp,email : validatedData.email});


	// new user
	const newUser = new User(userDetails);
	await newUser.save();
	const {password, ...newUserDetails} = newUser.toObject();

	return sendApiResponse({statusCode:201,message:"User verified and registerd successfully",data:newUserDetails,res});
})


export const loginUser = asyncHandler(async(req:Request, res:Response) => {
	const validatedData = loginUserSchema.parse(req.body);
	const {email, password} = validatedData;
	
	// check if user exists
	const existingUser = await User.findOne({email});
	if(!existingUser){
		throw new ValidationError("Invalid email or password");
	}

	// check password
	const isPasswordValid = await existingUser.comparePassword(password);
	if(!isPasswordValid){
		throw new ValidationError("Invalid email or password");
	}

	const {accessToken, refreshToken} = existingUser.generateTokens();
	const {password : pwd, ...userDetails} = existingUser.toObject();

	res.cookie("accessToken" , accessToken , {
		httpOnly : true,
		secure : true,
		maxAge : 15 * 60 * 1000, // 15 minutes
		sameSite : "none"
	});
	res.cookie("refreshToken" , refreshToken , {
		httpOnly : true,
		secure : true,
		maxAge : 24 * 60 * 60 * 1000, // 1 day
		sameSite : "none"
	});
	return sendApiResponse({statusCode:200,message:"User logged in successfully",data:userDetails,res});
})


export const forgotPassword = asyncHandler(async(req:Request,res:Response) => {
	const {email} = forgotPasswordSchema.parse(req.body); 
	
	const existingUser = await User.findOne({email});
	if(!existingUser){
		throw new ValidationError("User does not exist with this email");
	}

	await checkOtpRestrictions({email}); 
	await sendOtp({email,subject:"Password Reset OTP"}); 

	return sendApiResponse({statusCode:200,message:"OTP sent !! Please check your email to reset password",res});
})


export const verifyResetPasswordOtp = asyncHandler(async(req:Request, res:Response)=>{
	const {email,otp} = verifyResetPasswordOtpSchema.parse(req.body);
	
	// check if user already exists
	const existingUser = await User.findOne({email});
	if(!existingUser){
		throw new ValidationError("User does not exist with this email");
	}

	// verify OTP
	await verifyOtp({otp,email});

	const resetPasswordToken = existingUser.generateResetPasswordToken();

	// save in redis
	await redisClient.set(`reset_password_token:${existingUser._id}`, resetPasswordToken , {EX : PASSWORD_RESET_TOKEN_EXPIRY / 1000}); 

	return sendApiResponse({statusCode : 200, message : "OTP verified. Use resetToken to reset password" ,data : {token : resetPasswordToken},res});
})


export const resetPassword = asyncHandler(async(req:Request, res:Response)=> {
	const {newPassword, resetToken} = resetPasswordSchema.parse(req.body);

	// verify reset token
	const {user_id} = jwt.verify(resetToken, process.env.RESET_PASSWORD_TOKEN_SECRET as string) as {user_id:string};

	// check token in redis
	const storedToken = await redisClient.get(`reset_password_token:${user_id}`);
	if(!storedToken || storedToken !== resetToken){
		throw new ValidationError("Invalid or expired reset token");
	}

	// fetch user
	const user =  await User.findById(user_id);
	if(!user){
		throw new ValidationError("User does not exist");
	}

	user.password = newPassword;
	await user.save();

	// delete token from redis
	await redisClient.del(`reset_password_token:${user_id}`);

	return sendApiResponse({statusCode:200,message:"Password reset successful !! You can now login with your new password",res});
})