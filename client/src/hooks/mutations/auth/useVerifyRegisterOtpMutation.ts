import { verifyRegisterOtpApi } from "@/src/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { errorToast } from "@/src/lib";

export const useVerifyRegisterOtpMutation = () => useMutation({
    mutationFn : verifyRegisterOtpApi,
    onError : (error:any) => {
        errorToast(error.response?.data?.message || "Something went wrong")
    }
})