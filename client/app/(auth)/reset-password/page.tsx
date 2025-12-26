'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {ResetPasswordFormType,resetPasswordFormSchema} from "./types"
import { Input,Button, Error } from "@/src/components";
import { useResetPasswordMutation } from "@/src/hooks";
import { successToast } from "@/src/lib";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        return <p className="">No token found ...</p>;
    }
    const resetPasswordMutation = useResetPasswordMutation()
    const router = useRouter()

    const {getValues,register, formState:{errors} ,handleSubmit} = useForm<ResetPasswordFormType>({
        resolver: zodResolver(resetPasswordFormSchema)
    })
    
    const submitHandler = () => {
        const data = getValues();
        resetPasswordMutation.mutate({
            resetToken : token,
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
            <div className="mt-30 w-full">
                <div className="form-wrapper sm:w-1/3 mx-auto border pb-5 px-3 rounded-md shadow-lg mt-10 flex flex-col">
                    {/* Header */}
                    <div className="text-3xl text-center my-5 font-semibold">Create New Password</div>
        
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col gap-5">
                        <Input label="New Password" placeholder="Enter new  password" type="password" {...register("newPassword")} error={errors.newPassword?.message} />
                        <Input label="Confirm Password" placeholder="Enter password again" type="password" {...register("confirmNewPassword")} error={errors.confirmNewPassword?.message} />
                        <Button type="submit" label="Reset Password" disabled={resetPasswordMutation.isPending} className={`${resetPasswordMutation.isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}/>
                        </div>
                        <Error message = {errors.root?.message || ""}/>
                    </form> 
                </div>
            </div>
            </>
        </div>
    );
}
