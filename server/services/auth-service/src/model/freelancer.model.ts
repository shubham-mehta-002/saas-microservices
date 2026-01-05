import { freelancerAvailablity } from "@project/shared"
import { Model, Schema ,Document, Types} from "mongoose";
import { mongooseInstance } from "@project/shared/server";


type freelancerAvailablityType = typeof freelancerAvailablity[number];

/* ---------- Interface ---------- */
export interface IFreelancerDetails extends Document {
    userId : Types.ObjectId,
    title : String,
    bio : String,
    hourlyRate : Number,
    availability : freelancerAvailablityType,
    skills : String[];
}


/* ---------- Schema ---------- */
const FreelancerSchema = new mongooseInstance.Schema<IFreelancerDetails>({
    userId : { type : Schema.Types.ObjectId, ref : "User", index:true, unique : true, required:true},
    title : {type : String, required:true},
    bio : {type : String , required:true},
    hourlyRate : {type : Number, required:true},
    availability : { type : String, enum : freelancerAvailablity}  ,
    skills : {
        type : [String],
        validate : {
            validator : (skills : string[]) => {
                return Array.isArray(skills) && skills.length >= 3;
            },
            message : "You must provide at least 3 skills"
        }
    }
},
    { timestamps : true }
)


/* ---------- Model ---------- */
export const Freelancer : Model<IFreelancerDetails> = mongooseInstance.models.Freelancer || mongooseInstance.model("Freelancer", FreelancerSchema)

