import { errorToast } from "@/src/lib";
import { loginUserApi } from "@/src/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLoginMuations = () => useMutation({
    mutationFn : loginUserApi,
    onError : (error:any) => {
        errorToast(error.response?.data?.message || "Something went wrong")
    }
})