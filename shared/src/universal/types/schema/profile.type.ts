import {z} from "zod"
import {profileDetailsSchema} from "../../schemas/profile.zod.js";

export type profileDetailsType = z.infer<typeof profileDetailsSchema>;
