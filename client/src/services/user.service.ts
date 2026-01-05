import { axiosInstance } from "../lib";
import { ApiResponse , profileDetailsType, signUpAsFreelancerType, UserModelType} from "@project/shared";


export const getUser = async() => {
    const res = await axiosInstance.get<ApiResponse<UserModelType>>("/auth/user");
    return res.data;
} 

export const completeProfileApi = async(payload : profileDetailsType) => {
    const res = await axiosInstance.post<ApiResponse<UserModelType>>("/user/user/profile" , payload);
    return res.data;
}

export const signUpAsFreelancerApi = async(payload : signUpAsFreelancerType) => {
    const res = await axiosInstance.post<ApiResponse<void>>("/user/user/freelancer" , payload);
    return res.data;
}