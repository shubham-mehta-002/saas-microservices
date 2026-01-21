import proxy from "express-http-proxy";

const serviceMap: Record<string, string> = {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:8001",
    college: process.env.AUTH_SERVICE_URL || "http://localhost:8001",
    user : process.env.AUTH_SERVICE_URL || "http://localhost:8001",
    gig : process.env.GIG_SERVICE_URL || "http://localhost:8002",
};


export const proxyMiddleware = (serviceName: string) => {
    const url = serviceMap[serviceName];
    if (!url) {
        throw new Error(`No service URL defined for ${serviceName}`);
    }

    return proxy(url, {
        // proxyReqPathResolver: (req) => {
        // // forward the original path minus the service prefix
        //     const pathWithoutPrefix = req.originalUrl.replace(`/${serviceName}`, "");
        //     return pathWithoutPrefix || "/";
        // },
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        // forward headers like auth token
            proxyReqOpts.headers = {
                ...proxyReqOpts.headers,
                authorization: srcReq.headers.authorization || "",
            };
        return proxyReqOpts;
        },
    });
};
