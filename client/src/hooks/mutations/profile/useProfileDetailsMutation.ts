import { errorToast } from "@/src/lib"
import { completeProfileApi } from "@/src/services/user.service"
import { ApiResponse, profileDetailsType, UserModelType } from "@project/shared"
import { useMutation } from "@tanstack/react-query"


export const useCompleteProfileMutation = () => {
    return useMutation<
        ApiResponse<UserModelType>,
        unknown,
        profileDetailsType
    >({
        mutationFn : completeProfileApi,
        onError : (error:any) => {
            errorToast(error.response?.data?.message || "Something went wrong")
        }
    })
}