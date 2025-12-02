'use client';
import { Input, Button, OTPInput } from "@/src/components"
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { OTP_LENGTH , registerUserType, registerUserSchema, RESEND_OTP_COOLDOWN} from "@project/shared";
import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendRegisterOtpMuation, useVerifyRegisterOtpMutation } from "@/src/hooks";
import { errorToast, successToast } from "@/src/lib";
import { useRouter } from "next/navigation";


export default function SignupPage(){
    const router = useRouter();

    const [showOtpField , setShowOtpField] = useState<boolean>(!true);
    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
    const [userDetails, setUserDetails] = useState<registerUserType | null>(null);
    const [canResendOtp , setCanResendOtp] = useState<boolean>(false)  
    const [resendOtpTimer,setResendOtpTimer] = useState<number>(0);

    const {register, handleSubmit,getValues ,formState: {errors, isSubmitting}}  = useForm<registerUserType>({
        resolver : zodResolver(registerUserSchema)
    })

    const sendOtpMutation = useSendRegisterOtpMuation()
    const verifyOtpMutation = useVerifyRegisterOtpMutation()

    const sendOtpHandler = () => {
        const data = getValues()
        console.log({data})
        sendOtpMutation.mutate({
            email : data.email
        },{
            onSuccess : () => {
                successToast("OTP Sent")
                setShowOtpField(true);
                setUserDetails(data);
                setResendOtpTimer(RESEND_OTP_COOLDOWN)
                startResendOtpTimer();
            }
        })
    }
    

    const startResendOtpTimer = () => {
        const interval = setInterval(()=>{
            setResendOtpTimer(prev => {
                if(prev <= 1){
                    clearInterval(interval)
                    return 0;
                }
                return prev - 1;
            })
        },1000)
    }

    const verifyOtpClickHandler = (e : MouseEvent<HTMLButtonElement>) => {
        // to type guard userDetails while calling in mutate fn below
        if(!userDetails){
            setShowOtpField(false);
            return;
        }

        const formated_otp = otp.join('')
        if(formated_otp.trim().length !== OTP_LENGTH){
            errorToast("Enter a valid OTP!!")
            return;
        }
        const data = {
            otp : formated_otp,
            ...userDetails
        }
        verifyOtpMutation.mutate({...data},{
            onSuccess : () => {
                successToast("Registered Successfully")
                router.push("/login")
            }
        });
    }

    const isSendOtpRequestPending = sendOtpMutation.isPending
    const isVerifyOtpRequestPending = verifyOtpMutation.isPending

    return (
        <>
        <div className="mt-30 w-full">
            <div className="form-wrapper sm:w-1/3 mx-auto border pb-5 px-3 rounded-md shadow-lg mt-10 flex flex-col">
                {/* Header */}
                <div className="text-3xl text-center my-5 font-semibold">Sign Up</div>
    
                {/* Input Fields */}
                {!showOtpField && 
                <form onSubmit={handleSubmit(sendOtpHandler)}>
                    <div className="flex flex-col gap-5">
                    <Input label="Email" placeholder="Enter your email" type="text" {...register("email")} error={errors.email?.message}/>
                    <Input label="Password" placeholder="Enter your password" type="password" {...register("password")} error={errors.password?.message} />
                    <Input label="Confirm Password" placeholder="Enter password again" type="password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
                    <Button type="submit" 
                        label={resendOtpTimer > 0 ? `Wait for ${resendOtpTimer} seconds` : isSendOtpRequestPending ? "Signing Up ..." : "Sign Up"} 
                        disabled={resendOtpTimer > 0 ? true : isSendOtpRequestPending} 
                        className={`${(isSendOtpRequestPending || resendOtpTimer > 0 )? "cursor-not-allowed" : "cursor-pointer"}`} />
                    </div>
                    <Link href={"/login"}>
                        <span className="text-sm hover:underline cursor-pointer flex mt-2 justify-center">Already Have any account?</span>
                    </Link>
                    {resendOtpTimer > 0 && <span className="align-right text-sm underline cursor-pointer" onClick={()=>setShowOtpField(true)}>OTP</span>}
                </form> }
                {showOtpField && 
                    <div className="otp-wrapper">
                        <div className="flex flex-col items-center justify-center">
                            <span className="mb-2 text-lg">Enter OTP sent to email</span>
                            <OTPInput 
                                length={OTP_LENGTH} 
                                type="numeric" 
                                otpValue={otp}
                                setOtpValue={setOtp}
                                />
                            <Button type="button" disabled={isVerifyOtpRequestPending} label={isVerifyOtpRequestPending ? "Verifying..." : "Verify OTP"} className={`mt-3 bg-gray-800 text-white hover:bg-gray-700 ${isVerifyOtpRequestPending ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={verifyOtpClickHandler}/>
                            {resendOtpTimer == 0 ? 
                                <Button type="button" disabled={isSendOtpRequestPending} label={isSendOtpRequestPending ? "Sending OTP" : "Resend OTP"} className="mt-3 bg-green-500 text-white cursor-pointer" onClick={sendOtpHandler}/>
                                :
                                <span className="text-red">{resendOtpTimer} seconds</span>
                            }
                        </div>
                        <span className="text-sm underline cursor-pointer" onClick={() => setShowOtpField(false)}>back</span>
                    </div>
                }
            </div>
        </div>
        </>
    )
}