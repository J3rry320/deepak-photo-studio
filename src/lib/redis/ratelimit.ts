import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './client';

export type RateLimitTier = 'public' | 'auth' | 'admin' | 'none';

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// In-memory sliding window fallback when Upstash credentials are not set
class MemoryRateLimiter {
  private requests = new Map<string, number[]>();

  limit(identifier: string, maxRequests: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const timestamps = this.requests.get(identifier) || [];
    const validTimestamps = timestamps.filter((t) => now - t < windowMs);

    if (validTimestamps.length >= maxRequests) {
      const oldest = validTimestamps[0];
      const reset = Math.ceil((oldest + windowMs - now) / 1000);
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        reset,
      };
    }

    validTimestamps.push(now);
    this.requests.set(identifier, validTimestamps);

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - validTimestamps.length,
      reset: Math.ceil(windowMs / 1000),
    };
  }
}

const memoryLimiter = new MemoryRateLimiter();

// Create Upstash Ratelimit instances if redis is active
const upstashPublicLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(15, '10 s'),
      prefix: 'ratelimit:public',
      analytics: false,
    })
  : null;

const upstashAuthLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '60 s'),
      prefix: 'ratelimit:auth',
      analytics: false,
    })
  : null;

const upstashAdminLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(120, '60 s'),
      prefix: 'ratelimit:admin',
      analytics: false,
    })
  : null;

/**
 * Check rate limit for a given identifier (IP or User ID) and tier
 */
export async function checkRateLimit(
  identifier: string,
  tier: RateLimitTier = 'public'
): Promise<RateLimitResult> {
  if (tier === 'none') {
    return { success: true, limit: 1000, remaining: 1000, reset: 0 };
  }

  // 1. Try Upstash Redis Rate Limiting
  if (redis) {
    try {
      if (tier === 'auth' && upstashAuthLimiter) {
        const res = await upstashAuthLimiter.limit(identifier);
        return { success: res.success, limit: res.limit, remaining: res.remaining, reset: Math.ceil(res.reset / 1000) };
      }
      if (tier === 'admin' && upstashAdminLimiter) {
        const res = await upstashAdminLimiter.limit(identifier);
        return { success: res.success, limit: res.limit, remaining: res.remaining, reset: Math.ceil(res.reset / 1000) };
      }
      if (tier === 'public' && upstashPublicLimiter) {
        const res = await upstashPublicLimiter.limit(identifier);
        return { success: res.success, limit: res.limit, remaining: res.remaining, reset: Math.ceil(res.reset / 1000) };
      }
    } catch (error) {
      console.warn('[RateLimit] Upstash error, using in-memory limiter fallback:', error);
    }
  }

  // 2. In-memory sliding window fallback
  switch (tier) {
    case 'auth':
      return memoryLimiter.limit(`auth:${identifier}`, 5, 60 * 1000);
    case 'admin':
      return memoryLimiter.limit(`admin:${identifier}`, 120, 60 * 1000);
    case 'public':
    default:
      return memoryLimiter.limit(`public:${identifier}`, 15, 10 * 1000);
  }
}
