import {axiosInstance} from "@/src/lib"
import { loginUserType, verifyOtpType,registerOtpRequestType,resetPasswordType,forgotPasswordRequestType, ApiResponse} from "@project/shared"
import { UserType } from "@project/shared";

export const sendRegisterOtpApi = async(data : registerOtpRequestType) : Promise<ApiResponse<void>> =>{
    const res = await axiosInstance.post<ApiResponse<void>>('/auth/register',data);
    return res.data;
}


export const verifyRegisterOtpApi = async(data : verifyOtpType) : Promise<ApiResponse<UserType>>=> {
    const res = await axiosInstance.post<ApiResponse<UserType>>('/auth/verify-otp', data)
    return res.data;
}


export const loginUserApi = async(data: loginUserType) : Promise<ApiResponse<UserType>> =>{
    const res = await axiosInstance.post<ApiResponse<UserType>>('/auth/login',data)
    return res.data;
}

export const forgetPasswordRequestApi = async(data: forgotPasswordRequestType):Promise<ApiResponse<void>>  => {
    const res = await axiosInstance.post<ApiResponse<void>>('/auth/forgot-password',data)
    return res.data;
}

export const resetPasswordApi = async(data : resetPasswordType) : Promise<ApiResponse<void>> => {
    const res = await axiosInstance.post<ApiResponse<void>>('/auth/reset-password',data)
    return res.data;
}

export const logoutUserApi = async() : Promise<ApiResponse<void>> => {
    const res = await axiosInstance.post<ApiResponse<void>>("/auth/logout")
    return res.data;
}

export const getUser = async(): Promise<ApiResponse<UserType>> => {
    const res = await axiosInstance.get<ApiResponse<UserType>>("/auth/user")
    return res.data;
} 