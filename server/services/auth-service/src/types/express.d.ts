import { IUser } from "../model/user.model.ts";

declare global {
namespace Express {
    interface User extends IUser {}

    interface Request {
        user: IUser;
    }
}
}

export {};
