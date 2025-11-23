import proxy from "express-http-proxy";
import { getServiceAddress } from "@project/shared/server";


export const proxyMiddleware = async(serviceName:string) => {
    // Get from consul
    const {host,port} = await getServiceAddress(serviceName);
    console.log({host,port,serviceName});
    
    const target = `http://${host}:${port}`;

    return proxy(target);
}