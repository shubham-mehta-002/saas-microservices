import {axiosInstance} from "@/src/lib"
import {loginUserType, verifyOtpType} from "@project/shared"

export const sendRegisterOtpApi = async(data : {email:string}) =>{
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