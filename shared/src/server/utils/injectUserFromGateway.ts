import { Request, Response, NextFunction } from "express";
export const injectUserFromGateway = (req: Request, _res: Response, next: NextFunction) => {
    const userId = req.headers["x-user-id"];
    const role = req.headers["x-user-role"];
    const collegeId = req.headers["x-user-college"];

    if (userId && role) {
        req.user = {
            userId,
            role,
            collegeId
        };
    }

    next();
};