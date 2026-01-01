import { useMutation } from "@tanstack/react-query";
import { logoutUserApi } from "@/src/services/auth.service";
import { errorToast } from "@/src/lib";
import {ApiResponse} from "@project/shared"

export const useLogoutUserMutation = () => useMutation<
    ApiResponse<void>,
    Error,
    void
>({
    mutationFn : logoutUserApi,
    onError: (error:any) => {
        errorToast(error.response?.data?.message || "Failed to logout")
    }
})