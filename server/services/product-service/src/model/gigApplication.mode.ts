import { Document, Model, Types } from "mongoose";
import { gigApplicationStatusType } from "../gig.types.js";
import { Schema } from "mongoose";
import { gigApplicationStatus } from "@project/shared";
import { mongooseInstance } from "@project/shared/server";

/* ---------- Interface ---------- */
export interface IGigApplication extends Document {
    gigId: Types.ObjectId;
    freelancerId: Types.ObjectId;  // User._id

    proposal: string;
    bidAmount: number;

    status: gigApplicationStatusType
}

/* ---------- Schema ---------- */
const gigApplicationSchema = new Schema<IGigApplication>({
    gigId: { type: Schema.Types.ObjectId, required: true, index: true },
    freelancerId: { type: Schema.Types.ObjectId, required: true, index: true },

    proposal: { type: String, required: true },
    bidAmount: { type: Number, required: true },
    status : {type :String, enum : gigApplicationStatus,default: "applied"}
},{
    timestamps : true
})

gigApplicationSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

/* ---------- Model ---------- */
export const Gig : Model<IGigApplication> = mongooseInstance.models.Gig || mongooseInstance.model<IGigApplication>("GigApplication", gigApplicationSchema);