import { verifyRegisterOtpApi } from "@/src/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { errorToast } from "@/src/lib";
import { ApiResponse, UserModelType, verifyOtpType } from "@project/shared";

export const useVerifyRegisterOtpMutation = () => useMutation<
    ApiResponse<UserModelType>,
    unknown,
    verifyOtpType
>({
    mutationFn : verifyRegisterOtpApi,
    onError : (error:any) => {
        errorToast(error.response?.data?.message || "Something went wrong")
    }
})