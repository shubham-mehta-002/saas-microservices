    'use client';

    import { FormInputWithLabel, Error } from "@/src/components";
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { requestOtpType } from "./types";
    import { useForgetPasswordRequestMutation } from "@/src/hooks";
    import { successToast } from "@/src/lib";
    import {
    forgotPasswordRequestSchema,
    forgotPasswordRequestType,
    } from "@project/shared";
    import Link from "next/link";
    import { Button } from "@/components/ui/button";
    import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    } from "@/components/ui/card";

    export default function ForgotPasswordPage() {
    const {
        getValues,
        register,
        handleSubmit,
        formState,
    } = useForm<forgotPasswordRequestType>({
        resolver: zodResolver(forgotPasswordRequestSchema),
    });

    const forgetPasswordRequestMuation =
        useForgetPasswordRequestMutation();

    const requestOtpClickHandler = (data: requestOtpType) => {
        const { email } = getValues();

        forgetPasswordRequestMuation.mutate(
        { email },
        {
            onSuccess: (data: unknown) => {
            successToast((data as { message: string }).message);
            },
        }
        );
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg border">
            {/* ---------- Header ---------- */}
            <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">
                Forgot Password?
            </CardTitle>
            <CardDescription>
                No worries, we&apos;ll send you reset instructions
            </CardDescription>
            </CardHeader>

            {/* ---------- Content ---------- */}
            <CardContent className="space-y-5">
            <form
                onSubmit={handleSubmit(requestOtpClickHandler)}
                className="space-y-4"
            >
                <FormInputWithLabel
                label="Email"
                placeholder="Enter your email"
                type="text"
                {...register("email")}
                error={formState.errors?.email?.message}
                />

                <div className="flex items-center justify-between">
                <Link href="/login" className="text-sm underline">
                    Back to Login
                </Link>

                <Button type="submit" disabled={forgetPasswordRequestMuation.isPending}>
                    {forgetPasswordRequestMuation.isPending
                    ? "Sending..."
                    : "Send Mail"}
                </Button>
                </div>

                <Error
                message={formState.errors?.root?.message || ""}
                />
            </form>
            </CardContent>
        </Card>
        </div>
    );
    }
