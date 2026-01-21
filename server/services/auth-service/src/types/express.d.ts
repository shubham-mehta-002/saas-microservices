// types/express.d.ts
export interface GatewayUser {
    userId: string;
    role: string;
    collegeId: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: GatewayUser;
        }
    }
}

export {};
