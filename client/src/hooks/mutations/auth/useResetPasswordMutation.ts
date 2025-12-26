import { errorToast } from "@/src/lib";
import { resetPasswordApi } from "@/src/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useResetPasswordMutation = () => useMutation({
    mutationFn : resetPasswordApi,
    onError : (error : any) => {
        errorToast(error.response?.data?.message || "Something went wrong")
    }
})