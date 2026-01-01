import "./env.js";  

import http from "http";
import app from "./app.js";
// import dotenv from "dotenv"
// import path from 'path';
// import { fileURLToPath } from "url";
// import {cleanup } from "@project/shared/server";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load .env relative to this file
// dotenv.config({ path: path.resolve(__dirname, '../.env') });

const server = http.createServer(app);

export const PORT = Number(process.env.PORT) || 5000
// const host:string = process.env.HOST || "localhost";
// const serviceName = 'api-gateway'


// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});


server.listen(PORT, async () => {
  console.log(`API Gateway running on port ${PORT}`);
  
  // await registerWithConsul({port:PORT,host,name:serviceName});
});


// const deregister = () => {
//   cleanup({host,name:serviceName,port:PORT})
// }
// process.on("SIGINT", deregister);
// process.on("SIGTERM", deregister);
