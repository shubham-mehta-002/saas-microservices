import { resetPasswordSchema } from "@project/shared";
import {z} from "zod"

export const resetPasswordFormSchema = resetPasswordSchema
  .omit({ resetToken: true })
  .refine(
    (data) => data.newPassword === data.confirmNewPassword,
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    }
);
export type ResetPasswordFormType =
  z.infer<typeof resetPasswordFormSchema>;
