import { axiosInstance } from "../lib";
import { ApiResponse , profileDetailsType, UserModelType} from "@project/shared";


export const getUser = async() => {
    const res = await axiosInstance.get<ApiResponse<UserModelType>>("/auth/user")
    return res.data;
} 

export const completeProfile = async(payload : profileDetailsType) => {
    const res = await axiosInstance.post<ApiResponse<UserModelType>>("/user/user/profile" , payload)
    return res.data;
}