import { Document, Model, Types } from "mongoose";
import { Schema } from "mongoose";
import { proposalStatus, ProposalStatusType } from "@project/shared";
import { mongooseInstance } from "@project/shared/server";

/* ---------- Interface ---------- */
export interface IProposal extends Document {
    gigId: Types.ObjectId;
    freelancerId: Types.ObjectId;  // User._id

    proposal: string;
    bidAmount: number;

    status: ProposalStatusType
}

/* ---------- Schema ---------- */
const ProposalSchema = new Schema<IProposal>({
    gigId: { type: Schema.Types.ObjectId, required: true, index: true },
    freelancerId: { type: Schema.Types.ObjectId, required: true, index: true },

    proposal: { type: String, required: true },
    bidAmount: { type: Number, required: true },
    status : {type :String, enum : proposalStatus,default: "applied"}
},{
    timestamps : true
})

ProposalSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

/* ---------- Model ---------- */
export const Proposal : Model<IProposal> = mongooseInstance.models.Gig || mongooseInstance.model<IProposal>("Proposal", ProposalSchema);