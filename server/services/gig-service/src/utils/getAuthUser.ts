import { Request } from "express";

export const getAuthUser = (req: Request) => {
    return {
        userId: req.headers["x-user-id"] as string,
        role: req.headers["x-user-role"] as string,
        college: req.headers["x-user-college"] as string,
    };
};
