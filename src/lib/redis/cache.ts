import { redis, fallbackRedis } from './client';

/**
 * Get a cached value by key
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    if (redis) {
      const data = await redis.get<T>(key);
      return data;
    }
    return await fallbackRedis.get<T>(key);
  } catch (error) {
    console.warn(`[Cache] Error reading key "${key}":`, error);
    return await fallbackRedis.get<T>(key);
  }
}

/**
 * Set a cached value with optional TTL in seconds (default 3600s / 1 hour)
 */
export async function cacheSet<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
  try {
    if (redis) {
      await redis.set(key, value, { ex: ttlSeconds });
      return;
    }
    await fallbackRedis.set(key, value, { ex: ttlSeconds });
  } catch (error) {
    console.warn(`[Cache] Error setting key "${key}":`, error);
    await fallbackRedis.set(key, value, { ex: ttlSeconds });
  }
}

/**
 * Delete a cached key
 */
export async function cacheDelete(key: string): Promise<void> {
  try {
    if (redis) {
      await redis.del(key);
      return;
    }
    await fallbackRedis.del(key);
  } catch (error) {
    console.warn(`[Cache] Error deleting key "${key}":`, error);
    await fallbackRedis.del(key);
  }
}

/**
 * Cache-aside query helper: checks cache first, executes fetcher on miss, then populates cache.
 */
export async function cachedQuery<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = await cacheGet<T>(key);
  if (cached !== null && cached !== undefined) {
    return cached;
  }

  const result = await fetcher();
  if (result !== null && result !== undefined) {
    await cacheSet(key, result, ttlSeconds);
  }
  return result;
}
