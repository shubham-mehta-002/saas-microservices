'use client';
type PropsType = {
    label : string;
    onClick?: () => void;
    type? : "button" | "submit" | "reset";
    className? : string;
};
export function Button({label, type="button", onClick, className} : PropsType){
    return(
        <button
            type={type}
            onClick={onClick}
            className={`p-2 border rounded-md  cursor-pointer transition duration-200 ${className ?? ""}`}
            >{label}
        </button>
    )
}