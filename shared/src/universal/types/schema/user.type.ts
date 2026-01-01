import { userRoles, authProviders } from "../../constants.js";
export interface UserType {
    _id: string;
    name?: string;
    email: string;
    role: typeof userRoles[number];
    avatar?: string;
    authProvider: typeof authProviders[number]
    googleId?: string;
    createdAt: string; // Date get serialized in HTTP response 
    updatedAt: string;
}