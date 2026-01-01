import { errorToast } from "@/src/lib";
import { forgetPasswordRequestApi } from "@/src/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordRequestType,ApiResponse } from "@project/shared";
export const useForgetPasswordRequestMutation = () => useMutation<
    ApiResponse<void>,
    any,
    forgotPasswordRequestType
>({
    mutationFn : forgetPasswordRequestApi,
    onError : (error:any) => {
        errorToast(error.response?.data?.message || "Something went wrong")
    }
})



