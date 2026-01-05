import express from "express";
import type { Request, Response } from "express";
import cors from "cors"
import {errorMiddleware} from "@project/shared/server";
import passport from "passport";
import cookieParser from "cookie-parser"
import "./config/passport.config.js";
import authRouter from "./route/auth.route.js";
import collegeRouter from "./route/college.route.js"
import userRouter from "./route/user.route.js";

const app = express();


app.use(cors(
    {
        origin : ['http://localhost:8000'],
        allowedHeaders : ['Authorization' , 'Content-Type'],
        credentials : true,
    }
))

app.use(express.json());
app.use(cookieParser()); 
app.use(passport.initialize());


app.use('/',authRouter);
app.use('/college',collegeRouter)
app.use('/user',userRouter);

app.get('/get',(_req : Request,res:Response) => {
    console.log("Request received at /");
    res.send("Welcome to the Auth Service");
}) 

app.use(errorMiddleware)
export default app;