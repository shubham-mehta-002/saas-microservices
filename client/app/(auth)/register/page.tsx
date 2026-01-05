'use client';

import {
FormInputWithLabel,
OTPInput,
Error,
} from "@/src/components";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import {
OTP_LENGTH,
registerUserType,
registerUserSchema,
RESEND_OTP_COOLDOWN,
} from "@project/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
useSendRegisterOtpMuation,
useVerifyRegisterOtpMutation,
} from "@/src/hooks";
import { errorToast, successToast } from "@/src/lib";
import { useRouter } from "next/navigation";
import { GoogleLoginButton } from "@/src/components";
import { Button } from "@/components/ui/button";
import {
Card,
CardHeader,
CardContent,
CardTitle,
CardDescription,
} from "@/components/ui/card";

export default function SignupPage() {
const router = useRouter();

const [showOtpField, setShowOtpField] = useState(false);
const [otp, setOtp] = useState<string[]>(
    new Array(OTP_LENGTH).fill("")
);
const [userDetails, setUserDetails] =
    useState<registerUserType | null>(null);
const [resendOtpTimer, setResendOtpTimer] = useState(0);

const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
} = useForm<registerUserType>({
    resolver: zodResolver(registerUserSchema),
});

const sendOtpMutation = useSendRegisterOtpMuation();
const verifyOtpMutation = useVerifyRegisterOtpMutation();

const startResendOtpTimer = () => {
    const interval = setInterval(() => {
    setResendOtpTimer((prev) => {
        if (prev <= 1) {
        clearInterval(interval);
        return 0;
        }
        return prev - 1;
    });
    }, 1000);
};

const sendOtpHandler = () => {
    const data = getValues();

    sendOtpMutation.mutate(
    { email: data.email },
    {
        onSuccess: () => {
        setShowOtpField(true);
        setUserDetails(data);
        setResendOtpTimer(RESEND_OTP_COOLDOWN);
        startResendOtpTimer();
        successToast("OTP Sent");
        },
    }
    );
};

const verifyOtpClickHandler = (
    e: MouseEvent<HTMLButtonElement>
) => {
    if (!userDetails) {
    setShowOtpField(false);
    return;
    }

    const formattedOtp = otp.join("");
    if (formattedOtp.trim().length !== OTP_LENGTH) {
    errorToast("Enter a valid OTP!!");
    return;
    }

    verifyOtpMutation.mutate(
    {
        otp: formattedOtp,
        ...userDetails,
    },
    {
        onSuccess: () => {
        successToast("Registered Successfully");
        router.push("/login");
        },
    }
    );
};

const isSendOtpRequestPending = sendOtpMutation.isPending;
const isVerifyOtpRequestPending =
    verifyOtpMutation.isPending;

return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
    <Card className="w-full max-w-md shadow-lg border">
        {/* ---------- Header ---------- */}
        <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-semibold">
            Create an account
        </CardTitle>
        <CardDescription>
            Start your freelancing journey today
        </CardDescription>
        </CardHeader>

        {/* ---------- Content ---------- */}
        <CardContent className="space-y-6">
        {/* ---------- Signup Form ---------- */}
        {!showOtpField && (
            <>
            <form
                onSubmit={handleSubmit(sendOtpHandler)}
                className="space-y-5"
            >
            <FormInputWithLabel
                label="Email"
                placeholder="Enter your email"
                type="text"
                {...register("email")}
                error={errors.email?.message}
                />

            <FormInputWithLabel
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
                />

            <FormInputWithLabel
                label="Confirm Password"
                placeholder="Enter password again"
                type="password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                />

          
            <Button
                type="submit"
                disabled={
                    resendOtpTimer > 0 ||
                    isSendOtpRequestPending
                }
                className="flex justify-center items-center w-full"
            >
                {resendOtpTimer > 0
                    ? `Wait for ${resendOtpTimer} seconds`
                    : isSendOtpRequestPending
                    ? "Signing Up..."
                    : "Sign Up"}
            </Button>
            

                <Error message={errors.root?.message || ""} />

                {resendOtpTimer > 0 && (
                <span
                    className="text-sm underline cursor-pointer"
                    onClick={() => setShowOtpField(true)}
                >
                    OTP
                </span>
                )}
            </form>

            {/* ---------- Divider ---------- */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground bg-white">
                    Or continue with
                </span>
                </div>
            </div>

            <GoogleLoginButton />

            <div className="text-center text-sm">
                Already have an account?
                <Link
                href="/login"
                className="ml-1 text-primary hover:underline"
                >
                Sign in
                </Link>
            </div>
            </>
        )}

        {/* ---------- OTP Section ---------- */}
        {showOtpField && (
            <div className="space-y-4 text-center">
            <span className="text-lg">
                Enter OTP sent to email
            </span>

            <OTPInput
                length={OTP_LENGTH}
                type="numeric"
                otpValue={otp}
                setOtpValue={setOtp}
            />

            <Button
                disabled={isVerifyOtpRequestPending}
                onClick={verifyOtpClickHandler}
            >
                {isVerifyOtpRequestPending
                ? "Verifying..."
                : "Verify OTP"}
            </Button>

            {resendOtpTimer === 0 ? (
                <Button
                disabled={isSendOtpRequestPending}
                onClick={sendOtpHandler}
                className="bg-green-500 text-white"
                >
                {isSendOtpRequestPending
                    ? "Sending OTP"
                    : "Resend OTP"}
                </Button>
            ) : (
                <span className="text-sm">
                {resendOtpTimer} seconds
                </span>
            )}

            <span
                className="text-sm underline cursor-pointer"
                onClick={() => setShowOtpField(false)}
            >
                Back
            </span>
            </div>
        )}
        </CardContent>
    </Card>
    </div>
);
}
