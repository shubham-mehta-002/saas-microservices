import { mongooseInstance } from "@project/shared/server";
import { Document , Model, Types, Schema} from "mongoose";
import { gigStatus } from "@project/shared";
import { gigStatusType } from "../types/index.js";

/* ---------- Interface ---------- */
export interface IGig extends Document{
    title : String,
    description : String,
    budget : Number,
    category?: String,
    skillsRequired : string[],
    createdBy : Types.ObjectId, // userId (Client)
    collegeId : Types.ObjectId, // college id
    status : gigStatusType,
    selectedFreelancerId?: Types.ObjectId; // User._id (freelancer)
}

/* ---------- Schema ---------- */
const gigSchema = new Schema<IGig>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    skillsRequired: { type: [String], default: [] }, 
    budget: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, index: true }, // client user
    collegeId: { type: Schema.Types.ObjectId, required: true, index: true },
    status: { type: String, enum: gigStatus, default: "open"},
    selectedFreelancerId: { type: Schema.Types.ObjectId }
    
}, { timestamps: true });


/* ---------- Model ---------- */
export const Gig : Model<IGig> = mongooseInstance.models.Gig || mongooseInstance.model<IGig>("Gig", gigSchema);