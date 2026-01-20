import { asyncHandler, NotFoundError, sendApiResponse, ValidationError } from "@project/shared/server";
import type { Request, Response } from "express";
import { applyToGigSchema, createGigSchema } from "shared/src/universal/schemas/gig.zod.js";
import { Gig, IGig } from "../model/gig.model.js";
import mongoose, { FilterQuery } from "mongoose";
import { Proposal } from "../model/proposal.model.js";
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


export const createGig = asyncHandler(async(req:Request, res:Response) => {
    // check if the role is USER 
    if(!(req.user.role === "USER")){
        throw new AuthenticationError("You are not authorized to post gigs");
    }
    const parsedData = createGigSchema.parse(req.body)
    const user = req.user;
    const {_id : userId, college :collegeId} = user;

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

export const applyToGig = asyncHandler(async (req: Request, res: Response) => {

    // Only freelancers can apply
    if (req.user.role !== "FREELANCER") {
        throw new AuthenticationError("Only freelancers can apply to gigs");
    }

    const parsedBody = applyToGigSchema.parse(req.body);
    const { bidAmount, proposal } = parsedBody;

    const userId = req.user.userId;
    const gigId = req.params.id;

    const session = await mongoose.startSession();

    let createdProposal: any = null;

    try {
        await session.withTransaction(async () => {

            const gig = await Gig.findById(gigId).session(session);

            if (!gig) {
                throw new NotFoundError("Gig not found");
            }

            if (gig.createdBy.toString() === userId.toString()) {
                throw new ValidationError("You can't apply to your own gig");
            }

            if (gig.status !== "open") {
                throw new ValidationError("Gig is not open");
            }

            const alreadyApplied = await Proposal.findOne({
                gigId: gig._id,
                freelancerId: userId
            }).session(session);

            if (alreadyApplied) {
                throw new ValidationError("You have already applied to this gig");
            }

            const created = await Proposal.create([{
                gigId: gig._id,
                freelancerId: userId,
                proposal,
                bidAmount
            }], { session });

            createdProposal = created[0]; 
        });

        return sendApiResponse({
            statusCode: 201,
            message: "Applied to gig successfully",
            data: createdProposal, 
            res
        });

    } finally {
        session.endSession();
    }
});
