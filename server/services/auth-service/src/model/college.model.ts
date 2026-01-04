import { mongooseInstance } from "@project/shared/server"
import { Document, Model } from "mongoose"

/* ---------- Interface ---------- */
export interface ICollege extends Document{
    name : string,
    campus : string,
    isActive : boolean 
}

/* ---------- Schema ---------- */
const collegeSchema = new mongooseInstance.Schema<ICollege>({
    name : {type : String,  trim:true},
    campus : {type : String, trim:true},
    isActive : {type : Boolean , default : true}
},{
    timestamps : true
})


/* ---------- Model ---------- */
export const College : Model<ICollege> = mongooseInstance.models.collegeModel || mongooseInstance.model<ICollege>("College", collegeSchema);