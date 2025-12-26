import {z} from "zod"
import {requestOtpSchema,resetPasswordSchema} from "./validations"

export type requestOtpType = z.infer<typeof requestOtpSchema>
export type resetPasswordType = z.infer<typeof resetPasswordSchema>
