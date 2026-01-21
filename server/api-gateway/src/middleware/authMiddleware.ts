import { sendApiResponse } from "@project/shared/server";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface GatewayUser {
    userId: string;
    role: string;
    college: string;
}


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return sendApiResponse({
            statusCode : 401,
            message : "Authentication token missing",
            res
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;

        req.user = {
            userId: decoded.user_id,
            role: decoded.role,
            college: decoded.college,
        };

        // Forward user info to downstream services
        req.headers["x-user-id"] = decoded.user_id;
        req.headers["x-user-role"] = decoded.role;
        req.headers["x-user-college"] = decoded.college;

        next();
    } catch {
        return sendApiResponse({
            statusCode: 401,
            message: "Invalid or expired token",
            res,
    });
    }
};
