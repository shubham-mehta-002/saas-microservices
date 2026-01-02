"use client";
import { Eye, EyeOff } from "lucide-react"; 
import { useState } from "react";
import { InputHTMLAttributes } from "react";
import { Error } from "@/components";

type PropsType = { 
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
  label: string;
  onChangeHandler? : (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?:string;
} & InputHTMLAttributes<HTMLInputElement>;


export function FormInputWithLabel({ placeholder = "", type = "text", label,onChangeHandler , error, ...rest}: PropsType) {
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type

  return (
    <div className="flex flex-col w-full">
      <label 
        className="mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={onChangeHandler}
        {...rest}
        className="
          border border-gray-300 
          rounded-md 
          p-2 
          w-full 
          text-gray-800 
          placeholder-gray-400
          focus:outline-none 
          focus:ring-2 focus:gray-700
          focus:border-transparent
          transition
          duration-200
          "
          />
        {
          type === "password" && (
            <span   
                className="absolute right-2 top-[50%] -translate-y-1/2 tetx-gray-500 cursor-pointer" 
                onClick={() => setShowPassword(prev=>!prev)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          )
        }
        
        </div>
        {error && <Error message={error}/>}
    </div>
  );
}
