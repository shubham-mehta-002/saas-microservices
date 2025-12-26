import { errorToast } from "@/src/lib";
import { forgetPasswordRequestApi } from "@/src/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useForgetPasswordRequestMutation = () => useMutation({
    mutationFn : forgetPasswordRequestApi,
    onError : (error:any) => {
        errorToast(error.response?.data?.message || "Something went wrong")
    }
})



