import { Request, Response,NextFunction } from "express";

type asyncFnType = (req:Request, res:Response,next:NextFunction) => Promise<any>

export const asyncHandler = (fn : asyncFnType) => {
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{    
            await fn(req,res,next);
        }catch(err){
            throw(err);
        }
    }
}