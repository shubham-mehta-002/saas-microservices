"use client";

import { useLogoutUserMutation } from "@/src/hooks";
import { Button } from "../forms";
import { successToast } from "@/src/lib";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
    const logoutMutation = useLogoutUserMutation();
    const router = useRouter()

    const logoutHandler = () => {
        logoutMutation.mutate(undefined, {
            onSuccess : (response) => {
                successToast(response.message || "Logged out")
                router.replace('/')
            }
        }
        );
    };

    return (
        <Button label="Logout" onClick={logoutHandler} className="cursor-pointer">
            Logout
        </Button>
);
};
