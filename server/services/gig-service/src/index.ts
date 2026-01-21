import "./env.js";  

import http from "http";
import {connectDb} from "@project/shared/server";
import app from "./app.js";

// connect with db
await connectDb(process.env.MONGO_URI as string)

export const PORT = Number(process.env.PORT) || 5002;
const server = http.createServer(app);


server.listen(PORT, async () => {
  console.log(`Auth Service running on port ${PORT}`);
});
