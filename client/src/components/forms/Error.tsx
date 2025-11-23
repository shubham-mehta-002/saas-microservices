import {JSX} from "react";

export function Error({message} : {message:string}) : JSX.Element {
    return (
        <span className="text-red-500 text-sm">{message}</span>
    )
}