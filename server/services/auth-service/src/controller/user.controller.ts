import { asyncHandler, mongooseInstance, sendApiResponse, ValidationError } from "@project/shared/server";
import { Request, Response } from "express";
import { profileDetailsSchema, signUpAsFreelancerSchema, userRolesType } from "@project/shared";
import {  User } from "../model/user.model.js";
import { Freelancer } from "../model/freelancer.model.js";
import { GatewayUser } from "../types/express.js";


export const getUser = asyncHandler(async(req:Request,res:Response) => {
    const {userId} = req.user as GatewayUser;
    const user = await User.findById(userId);
    if(!user){
        throw new ValidationError("No user exists with this ID");
    } 
    return sendApiResponse({statusCode:200, message:"User details fetched",data:user,res});
})


export const completeProfile = asyncHandler(async (req: Request, res: Response) => {
    const  {userId} = req.user as GatewayUser;

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
    const {userId } = req.user as GatewayUser;

    if(!userId){
        return new ValidationError("Unauthorized access");
    }

    const parsedBody = signUpAsFreelancerSchema.parse(req.body);

    const existing = await Freelancer.findOne({ userId });
    
    if (existing) {
        throw new ValidationError("Already registered as freelancer");
    }

    const newRole : userRolesType = "freelancer";

    // Transaction management
    const session = await mongooseInstance.startSession();
    session.startTransaction();

    try {
        await Freelancer.create([{ userId, ...parsedBody }], { session });

        await User.findByIdAndUpdate(
            userId,
            { role: newRole, isProfileCompleted : true },
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