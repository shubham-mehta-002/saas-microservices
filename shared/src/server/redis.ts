import { createClient } from 'redis';
import { config } from './config.js';

export const redisClient = createClient({
    username: config.REDIS_USERNAME,
    password: config.REDIS_PASSWORD,
    socket: {
        host: config.REDIS_HOST,
        port: config.REDIS_PORT
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();
