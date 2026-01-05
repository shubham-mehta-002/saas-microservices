import {z} from "zod"
import {profileDetailsSchema, signUpAsFreelancerSchema} from "../../schemas/user.zod.js";

export type profileDetailsType = z.infer<typeof profileDetailsSchema>;
export type signUpAsFreelancerType = z.infer<typeof signUpAsFreelancerSchema>;