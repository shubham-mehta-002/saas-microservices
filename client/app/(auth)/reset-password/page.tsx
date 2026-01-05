    'use client'

    import { zodResolver } from "@hookform/resolvers/zod"
    import { useRouter, useSearchParams } from "next/navigation"
    import { useForm } from "react-hook-form"
    import { ResetPasswordFormType, resetPasswordFormSchema } from "./types"
    import { FormInputWithLabel, Error } from "@/src/components"
    import { useResetPasswordMutation } from "@/src/hooks"
    import { errorToast, successToast } from "@/src/lib"
    import { useEffect } from "react"
    import { Button } from "@/components/ui/button"
    import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
    } from "@/components/ui/card"

    export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const resetPasswordMutation = useResetPasswordMutation()
    const router = useRouter()

    useEffect(() => {
        if (!token) {
        errorToast("Reset link is invalid or expired")
        router.replace("/forgot-password")
        }
    }, [token, router])

    /** Stop rendering form if token is missing */
    if (!token) {
        return (
        <div className="flex h-screen items-center justify-center">
            <p className="text-muted-foreground">Redirecting...</p>
        </div>
        )
    }

    const {
        getValues,
        register,
        formState: { errors },
        handleSubmit
    } = useForm<ResetPasswordFormType>({
        resolver: zodResolver(resetPasswordFormSchema)
    })

    const submitHandler = () => {
        const data = getValues()
        resetPasswordMutation.mutate(
        {
            resetToken: token ?? "",
            ...data
        },
        {
            onSuccess: (data: unknown) => {
            successToast((data as { message: string }).message)
            router.push("/login")
            }
        }
        )
    }

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg border">
            {/* ---------- Header ---------- */}
            <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">
                Reset Password
            </CardTitle>
            </CardHeader>

            {/* ---------- Form ---------- */}
            <CardContent>
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col gap-5"
            >
                <FormInputWithLabel
                label="New Password"
                placeholder="Enter new password"
                type="password"
                {...register("newPassword")}
                error={errors.newPassword?.message}
                />

                <FormInputWithLabel
                label="Confirm Password"
                placeholder="Enter password again"
                type="password"
                {...register("confirmNewPassword")}
                error={errors.confirmNewPassword?.message}
                />

                <Button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className={
                    resetPasswordMutation.isPending
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }
                >
                {resetPasswordMutation.isPending
                    ? "Resetting..."
                    : "Reset Password"}
                </Button>

                <Error message={errors.root?.message || ""} />
            </form>
            </CardContent>
        </Card>
        </div>
    )
    }
