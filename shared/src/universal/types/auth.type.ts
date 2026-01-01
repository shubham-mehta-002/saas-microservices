import {z} from "zod"
import {registerOtpRequestSchema,loginUserSchema,registerUserSchema, verifyOtpSchema,forgotPasswordRequestSchema,resetPasswordSchema} from "../schemas/user.zod.js"

export type registerOtpRequestType = z.infer<typeof registerOtpRequestSchema>
export type loginUserType = z.infer<typeof loginUserSchema>
export type registerUserType = z.infer<typeof registerUserSchema>
export type verifyOtpType = z.infer<typeof verifyOtpSchema>
export type forgotPasswordRequestType = z.infer<typeof forgotPasswordRequestSchema>
export type resetPasswordType = z.infer<typeof resetPasswordSchema>