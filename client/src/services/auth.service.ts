import {axiosInstance} from "@/src/lib"
import { loginUserType, verifyOtpType,registerOtpRequestType,resetPasswordType,forgotPasswordRequestType} from "@project/shared"

export const sendRegisterOtpApi = async(data : registerOtpRequestType) =>{
    const res = await axiosInstance.post('/auth/register',data);
    return res.data;
}


export const verifyRegisterOtpApi = async(data : verifyOtpType) => {
    const res = await axiosInstance.post('/auth/verify-otp', data)
    return res.data;
}


export const loginUserApi = async(data: loginUserType) =>{
    const res = await axiosInstance.post('/auth/login',data)
    return res.data;
}


// export const forgotPasswordApi = async(data : forgotPasswordRequestType) => {
//     const res = await axiosInstance.post('/auth/forgot-password',data)
//     return res.data;
// }

// export const verifyResetPasswordOtpApi = async(data :verifyResetPasswordOtpType) => {
//     const res = await axiosInstance.post('/auth/verify-reset-otp',data)
//     return res.data
// }

export const forgetPasswordRequestApi = async(data: forgotPasswordRequestType) => {
    const res = await axiosInstance.post('/auth/forgot-password',data)
    return res.data;
}

export const resetPasswordApi = async(data : resetPasswordType) => {
    const res = await axiosInstance.post('/auth/reset-password',data)
    return res.data
}
