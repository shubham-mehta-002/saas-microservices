'use client';
import { Input, Button, Error } from "@/src/components"
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {loginUserType, loginUserSchema} from "@project/shared"
import { useLoginMuations } from "@/src/hooks";
import { successToast } from "@/src/lib";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const {register, handleSubmit, formState: {errors}} = useForm<loginUserType>({
        resolver : zodResolver(loginUserSchema)
    });

    const loginMutation = useLoginMuations()
    const isLoginPending = loginMutation.isPending; 
    
    const router = useRouter();
    const onSubmit = (data : loginUserType) => {
        loginMutation.mutate({
            ...data
        },{
            onSuccess : () => {
                successToast("Login Successfull")
                router.push('/')
            }
            
        })
    } 

    return (
       <>
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="mt-30 w-full">
            <div className="sm:w-1/3 mx-auto border pb-5 px-3 rounded-md shadow-lg mt-10 flex flex-col">
                {/* Header */}
                <div className="text-3xl text-center my-5 font-semibold">Login</div>
    
                {/* Input Fields */}
                <div className=" flex flex-col gap-5">
                    <Input 
                        label="Email" 
                        type="text" 
                        placeholder="Enter your email" 
                        {...register("email")}
                        error = {errors.email?.message}
                    />
                    <Input 
                        label="Password" 
                        type="password" 
                        placeholder="Enter your password" 
                        {...register("password")}
                        error={errors.password?.message}
                    />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <Link href={"/register"}>
                        <span className="text-sm flex justify-end my-1 hover:underline cursor-pointer">Don't have an account?</span>
                    </Link>
                    <Link href={'/forgot-password'}>
                        <span className="text-sm flex justify-end my-1 hover:underline cursor-pointer">forgot Password?</span>
                    </Link>
                </div>
                <Button label={isLoginPending ? "Logging" : "Log In"} type="submit" disabled={isLoginPending} className={`mt-3 ${isLoginPending ? "cursor-not-allowed" : "cursor-pointer"}`}/>
            </div>
            <Error message = {errors.root?.message || ""}/>
        </form>
       </>
    )
}