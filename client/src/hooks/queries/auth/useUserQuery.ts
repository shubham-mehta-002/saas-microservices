import { getUser } from "@/src/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { UserModelType , ApiResponse } from "@project/shared";

export const useUserQuery = () => {
    return useQuery<
        ApiResponse<UserModelType>,
        Error,
        UserModelType|undefined
    >({
        queryKey : ["user"],
        queryFn : getUser,
        staleTime : 1000*60*5,
        select : (response) => {
            return response.data;
        }
    })
} 
