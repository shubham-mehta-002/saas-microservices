import { sendRegisterOtpApi } from "@/src/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { errorToast } from "@/src/lib";
import { ApiResponse, registerOtpRequestType } from "@project/shared";

export const useSendRegisterOtpMuation = () => {
    return useMutation<
        ApiResponse<void>,
        unknown,
        registerOtpRequestType
    >({
        mutationFn : sendRegisterOtpApi,
        onError : (error:any) => {
            errorToast(error.response?.data?.message || "Something went wrong")
        }
    })
}