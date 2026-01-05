import {z} from "zod"
import { freelancerAvailablity } from "../constants.js"

export const profileDetailsSchema = z.object({
    name : z.string().trim().min(1,"Name is required"),
    courseName : z.string().trim().min(1,"Course name is required"),
    collegeId: z.string("College/University is required"),
    yearOfStudy : z.number("Year of Study is required").min(1).max(5)
})

export const signUpAsFreelancerSchema = z.object({
    title : z.string().trim().min(1,"Title is required"),
    bio : z.string().trim().min(1,"Bio is required"),
    hourlyRate : z.coerce.number().positive("Hourly rate must be greater than 0"),
    availability : z.enum(freelancerAvailablity),
    skills : z.array(z.string().trim().min(1,"Skill can't be empty")).min(3, "Atleast 3 skills are required")
})