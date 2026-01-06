import { signUpAsFreelancerApi } from "@/src/services/user.service"
import { ApiResponse, signUpAsFreelancerType } from "@project/shared"
import { useMutation } from "@tanstack/react-query"
import { errorToast } from "@/src/lib"

export const useSignUpAsFreelancerMutation = () => {
    return useMutation<
        ApiResponse<void>,
        unknown,
        signUpAsFreelancerType
    >({
        mutationFn : signUpAsFreelancerApi,
        onError : (error:any) => {
            console.log("Mutation error" ,{error})
            errorToast(error.response?.data?.message || "Something went wrong")
        }
    })
}