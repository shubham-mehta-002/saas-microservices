import {z} from "zod"
import {loginUserSchema,registerUserSchema, verifyOtpSchema} from "../schemas/user.zod.js"

export type loginUserType = z.infer<typeof loginUserSchema>
export type registerUserType = z.infer<typeof registerUserSchema>
export type verifyOtpType = z.infer<typeof verifyOtpSchema>