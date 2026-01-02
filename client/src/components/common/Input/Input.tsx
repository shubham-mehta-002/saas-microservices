'use client'
import { InputHTMLAttributes } from "react"
import { StyledInput } from "./Input-style"

type Props = {
    className?: string;
    placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

// 3️⃣ Input Component
export const Input = ({ type = "text", className, placeholder, ...props }: Props) => {
    return <StyledInput type={type} placeholder={ placeholder} className={className} {...props} />;
};