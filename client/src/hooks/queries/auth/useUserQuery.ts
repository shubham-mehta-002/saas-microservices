import { getUser } from "@/src/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { UserType , ApiResponse } from "@project/shared";

export const useUserQuery = () => {
    return useQuery<
        ApiResponse<UserType>,
        Error,
        UserType|undefined
    >({
        queryKey : ["user"],
        queryFn : getUser,
        staleTime : 1000*60*5,
        select : (response) => {
            return response.data;
        }
    })
} 