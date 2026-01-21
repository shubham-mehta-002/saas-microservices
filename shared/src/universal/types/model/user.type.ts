import { Types } from "mongoose";
import {  authProviders } from "../../constants.js";
import { userRolesType } from "../general/auth.type.js";
export type  UserModelType = {
    _id: string;
    name?: string;
    email: string;
    role: userRolesType;
    avatar?: string;
    authProvider: typeof authProviders[number]
    googleId?: string;
    createdAt: string; // Date get serialized in HTTP response 
    updatedAt: string;
    isProfileCompleted: boolean;
    yearOfStudy: number;
    courseName: string;
    college: Types.ObjectId
}

