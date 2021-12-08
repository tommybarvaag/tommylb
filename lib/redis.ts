import type { Redis as RedisType } from "ioredis";
import Redis from "ioredis";

const redis: RedisType = new Redis(process.env.REDIS_URL);

export default redis;
