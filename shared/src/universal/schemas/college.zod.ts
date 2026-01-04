import {z} from "zod"


export const createCollegeSchema = z.object({
    name : z.string().trim().min(2),
    campus : z.string().trim().min(2)
})


export const toggleCollegeActiveStatusSchema = z.object({
    collegeId : z.string().nonempty()
})