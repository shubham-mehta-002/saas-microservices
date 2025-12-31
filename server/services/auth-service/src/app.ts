import express from "express";
import type { Request, Response } from "express";
import cors from "cors"
import {errorMiddleware} from "@project/shared/server";
import authRouter from "./route/auth.route.js";
import passport from "passport";
import "./config/passport.config.js";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use(cors(
    {
        origin : ['http://localhost:8000'],
        allowedHeaders : ['Authorization' , 'Content-Type'],
        credentials : true,
    }
))



app.use('/',authRouter);
app.get('/get',(_req : Request,res:Response) => {
    console.log("Request received at /");
    res.send("Welcome to the Auth Service");
}) 

app.use(errorMiddleware)
export default app;