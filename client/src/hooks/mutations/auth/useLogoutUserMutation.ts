import { useMutation } from "@tanstack/react-query";
import { logoutUserApi } from "@/src/services/auth.service";
import { errorToast } from "@/src/lib";


export const useLogoutUserMutation = () => useMutation({
    mutationFn : logoutUserApi,
    onError: (error:any) => {
        errorToast(error.response?.data?.message || "Failed to logout")
    }
})