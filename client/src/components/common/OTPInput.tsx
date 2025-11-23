'use client';
import { useRef ,useState, KeyboardEvent, ChangeEvent, Dispatch, SetStateAction} from "react";

type otpType = 'numeric' | 'alphanumeric' | 'alpha';

type OTPInputPropsType = {
    length : number;
    type? : otpType; // default -> numeric 
    inputClassName?: string;
    containerClassName?: string;
    otpValue : string[];
    setOtpValue : Dispatch<SetStateAction<string[]>>
}

export const OTPInput = ({
    length,
    type = "numeric",
    containerClassName,
    inputClassName,
    otpValue,
    setOtpValue    
    } : OTPInputPropsType) => {


    const inputRef = useRef<Array<HTMLInputElement>>([]);
    // const [otpValue, setOtpValue ] = useState<string[]>(new Array(length).fill(''));
    
    // Validation based on otp type
    const validateInput = (char: string) => {
        if (type === "numeric") return /^\d$/.test(char);
        if (type === "alpha") return /^[a-zA-Z]$/.test(char);
        return /^[a-zA-Z0-9]$/.test(char);
    };

    
    // handle key down
    const handleKeyDown = (e : KeyboardEvent<HTMLInputElement>,index : number) => {
        
        if(e.key.toLowerCase() ===  'backspace'){
            updateVal('', index);
            if(index>0) inputRef.current[index-1]?.focus();
        }

        if(e.key === "ArrowLeft"){
            e.preventDefault()
            inputRef.current[index-1]?.focus();
        }

        if(e.key === "ArrowRight"){
            e.preventDefault()
            inputRef.current[index+1]?.focus();
        }
    }

    // handle value change
    const onChangeHandler = (e : ChangeEvent<HTMLInputElement>, index:number) => {
        const val = e.target.value;
        const char = val.slice(-1);
        if(!validateInput(char)) return;
  
        updateVal(char, index);
        
        // move focus to next block
        if(index < length - 1){
            inputRef.current[index+1]?.focus();
        }
    }


    // update opt val
    const updateVal = (char : string, index: number) => {
        let newOtp = [...otpValue]
        newOtp[index] = char;
        setOtpValue(newOtp); 

        // if (newOtp.length === length && newOtp.every(c => c !== '' && c !== ' ')) {
        //     onComplete?.(newOtp.join(''));
        // }
    }

    // on copy paste OTP
    const pasteOtpHandler = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pastedOtp = e.clipboardData.getData("text").trim();

        const newOtp = [...otpValue]; 

        for (let i = 0; i < pastedOtp.length && index + i < length; i++) {
            const char = pastedOtp[i];
            if (validateInput(char)) {
                newOtp[index + i] = char;
            }
        }
        
        setOtpValue(newOtp);

        // Move focus to next empty input
        const nextIndex = Math.min(index + pastedOtp.length, length - 1);
        inputRef.current[nextIndex]?.focus();

        // if (newOtp.every(c => c !== '')) onComplete?.(newOtp.join(''));
    };


    return(
        <div className={`flex gap-1 ${containerClassName}`}>
        {
            Array.from({length}).map((_,index) => (
            <input 
                key={index}
                inputMode={type === "numeric" ? "numeric" : "text"}
                type={type === 'numeric' ? 'tel' : 'text'}
                className = {`w-12 h-12 border-2 rounded-md outline-none  focus:ring-2 focus:ring-gray-500 text-center text-md ${inputClassName}`}
                ref={(el) =>{ if(el) inputRef.current[index] = el}}
                onKeyDown={e => handleKeyDown(e,index)}
                value={otpValue[index]}
                onChange={e => onChangeHandler(e,index)}
                onPaste={e => pasteOtpHandler(e,index)}
                />  
            ))
        }
        </div>
    )
}