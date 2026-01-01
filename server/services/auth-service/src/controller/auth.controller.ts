import { Request, Response } from "express"
import { loginUserSchema, registerOtpRequestSchema , verifyOtpSchema, forgotPasswordRequestSchema, resetPasswordSchema } from "@project/shared"
import {User} from "../model/user.model.js";
import { asyncHandler, ValidationError,sendApiResponse , redisClient, AuthenticationError} from "@project/shared/server";
import {checkOtpRestrictions, sendForgetPasswordRequestMailHepler, sendOtp, verifyOtp} from "../utils/auth.helper.js";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwtPayload.js";

// for sending OTP 
export const registerSendOtp = asyncHandler(async( req : Request , res:Response) => {
	const {email} = registerOtpRequestSchema.parse(req.body);
	
	// check if user already exisits with same email
	const existingUser = await User.findOne({email});
	if(existingUser){
		throw new ValidationError("Email already registered");
	}

	await checkOtpRestrictions({email}); 
	await sendOtp({email, subject:"Email Verification OTP"}); 

	return sendApiResponse({statusCode:200,message:"OTP sent !! Please verify your account",res})
})

// for verifying OTP and creating a new user based on signup details 
export const registerVerifyOtp  = asyncHandler(async(req:Request, res:Response) => {
	
	const validatedData = verifyOtpSchema.parse(req.body);
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
	const existingUser = await User.findOne({email}).select("+password");
	if(!existingUser){
		throw new ValidationError("Invalid email or password");
	}
	
	// check auth provider
	if (existingUser.authProvider === "google") {
		throw new ValidationError("Please login using Google");
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
	const {email} = forgotPasswordRequestSchema.parse(req.body); 
	
	const existingUser = await User.findOne({email});
	if(!existingUser){
		throw new ValidationError("User does not exist with this email");
	}
	// return sendApiResponse({statusCode:200,message:"OTP sent !! Please check your email to reset password",res});
	const resetPasswordToken = existingUser.generateResetPasswordToken();
	await sendForgetPasswordRequestMailHepler({email,resetPasswordToken,userId:(existingUser._id).toString()})

	return sendApiResponse({statusCode : 200, message : "Please check your email to reset password" ,data : {token : resetPasswordToken},res});

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


export const logoutUser = asyncHandler(async(_req:Request,res:Response)=>{
	// clear all cookies
	res.clearCookie("accessToken" , {
		httpOnly : true,
		secure : true,
		sameSite : "none"
	});

	res.clearCookie("refreshToken" , {
		httpOnly : true,
		secure : true,
		sameSite : "none"
	});
	return sendApiResponse({statusCode:200,message:"Logged out successfully",res});
})


/**
 * This controller handles the refresh token process in case the access token has expired.
 * It verifies the provided refresh token, generates new access and refresh tokens,
 * sets them as HTTP-only cookies, and sends a success response.
 */
export const refreshToken = asyncHandler(async (req:Request, res:Response) =>{
	const refreshToken = req.cookies.refreshToken;
	if(!refreshToken){
		throw new ValidationError("Unauthorized. Please login again.");
	}

	const decoded = jwt.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
	console.log({decoded})
	if(!decoded || !decoded.user_id || !decoded.role){
		throw new AuthenticationError("Unauthorized. Invalid Refresh Token")
	}
	const user = await User.findById(decoded.user_id);
	if(!user){
		throw new ValidationError("User not found. Please login again.");
	}

	const {accessToken : newAccessToken , refreshToken : newRefreshToken} = user.generateTokens();

	res.cookie("accessToken" , newAccessToken , {
		httpOnly : true,
		secure : true,
		maxAge : 15 * 60 * 1000, // 15 minutes
		sameSite : "none"
	});
	res.cookie("refreshToken" , newRefreshToken , {
		httpOnly : true,
		secure : true,
		maxAge : 24 * 60 * 60 * 1000, // 1 day
		sameSite : "none"
	});
	return sendApiResponse({statusCode:200,message:"Tokens refreshed successfully",res});
})


export const getUser = asyncHandler(async(req:Request,res:Response) => {
	const {user} = req;
	return sendApiResponse({statusCode:201, message:"User details fetched",data:user,res});
})