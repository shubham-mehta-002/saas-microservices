import { redisClient, ValidationError} from "@project/shared/server";
import { sendOtpMail } from "./mail/mail.helper.js";
import crypto from "crypto";
import { OTP_EXPIRY_TIME, OTP_LENGTH, RESEND_OTP_COOLDOWN } from "../config/constants.js";

export const checkOtpRestrictions = async({email} : {email:string}) => {
    email = email.trim().toLowerCase();

    const cooldownKey = `otp_cooldown:${email}`;
    const cooldownTTL = await redisClient.ttl(cooldownKey);

    if (cooldownTTL > 0) {
        throw new ValidationError(`Please wait ${cooldownTTL} seconds before requesting a new OTP`);
    }
}

export const hashOtp = (otp : string)  : string => {
  return crypto.createHash("sha256").update(otp).digest('hex');
}

export const sendOtp = async ({email,subject} : {email: string, subject:string}) => {
  const otp = crypto.randomInt(Math.pow(10,OTP_LENGTH-1) , Math.pow(10,OTP_LENGTH)).toString();
  // hash thi OTP
  const hashedOtp = hashOtp(otp);
  await sendOtpMail({email, otp,otpExpiryTime : OTP_EXPIRY_TIME,subject});
  await redisClient.set(`otp:${email}`, hashedOtp, {EX :  OTP_EXPIRY_TIME});  // otp in redis expires in 300 sec/ 5 min
  await redisClient.set(`otp_cooldown:${email}` , "true" , {EX : RESEND_OTP_COOLDOWN}); // can resend otp from client side after 1 min
};


export const verifyOtp = async({otp,email} : {otp:string, email:string}) :Promise<void> => {
  const storedHasedOtp = await redisClient.get(`otp:${email}`);
  if(!storedHasedOtp){
    throw new ValidationError("OTP expired or invalid");
  }

  const incomingHashedOtp = hashOtp(otp);
  if(incomingHashedOtp != storedHasedOtp){
    throw new ValidationError("Invalid OTP ");
  }

  // OTP is valid , delete it from redis
  await redisClient.del(`otp:${email}`);
}