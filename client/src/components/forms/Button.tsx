'use client';

import { ButtonHTMLAttributes, MouseEventHandler } from "react";
type PropsType = {
    label : string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({label, type="button", onClick, className,...rest} : PropsType){
    return(
        <button
            type={type}
            onClick={onClick}
            className={`p-[7px] border rounded-md  transition duration-200 ${className ?? ""}`}
            {...rest}
        >
            {label}
        </button>
    )
}