'use client';
import { Input, Button, Error } from "@/src/components"
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {loginUserType, loginUserSchema} from "@project/shared"
import { useLoginMuations } from "@/src/hooks";
import { successToast } from "@/src/lib";
import { useRouter } from "next/navigation";
import { GoogleLoginButton } from "@/src/components";

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
    <div className="mt-30 w-full md:w-1/2 max-w-[500px]  flex flex-col items-center justify-center mx-auto overflow-y-visible">
        <div className="container border-2 border-black rounded-md shadow-lg px-4 py-6">
        {/* Header */}
        <div className="header-wrapper mb-5 gap-1 flex flex-col">
            <div className="text-2xl font-semibold ">Welcome back</div>
            <div className="text-md">Enter your credentials to access your account</div>
        </div>
        {/* Form */}
        <div className="form-wrapper flex items-center justify-center flex-col">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="w-full">
                <div className="w-full mx-auto flex flex-col">
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
                        <Link href={'/register'}>
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
                <div className="w-full">
                    <div className="relative my-3">
                        <div className="absolute inset-0 flex items-center ">
                            <span className="w-full border-t border-border"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground bg-white">Or continue with</span>
                        </div>
                    </div>
                    <GoogleLoginButton/>
                </div>
        </div>
        </div>
    </div>
    )
}