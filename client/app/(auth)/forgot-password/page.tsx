'use client';
import { Input, Button, Error } from "@/src/components"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestOtpType ,resetPasswordType} from "./types";
import { useForgetPasswordRequestMutation, useResetPasswordMutation } from "@/src/hooks";
import { successToast } from "@/src/lib";
import { forgotPasswordRequestSchema , forgotPasswordRequestType} from "@project/shared";
import { get } from "axios";
import { email } from "zod";

export default function ForgotPasswordPage(){
    const router = useRouter();
    const {getValues,register,handleSubmit,formState} = useForm<forgotPasswordRequestType>({
        resolver : zodResolver(forgotPasswordRequestSchema)
    })
    const forgetPasswordRequestMuation = useForgetPasswordRequestMutation()

    const requestOtpClickHandler = (data : requestOtpType) => {

        const {email} = getValues();
        forgetPasswordRequestMuation.mutate({
            email
        },{
            onSuccess : (data : unknown) => {
                successToast((data as {message:string}).message);
            }
        })
    }
    
    return (
        <>
        <div className="mt-30 w-full">
            <div className="form-wrapper sm:w-1/3 mx-auto border pb-5 px-3 rounded-md shadow-lg mt-10 flex flex-col">
                {/* Header */}
                <div className="text-3xl text-center my-5 font-semibold">Reset Password</div>

    
                {/* Request Reset Password Form  */}
                <form className="flex flex-col gap-3"
                    onSubmit={handleSubmit(requestOtpClickHandler)}>
                    <Input label="Email" placeholder="Enter your email" {...register("email")} type="text" error={formState.errors?.email?.message}/>
                    <Button type="submit" label={forgetPasswordRequestMuation.isPending ? 'Sending' : 'Send Mail'} className=" text-sm w-fit ml-auto cursor-pointer"/>
                    <Error message={formState.errors?.root?.message || ""}/>
                </form>
            
             
            </div>
        </div>
        </>
    )
}