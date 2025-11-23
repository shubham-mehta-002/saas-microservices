'use client';
import { Input, Button, OTPInput } from "@/src/components"
import Link from "next/link";
import { useState } from "react";
import { OTP_LENGTH } from "@project/shared";

export default function SignupPage(){
    const [showOtp , setShowOtp] = useState<boolean>(true);
    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
    const [canResendOtp , setCanResendOtp] = useState<boolean>(false)

    return (
        <>
        <div className="mt-30 w-full">
            <div className="form-wrapper sm:w-1/3 mx-auto border pb-5 px-3 rounded-md shadow-lg mt-10 flex flex-col">
                {/* Header */}
                <div className="text-3xl text-center my-5 font-semibold">Sign Up</div>
    
                {/* Input Fields */}
                {!showOtp && <form className="">
                    <div className="flex flex-col gap-5">
                    <Input label="Email" placeholder="Enter your email" type="text" onChangeHandler={()=>{console.log("ASD")}}/>
                    <Input label="Password" placeholder="Enter your password" type="password" onChangeHandler={()=>{console.log("ASD")}}/>
                    <Input label="Confirm Password" placeholder="Enter password again" type="password" onChangeHandler={()=>{console.log("ASD")}}/>
                    <Button label="Sign Up" type="button"/>
                    </div>
                    <Link href={"/login"}>
                        <span className="text-sm hover:underline cursor-pointer flex mt-2 justify-center">Already Have any account?</span>
                    </Link>
                </form> }
                {showOtp && 
                    <div className="flex flex-col items-center justify-center">
                        <span className="mb-2 text-lg">Enter OTP sent to email</span>
                        <OTPInput 
                            length={OTP_LENGTH} 
                            type="numeric" 
                            otpValue={otp}
                            setOtpValue={setOtp}
                            />
                        <Button type="button" label="Verify OTP" className="mt-3 bg-gray-800 text-white hover:bg-gray-700"/>
                        {canResendOtp ? 
                            <Button type="button" label="Resend OTP" className="mt-3 bg-green-500 text-white"/>
                            :
                            <span>{"timer"}</span>
                        }
                    </div>
                }
            </div>
        </div>
        </>
    )
}