import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });



export const config = {
    // CONSUL_PORT    : Number(process.env.CONSUL_PORT) || 8500,
    // CONSUL_HOST    : process.env.CONSUL_HOST || "127.0.0.1",
    // REDIS_HOST     : process.env.REDIS_HOST,
    // REDIS_PORT     : Number(process.env.REDIS_PORT )|| 12249,
    // REDIS_USERNAME : process.env.REDIS_USERNAME || 'default',
    // REDIS_PASSWORD : process.env.REDIS_PASSWORD,
    SENDER_EMAIL   : process.env.SENDER_EMAIL, 
    EMAIL_PASSWORD : process.env.EMAIL_PASSWORD
}

