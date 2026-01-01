import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from "url";
// import {cleanup } from "@project/shared/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env relative to this file
dotenv.config({ path: path.resolve(__dirname, '../.env') });
