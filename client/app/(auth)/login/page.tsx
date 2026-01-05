    'use client';

    import { FormInputWithLabel, Error } from "@/src/components";
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import Link from "next/link";
    import { loginUserType, loginUserSchema } from "@project/shared";
    import { useLoginMuations } from "@/src/hooks";
    import { successToast } from "@/src/lib";
    import { useRouter } from "next/navigation";
    import { GoogleLoginButton } from "@/src/components";
    import { Button } from "@/components/ui/button";
    import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    } from "@/components/ui/card";

    export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginUserType>({
        resolver: zodResolver(loginUserSchema),
    });

    const loginMutation = useLoginMuations();
    const isLoginPending = loginMutation.isPending;

    const router = useRouter();

    const onSubmit = (data: loginUserType) => {
        loginMutation.mutate(
        { ...data },
        {
            onSuccess: () => {
            successToast("Login Successfull");
            router.push("/profile/complete");
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
                Welcome back
            </CardTitle>
            <CardDescription>
                Enter your credentials to access your account
            </CardDescription>
            </CardHeader>

            {/* ---------- Content ---------- */}
            <CardContent className="space-y-1">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 h-fit"
            >
                <FormInputWithLabel
                label="Email"
                type="text"
                placeholder="Enter your email"
                {...register("email")}
                error={errors.email?.message}
                />

                <FormInputWithLabel
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password?.message}
                />

                <div className="flex items-center justify-between text-sm">
                <Link
                    href="/register"
                    className="hover:underline"
                >
                    Don't have an account?
                </Link>
                <Link
                    href="/forgot-password"
                    className="hover:underline"
                >
                    Forgot password?
                </Link>
                </div>

                <Button
                type="submit"
                disabled={isLoginPending}
                className="w-full"
                >
                {isLoginPending ? "Logging in..." : "Log In"}
                </Button>

                <Error message={errors.root?.message || ""} />
            </form>

            {/* ---------- Divider ---------- */}
            <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center ">
                <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
                </div>
            </div>

            {/* ---------- Google Auth ---------- */}
            <GoogleLoginButton />
            </CardContent>
        </Card>
        </div>
    );
    }
