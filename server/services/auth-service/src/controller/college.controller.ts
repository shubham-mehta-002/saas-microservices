import { asyncHandler, AuthenticationError, sendApiResponse, ValidationError } from "@project/shared/server";
import { College } from "../model/college.model.js";
import { Request, Response } from "express";
import { createCollegeSchema, toggleCollegeActiveStatusSchema } from "@project/shared";
import { GatewayUser } from "../types/express.js";

export const getAllColleges = asyncHandler(async(_req:Request, res:Response) => {
    const colleges = await College.find({});
    return sendApiResponse({
        statusCode : 200,
        message : "Colleged fetched Successfull",
        data : colleges,
        res
    })
})

export const getAllActiveColleges = asyncHandler(async(_req:Request, res:Response) => {
    const colleges = await College.find({isActive : true});
    return sendApiResponse({
        statusCode : 200,
        message : "Colleged fetched Successfull",
        data : colleges,
        res
    })
})

export const createCollege = asyncHandler(async(req:Request,res:Response) => {
    const { role} = req.user as GatewayUser;

    if (role !== "ADMIN") {
        throw new AuthenticationError("Only admins can create colleges");
    }
    const {name,campus} = createCollegeSchema.parse(req.body);
    const exisitingCollege = await College.findOne({
        name, campus
    })
    if(exisitingCollege){
        throw new ValidationError("College Already exists")
    }

    const newCollege = await College.create({name,campus});

    return sendApiResponse({
        statusCode :201,
        message: "College created successfully",
        data: newCollege,
        res
    })
})


export const toggleCollegeActiveStatus = asyncHandler(async(req:Request, res:Response)=>{
    const {collegeId} = toggleCollegeActiveStatusSchema.parse(req.body);

    const exisitingCollege = await College.findById(collegeId);
    if(!exisitingCollege){
        throw new ValidationError("No college exists with this Id");
    }

    const updatedCollege= await College.findByIdAndUpdate(collegeId , {
        isActive : !exisitingCollege.isActive
    },{new:true ,runValidators : true})

    if(!updatedCollege){
        throw new Error("Unexpected error updating college");
    }

    return sendApiResponse({
        statusCode: 200,
        message: `College is now ${updatedCollege.isActive ? "active" : "inactive"}`,
        data: updatedCollege,
        res
    });

})