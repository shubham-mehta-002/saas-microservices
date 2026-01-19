import { UserModelType } from "@project/shared";

declare global {
namespace Express {
    interface User extends IUser {}

    interface Request {
        user: IUser;
    }
}
}

export {};
