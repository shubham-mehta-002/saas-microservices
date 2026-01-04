import { IUser } from "../model/user.model.js";
import { Request } from "express";
export interface AuthRequest extends Request{
    user : IUser;
}