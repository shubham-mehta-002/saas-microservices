import { asyncHandler, sendApiResponse } from "@project/shared/server";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { JwtPayload } from "../types/jwtPayload.js";


export const isAuthenticated = asyncHandler(async (req:Request, res:Response, next : NextFunction)=>{
    console.log('asdasdasd',req.cookies)
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    console.log({token})
    if(!token){
        return sendApiResponse({statusCode:401, message : "Unauthorized! Token missing",res});
    }

    // verify token
    const decoded  = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

    if(!decoded){
        return sendApiResponse({statusCode:401,message:"Unauthorized! Invalid token",res});
    }

    // find if user still exist
    const existingUser = await User.findById(decoded.user_id);
    if(!existingUser){
        return sendApiResponse({statusCode:401,message:"No user found",res});
    }

    req.user = existingUser;
    return next();
});