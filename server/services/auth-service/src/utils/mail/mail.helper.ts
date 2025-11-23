import { getOtpTemplate } from "./mail.templates.js";
import { sendMail } from "@project/shared/server";

export const sendOtpMail = async({email,otp,otpExpiryTime,subject}: {email:string , otp : string, otpExpiryTime : number,subject:string}) => {
    await sendMail({
        to : email, 
        subject : subject,
        html :  getOtpTemplate(otp,otpExpiryTime,subject)
    });
}