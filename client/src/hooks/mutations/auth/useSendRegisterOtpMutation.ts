import { sendRegisterOtpApi } from "@/src/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { errorToast } from "@/src/lib";

export const useSendRegisterOtpMuation = () => {
    return useMutation({
        mutationFn : sendRegisterOtpApi,
        onError : (error:any) => {
            errorToast(error.response?.data?.message || "Something went wrong")
        }
    })
}