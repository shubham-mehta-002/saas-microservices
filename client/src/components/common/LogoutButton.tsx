"use client";

import { useLogoutUserMutation } from "@/src/hooks";

export const LogoutButton = () => {
    const logoutMutation = useLogoutUserMutation();

    const logoutHandler = () => {
        logoutMutation.mutate();
    };

    return (
        <button onClick={logoutHandler} className="px-2">
            Logout
        </button>
);
};
