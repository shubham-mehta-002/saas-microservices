import { resetPasswordSchema } from "@project/shared";
import {z} from "zod"

export const resetPasswordFormSchema = resetPasswordSchema.omit({ resetToken: true });

export type ResetPasswordFormType =
  z.infer<typeof resetPasswordFormSchema>;
