import {z} from "zod"
import {createCollegeSchema,toggleCollegeActiveStatusSchema} from "../../schemas/college.zod.js"

export type createCollegeType = z.infer<typeof createCollegeSchema>;
export type toggleCollegeActiveStatusType = z.infer<typeof toggleCollegeActiveStatusSchema>;