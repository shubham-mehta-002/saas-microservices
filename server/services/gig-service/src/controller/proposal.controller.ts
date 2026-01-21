import { AuthenticationError } from "@project/shared/server";
import { applyToGigSchema, userRoles } from "@project/shared";
import { asyncHandler, NotFoundError, sendApiResponse, ValidationError } from "@project/shared/server";
import mongoose from "mongoose";
import { Gig } from "../model/gig.model.js";
import { Proposal } from "../model/proposal.model.js";
import { Request, Response } from "express";

export const applyToGig = asyncHandler(async (req: Request, res: Response) => {
    const {userId, role} = req.user;
    
    // Only freelancers can apply
    if (role !== userRoles.FREELANCER) {
        throw new AuthenticationError("Only freelancers can apply to gigs");
    }

    const parsedBody = applyToGigSchema.parse(req.body);
    const { bidAmount, proposal } = parsedBody;

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
