import { errorToast } from "@/src/lib"
import { completeProfile } from "@/src/services/profile.service"
import { ApiResponse, profileDetailsType, UserModelType } from "@project/shared"
import { useMutation } from "@tanstack/react-query"


export const useCompleteProfileMutation = () => {
    return useMutation<
        ApiResponse<UserModelType>,
        unknown,
        profileDetailsType
    >({
        mutationFn : completeProfile,
        onError : (error:any) => {
            errorToast(error.response?.data?.message || "Something went wrong")
        }
    })
}