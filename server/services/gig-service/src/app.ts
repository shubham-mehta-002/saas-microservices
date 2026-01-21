import express from "express";
import type { Request, Response } from "express";
import cors from "cors"
import {errorMiddleware} from "@project/shared/server";
import gigRouter from "./route/gig.route.js";

const app = express();


app.use(cors(
    {
        origin : ['http://localhost:8000'],
        allowedHeaders : ['Authorization' , 'Content-Type'],
        credentials : true,
    }
))

app.use(express.json());

app.get('/get',(_req : Request,res:Response) => {
    console.log("Request received at /");
    res.send("Welcome to the Gig Service");
}) 

app.use('/',gigRouter);

app.use(errorMiddleware)
export default app;