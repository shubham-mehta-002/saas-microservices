import { errorToast } from "@/src/lib";
import { loginUserApi } from "@/src/services/auth.service";
import { ApiResponse, loginUserType, UserModelType } from "@project/shared";
import { useMutation } from "@tanstack/react-query";

export const useLoginMuations = () => useMutation<
    ApiResponse<UserModelType>,
    unknown,
    loginUserType
>({
    mutationFn : loginUserApi,
    onError : (error:any) => {
        errorToast(error.response?.data?.message || "Something went wrong")
    }
})