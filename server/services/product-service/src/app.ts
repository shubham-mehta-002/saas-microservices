import express from "express";
import type { Request, Response } from "express";
import cors from "cors"
import {errorMiddleware} from "@project/shared/server";

const app = express();

app.use(express.json());
app.use(errorMiddleware)
app.use(cors(
    {
        origin : ['http://localhost:8000'],
        allowedHeaders : ['Authorization' , 'Content-Type'],
        credentials : true,
    }
))


app.get('/',(_req : Request,res:Response) => {
    console.log("Request received at /");
    res.send("Welcome to the Product pService");
}) 

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});


export default app;