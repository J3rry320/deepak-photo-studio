export type RateLimitTier = 'public' | 'auth' | 'admin' | 'none';

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Lightweight, in-memory sliding window rate limiter.
 * Runs zero-latency local checks without external Redis network calls or cloud costs.
 */
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

/**
 * Check rate limit for a given identifier (IP or User ID) and tier.
 */
export async function checkRateLimit(
  identifier: string,
  tier: RateLimitTier = 'public'
): Promise<RateLimitResult> {
  if (tier === 'none') {
    return { success: true, limit: 1000, remaining: 1000, reset: 0 };
  }

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
