import {z} from "zod"

export const requestOtpSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});
