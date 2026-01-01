import proxy from "express-http-proxy";
// import { getServiceAddress } from "@project/shared/server";


export const proxyMiddleware = async(serviceName:string) => {
    // Get from consul
    // const {host,port} = await getServiceAddress(serviceName);
    // console.log({host,port,serviceName});
    // const port = process.env.PORT;
    // const host = process.env.HOST;

    let url :string = "";
    if(serviceName === "auth"){
        url = process.env.AUTH_SERVICE_URL!
    }
    
    // const target = `http://${host}:${port}`;

    return proxy(url);
}