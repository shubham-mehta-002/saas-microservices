import {z} from "zod"
import { OTP_LENGTH } from "../constants.js";

const passwordValidation = z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
)

export const registerUserSchema = z.object({
  email : z.email("Invalid email address")
})

export const verifyUserSchema = z.object({
    name : z.string().min(2, "Name must be atleast 2 characters"),
    email : z.email("Invalid email address"),
    password : passwordValidation,
    confirmPassword : z.string(),
    otp : z.string().length(OTP_LENGTH, `OTP must be ${OTP_LENGTH} characters long`)
})
.refine((data) => data.password === data.confirmPassword, {
    message : "Passwords donot match",
    path : ["confirmPassword"]
})
.transform(({confirmPassword, ...rest}) => rest);


export const loginUserSchema = z.object({
  email : z.email("Invalid email address"),
  password : z.string()
})


export const forgotPasswordSchema = z.object({
  email : z.email("Invalid email address")
})


export const verifyResetPasswordOtpSchema = z.object({
  email : z.email("Invalid email address"),
  otp : z.string().length(OTP_LENGTH, `OTP must be ${OTP_LENGTH} characters long`)
})

export const resetPasswordSchema = z.object({
  resetToken : z.string(),
  newPassword : passwordValidation,
  confirmNewPassword : z.string()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message : "Passwords donot match",
  path : ["confirmNewPassword"]
}).transform(({confirmNewPassword, ...rest}) => rest);

