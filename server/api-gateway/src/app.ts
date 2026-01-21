// import cookieParser from "cookie-parser";
import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { proxyMiddleware, requireAuth } from "./middleware/index.js";
import { RateLimitError } from "@project/shared/server";
import { errorMiddleware } from "@project/shared/server";

const app = express();


const limiter = rateLimit({
    windowMs : 15 * 60 * 1000, // 15 minutes,
    max : 100, // limit each IP to 100 requests per windowMs
    // message : "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders : true, // adds rate limit info to the RateLimit-* headers
    legacyHeaders : false, // disables old, deprecated headers like X-RateLimit-*
    keyGenerator : (req:Request) => {return  ipKeyGenerator(req.ip as string) },
    handler: (_req,_res,next) => {
        next(new RateLimitError("Too many requests from this IP, please try again after 15 minutes"))
    },
})

app.use(cors(
    {
        origin : ['http://localhost:3000'],
        allowedHeaders : ['Authorization' , 'Content-Type'],
        credentials : true,
    }
))
app.use(express.json({limit : '100kb'}))
app.use(express.urlencoded({limit : '100kb' , extended : true}))
// app.use(cookieParser())
app.set('trust proxy', 1) // trust first proxy
// app.use(limiter)
console.log(typeof limiter)



const setupProxies = async () => {
    const authProxy = proxyMiddleware("auth");
    const collegeProxy = proxyMiddleware("college");
    const userProxy = proxyMiddleware("user");
    const gigProxy = proxyMiddleware("gig");

    app.use("/auth", authProxy);
    app.use("/college", collegeProxy);

    // USER SERVICE
    app.use("/user", requireAuth, userProxy);

    // GIG SERVICE
    app.use("/gig/public", gigProxy);                //  no auth needed
    app.use("/gig/private", requireAuth, gigProxy);  //  protected
};

setupProxies(); 


app.use(errorMiddleware)

app.get('/',(_req : Request,res:Response) => {
    res.send("Welcome to the API Gateway");
})



export default app;
