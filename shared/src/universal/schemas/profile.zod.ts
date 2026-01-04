import {z} from "zod"

export const profileDetailsSchema = z.object({
    name : z.string().trim().min(1,"Name is required"),
    courseName : z.string().trim().min(1,"Course name is required"),
    collegeId: z.string("College/University is required"),
    yearOfStudy : z.number("Year of Study is required").min(1).max(5)
})