import http from "http";
import app from "./app.js";
import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from "url";
import {cleanup, registerWithConsul , connectDb} from "@project/shared/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


// connect with db
await connectDb(process.env.MONGO_URI as string)

export const PORT = Number(process.env.PORT) || 5001;
const server = http.createServer(app);
const host:string = process.env.HOST || "localhost";
const serviceName:string = 'auth-service'

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});


server.listen(PORT, async () => {
  console.log(`Auth Service running on port ${PORT}`);
 
  await registerWithConsul({port:PORT,host,name:serviceName});
});




const deregister = () => {
  cleanup({host,name:serviceName,port:PORT})
}
process.on("SIGINT", deregister);
process.on("SIGTERM", deregister); 
