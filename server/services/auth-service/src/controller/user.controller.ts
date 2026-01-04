import { asyncHandler, sendApiResponse, ValidationError } from "@project/shared/server";
import { Request, Response } from "express";
import { profileDetailsSchema } from "shared/src/universal/schemas/profile.zod.js";
import { User } from "../model/user.model.js";
import { UserModelType } from "@project/shared";


export const getUser = asyncHandler(async(req:Request,res:Response) => {
    const {user} = req; // user populated by Middleware 
    return sendApiResponse({statusCode:200, message:"User details fetched",data:user,res});
})


export const completeProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as UserModelType;
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


// become freelancer from client role by providing necessary details in the form -> skill[]
