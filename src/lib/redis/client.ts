import { Redis } from '@upstash/redis';

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// In-memory fallback for environments without Upstash credentials (local dev, static build)
class MemoryRedisFallback {
  private store = new Map<string, { value: string; expiry?: number }>();

  async get<T>(key: string): Promise<T | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (item.expiry && Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    try {
      return JSON.parse(item.value) as T;
    } catch {
      return item.value as unknown as T;
    }
  }

  async set(key: string, value: unknown, opts?: { ex?: number }): Promise<'OK'> {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    const expiry = opts?.ex ? Date.now() + opts.ex * 1000 : undefined;
    this.store.set(key, { value: serialized, expiry });
    return 'OK';
  }

  async del(key: string): Promise<number> {
    const existed = this.store.delete(key);
    return existed ? 1 : 0;
  }
}

let redisInstance: Redis | null = null;
const memoryFallback = new MemoryRedisFallback();

if (url && token && url.startsWith('http')) {
  try {
    redisInstance = new Redis({ url, token });
  } catch (error) {
    console.warn('[Redis] Failed to initialize Upstash Redis, using memory fallback:', error);
  }
}

export const redis = redisInstance;
export const fallbackRedis = memoryFallback;
export const isRedisConfigured = !!redisInstance;
