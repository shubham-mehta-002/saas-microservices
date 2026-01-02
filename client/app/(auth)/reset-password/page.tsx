'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {ResetPasswordFormType,resetPasswordFormSchema} from "./types"
import { FormInputWithLabel, Error } from "@/src/components";
import { useResetPasswordMutation } from "@/src/hooks";
import { errorToast, successToast } from "@/src/lib";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const resetPasswordMutation = useResetPasswordMutation()
    const router = useRouter()
    
    useEffect(() => {
        if (!token) {
            errorToast("Reset link is invalid or expired");
            router.replace("/forgot-password");
        }
    }, [token, router]);

    /** Stop rendering form if token is missing */
    if (!token) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-gray-600">Redirecting...</p>
            </div>
        );
    }

    const {getValues,register, formState:{errors} ,handleSubmit} = useForm<ResetPasswordFormType>({
        resolver: zodResolver(resetPasswordFormSchema)
    })
    
    const submitHandler = () => {
        const data = getValues();
        resetPasswordMutation.mutate({
            resetToken : token? token : "",
            ...data
        },{
            onSuccess : (data : unknown) => {
                successToast((data as {message:string}).message);
                router.push('/login')
            }
        })
    }

    return (  
        <div>
        <>
            <div className="mt-44 w-full md:w-1/2 max-w-[500px] flex flex-col items-center justify-center mx-auto overflow-y-visible">
                <div className="container border-2 border-black rounded-md shadow-lg px-4 py-6">
                    {/* Header */}
                    <div className="header-wrapper mb-5 gap-1 flex flex-col">
                        <div className="text-2xl font-semibold ">Reset Password </div>
                    </div>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col gap-5">
                        <FormInputWithLabel label="New Password" placeholder="Enter new  password" type="password" {...register("newPassword")} error={errors.newPassword?.message} />
                        <FormInputWithLabel label="Confirm Password" placeholder="Enter password again" type="password" {...register("confirmNewPassword")} error={errors.confirmNewPassword?.message} />
                        <Button type="submit"  disabled={resetPasswordMutation.isPending} className={`${resetPasswordMutation.isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Reset Password</Button>
                        </div>
                        <Error message = {errors.root?.message || ""}/>
                    </form> 
                </div>
            </div>
            </>
        </div>
    );
}
