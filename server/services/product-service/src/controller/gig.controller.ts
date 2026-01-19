import { asyncHandler, NotFoundError, sendApiResponse, ValidationError } from "@project/shared/server";
import type { Request, Response } from "express";
import { applyToGigSchema, createGigSchema } from "shared/src/universal/schemas/gig.zod.js";
import { Gig, IGig } from "../model/gig.model.js";
import { FilterQuery } from "mongoose";
import { GigDetailsType, ListGigsType } from "../types/gig.type.js";
import { GigApplication } from "../model/gigApplication.model.js";

export const listGigs = asyncHandler(async(req:Request, res:Response)=>{
    const {search , category} = req.query as ListGigsType;

    const query : FilterQuery<IGig> = {
        collegeId : req.user.collegeId,
        status : "open"
    }

    if (category && category.trim() !== "") {
        query.category = category;
    }

    if (search && search.trim() !== "") {
        query.title = { $regex: search, $options: "i" };
    }

    const gigs = await Gig.find(query).sort({ createdAt: -1 });
    return sendApiResponse({
        statusCode: 200,
        message: "Gigs fetched successfully",
        data: gigs,
        res
    });
})

export const createGig = asyncHandler(async(req:Request, res:Response) => {
    const parsedData = createGigSchema.parse(req.body)
    const user = req.user;
    const {_id : userId, college :collegeId} = user;

    const newGig = await Gig.create({
        ...parsedData,
        createdBy : userId,
        collegeId
    })

    return sendApiResponse({
        statusCode : 201,
        message :"Gig create successfully",
        data : newGig,
        res
    })
})


export const getGigsDetails = asyncHandler(async(req:Request,res:Response)=>{
    const {gigId} = req.params as GigDetailsType 
    const gig = await Gig.findOne({
        _id : gigId
    });

    if(!gig){
        throw new NotFoundError("Gig not found");
    }

    return sendApiResponse({
        statusCode : 200,
        data : gig,
        message : "Gig details fetched",
        res
    })
})


export const applyToGig = async (req: Request, res: Response) => {
    const paresedBody = applyToGigSchema.parse(req.body)
    const {bidAmount,proposal} = paresedBody;

    const userId = req.user!.userId;

    const gig = await Gig.findById(req.params.id);

    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.createdBy.toString() === userId){
        throw new ValidationError("You can't apply to your own gig")
    }
    
    if (gig.status !== "OPEN"){
        return sendApiResponse({
            statusCode : 400,
            message : "Gig is not open",
            res 
        });
    }

    const alreadyApplied = await GigApplication.findOne({
        gigId: gig._id,
        freelancerId: userId
    });

    if (alreadyApplied){
        return sendApiResponse({
            statusCode : 400,
            message : "Already applied",
            res 
        });
    }

    const application = await GigApplication.create({
        gigId: gig._id,
        freelancerId: userId,
        proposal,
        bidAmount
    });

    return sendApiResponse({
        statusCode : 201,
        message : "Applied",
        data : application,
        res 
    });

};
