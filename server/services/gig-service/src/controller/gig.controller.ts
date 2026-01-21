import { asyncHandler, NotFoundError, sendApiResponse} from "@project/shared/server";
import type { Request, Response } from "express";
import {  createGigSchema, userRoles } from "@project/shared";
import { Gig, IGig } from "../model/gig.model.js";
import { FilterQuery } from "mongoose";
import { AuthenticationError } from "@project/shared/server";

export const listGigs = asyncHandler(async(req:Request, res:Response)=>{
    const {
        search,
        category,
        page = "1",
        limit = "10"
    } = req.query as any;

    const pageNum = Math.max(parseInt(page),1);
    const limitNum  = Math.min(parseInt(limit), 50);

    const query : FilterQuery<IGig> = {
        status : "open"
    }

    // college-specific search
    query.collegeId = req.query.collegeId;

    if (category && category.trim() !== "") {
        query.category = category;
    }

    if (search && search.trim() !== "") {
        query.title = { $regex: search, $options: "i" };
    }

    // const gigs = await Gig.find(query).sort({ createdAt: -1 });
    const [gigs , totalGigs] = await Promise.all([
        Gig.find(query).sort({createdAt : -1}).skip((pageNum -1)*limitNum).limit(limitNum),
        Gig.countDocuments(query)
    ])

    const data = {
        items : gigs,
        pagination : {
            page : pageNum, 
            limit : limitNum,
            totalGigs,
            totalPages : Math.ceil( totalGigs /limitNum)
        }
    }

    return sendApiResponse({
        statusCode: 200,
        message: "Gigs fetched",
        data,
        res
    });
})


export const getGigsDetails = asyncHandler(async(req:Request,res:Response)=>{
    const {gigId} = req.params
    
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


export const createGig = asyncHandler(async(req:Request, res:Response) => {
    const {userId,collegeId, role} = req.user;

    // check if the role is USER 
    if(role !== userRoles.USER){
        throw new AuthenticationError("You are not authorized to post gigs");
    }
    const parsedData = createGigSchema.parse(req.body)

    const newGig = await Gig.create({
        ...parsedData,
        createdBy : userId,
        collegeId
    })

    // Emit Kafka Event later: GigCreated

    return sendApiResponse({
        statusCode : 201,
        message :"Gig create successfully",
        data : newGig,
        res
    })
})

