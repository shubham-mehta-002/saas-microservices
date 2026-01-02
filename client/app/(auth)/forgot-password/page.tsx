'use client';
import { FormInputWithLabel, Error } from "@/src/components"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestOtpType } from "./types";
import { useForgetPasswordRequestMutation } from "@/src/hooks";
import { successToast } from "@/src/lib";
import { forgotPasswordRequestSchema , forgotPasswordRequestType} from "@project/shared";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function ForgotPasswordPage(){
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
        <div className="mt-44 w-full md:w-1/2 max-w-[500px] flex flex-col items-center justify-center mx-auto overflow-y-visible">
            <div className="container border-2 border-black rounded-md shadow-lg px-4 py-6">
                {/* Header */}
                <div className="header-wrapper mb-5 gap-1 flex flex-col">
                    <div className="text-2xl font-semibold ">Forgot Password ? </div>
                    <div className="text-md">No worries, we'll send you reset instructions</div>
                </div>
                {/* Request Reset Password Form  */}
                <form className="flex flex-col gap-3 items"
                    onSubmit={handleSubmit(requestOtpClickHandler)}>
                    <FormInputWithLabel label="Email" placeholder="Enter your email" {...register("email")} type="text" error={formState.errors?.email?.message}/>
                    <div className="flex items-center justify-center mt-1 ">
                        <Link href={"/login"} className="flex items-center justify-center">
                            <span className="text-sm cursor-pointer mt-2  underline">Back to Login Page</span>
                        </Link>
                        <Button type="submit" className=" text-sm w-fit ml-auto cursor-pointer">{forgetPasswordRequestMuation.isPending ? 'Sending' : 'Send Mail'}</Button>
                    </div>
                    <Error message={formState.errors?.root?.message || ""}/>
                </form>
            </div>
        </div>
        </>
    )
}