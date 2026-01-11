import { asyncHandler, mongooseInstance, sendApiResponse, ValidationError } from "@project/shared/server";
import { Request, Response } from "express";
import { profileDetailsSchema, signUpAsFreelancerSchema } from "@project/shared";
import {  IUser, User } from "../model/user.model.js";
import { Freelancer } from "../model/freelancer.model.js";
import { userRoles } from "@project/shared";

export const getUser = asyncHandler(async(req:Request,res:Response) => {
    const {user} = req; // user populated by Middleware 
    return sendApiResponse({statusCode:200, message:"User details fetched",data:user,res});
})


export const completeProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if(!user){
        return new ValidationError("Unauthorized access");
    }
    const {_id : userId} = user

    const data = profileDetailsSchema.parse(req.body);

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ...data, isProfileCompleted: true },
        { new: true, runValidators: true }      // returns updated doc & validates schema
    );

    if (!updatedUser) throw new ValidationError("No user exists with this ID");

    return sendApiResponse({
        statusCode: 200,
        message: "Profile updated",
        data: updatedUser,
        res
    });
});


export const signUpAsFreelancer = asyncHandler(async(req:Request , res:Response)=>{
    const user= req.user;

    if(!user){
        return new ValidationError("Unauthorized access");
    }

    const parsedBody = signUpAsFreelancerSchema.parse(req.body);
    const {_id : userId} = user;

    const existing = await Freelancer.findOne({ userId });
    if (existing) {
        throw new ValidationError("Already registered as freelancer");
    }

    const newRole : typeof userRoles[number] = "freelancer";

    // Transaction management
    const session = await mongooseInstance.startSession();
    session.startTransaction();

    try {
        await Freelancer.create([{ userId, ...parsedBody }], { session });

        await User.findByIdAndUpdate(
            userId,
            { role: newRole },
            { session }
        );

        await session.commitTransaction();
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }


    return sendApiResponse({
        statusCode : 201,
        message : "You are now registered as freelancer",
        res
    })
}) 