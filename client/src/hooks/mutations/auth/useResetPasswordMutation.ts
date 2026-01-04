import { errorToast } from "@/src/lib";
import { resetPasswordApi } from "@/src/services/auth.service";
import { ApiResponse, resetPasswordType } from "@project/shared";
import { useMutation } from "@tanstack/react-query";

export const useResetPasswordMutation = () => useMutation<
    ApiResponse<void>,
    unknown,
    resetPasswordType
>({
    mutationFn : resetPasswordApi,
    onError : (error : any) => {
        errorToast(error.response?.data?.message || "Something went wrong")
    }
})