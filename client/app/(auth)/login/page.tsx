'use client';
import { Input, Button, Error, OTPInput } from "@/src/components"
import { useForm } from "react-hook-form";
import {loginValidationSchema} from "./validations"
import { zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";

type FormData = {
    email : string;
    password : string;
}

export default function LoginPage(){
    const OTP_LENGTH = 6;
    const {register, handleSubmit, formState: {errors}, watch} = useForm<FormData>({
        resolver : zodResolver(loginValidationSchema)
    });
   
    const onSubmit = (data : FormData) => {
        console.log({data})
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
                        onChangeHandler={()=>{console.log("ASD")}}
                        {...register("email")}
                        error = {errors.email?.message}
                    />
                    <Input 
                        label="Password" 
                        type="password" 
                        placeholder="Enter your password" 
                        onChangeHandler={()=>{console.log("ASD")}}
                        {...register("password")}
                        error={errors.password?.message}
                    />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <Link href={"/register"}>
                        <span className="text-sm flex justify-end my-1 hover:underline cursor-pointer">Don't have an account?</span>
                    </Link>
                    <Link href={'/forget-password'}>
                        <span className="text-sm flex justify-end my-1 hover:underline cursor-pointer">Forget Password?</span>
                    </Link>
                </div>
                <Button label="Login" type="submit" className="mt-3"/>
            </div>
            <Error message = {errors.root?.message || ""}/>
        </form>
       </>
    )
}