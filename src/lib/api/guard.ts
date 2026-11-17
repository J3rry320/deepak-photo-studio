import { checkRateLimit, RateLimitTier } from "@/lib/api/ratelimit";
import {
  SESSION_COOKIE_NAME,
  verifyAdminSessionCookie,
} from "@/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export interface GuardOptions {
  requireAuth?: boolean;
  rateLimit?: RateLimitTier;
  csrf?: boolean; // defaults to true for mutations
  allowedMethods?: Array<"GET" | "POST" | "PUT" | "DELETE" | "PATCH">;
  maxBodySizeBytes?: number; // default 1MB
}

export interface GuardedUser {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
  admin: boolean;
}

export interface GuardedContext {
  params: Record<string, string | string[] | undefined>;
  user?: GuardedUser;
  clientIp: string;
}

export type RouteHandler = (
  req: NextRequest,
  ctx: GuardedContext,
) => Promise<NextResponse> | NextResponse;

type NextRouteProps = {
  params?:
    | Promise<Record<string, string | string[]>>
    | Record<string, string | string[]>;
};

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

function verifyOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) {
    // If no origin header, check referer header
    const referer = req.headers.get("referer");
    if (!referer) return true; // Direct same-origin or server-side calls
    try {
      const refererHost = new URL(referer).host;
      const host = req.headers.get("host");
      return refererHost === host;
    } catch {
      return false;
    }
  }

  try {
    const originHost = new URL(origin).host;
    const host = req.headers.get("host");
    return originHost === host;
  } catch {
    return false;
  }
}

/**
 * Higher Order Function (HOF) providing authentication, rate-limiting, CSRF, and security guards
 */
export function withApiGuard(options: GuardOptions, handler: RouteHandler) {
  const {
    requireAuth = false,
    rateLimit = requireAuth ? "admin" : "public",
    csrf = true,
    allowedMethods,
    maxBodySizeBytes = 1024 * 1024, // 1MB
  } = options;

  return async (
    req: NextRequest,
    routeProps?: NextRouteProps,
  ): Promise<NextResponse> => {
    const clientIp = getClientIp(req);
    const method = req.method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

    // 1. Allowed HTTP methods check
    if (allowedMethods && !allowedMethods.includes(method)) {
      return NextResponse.json(
        { success: false, error: `Method ${method} Not Allowed` },
        { status: 405, headers: { Allow: allowedMethods.join(", ") } },
      );
    }

    // 2. Payload size check
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > maxBodySizeBytes) {
      return NextResponse.json(
        {
          success: false,
          error: "Payload Too Large. Maximum allowed size is 1MB.",
        },
        { status: 413 },
      );
    }

    // 3. CSRF origin verification on mutations
    const isMutation = ["POST", "PUT", "DELETE", "PATCH"].includes(method);
    if (csrf && isMutation) {
      const isOriginValid = verifyOrigin(req);
      if (!isOriginValid) {
        return NextResponse.json(
          {
            success: false,
            error: "CSRF Forbidden: Request origin validation failed.",
          },
          { status: 403 },
        );
      }
    }

    // 4. Rate Limiting check via Upstash Redis
    const rateLimitId = `${clientIp}:${method}`;
    const rateRes = await checkRateLimit(rateLimitId, rateLimit);

    const rateLimitHeaders: Record<string, string> = {
      "X-RateLimit-Limit": String(rateRes.limit),
      "X-RateLimit-Remaining": String(rateRes.remaining),
      "X-RateLimit-Reset": String(rateRes.reset),
    };

    if (!rateRes.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait before trying again.",
        },
        {
          status: 429,
          headers: {
            ...rateLimitHeaders,
            "Retry-After": String(rateRes.reset),
          },
        },
      );
    }

    // 5. Authentication check (Firebase Admin Session Cookie)
    let authenticatedUser: GuardedUser | undefined;

    if (requireAuth) {
      // Check session cookie first, then fallback to Authorization header
      const sessionCookie =
        req.cookies.get(SESSION_COOKIE_NAME)?.value ||
        req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

      if (!sessionCookie) {
        return NextResponse.json(
          {
            success: false,
            error: "Unauthorized: Admin session cookie is missing or expired.",
          },
          { status: 401 },
        );
      }

      try {
        const decoded = await verifyAdminSessionCookie(sessionCookie);

        // Check admin email whitelist / claim
        const adminEmailWhitelist = (process.env.ADMIN_EMAILS || "")
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean);

        const userEmail = (decoded.email || "").toLowerCase();
        const hasAdminClaim = Boolean(decoded.admin);
        const isWhitelisted =
          adminEmailWhitelist.length === 0 ||
          adminEmailWhitelist.includes(userEmail);

        if (!hasAdminClaim && !isWhitelisted) {
          return NextResponse.json(
            {
              success: false,
              error: "Forbidden: Insufficient privileges for admin access.",
            },
            { status: 403 },
          );
        }

        authenticatedUser = {
          uid: decoded.uid,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          admin: true,
        };
      } catch (authError) {
        console.warn(
          "[ApiGuard] Firebase session verification failed:",
          authError,
        );
        return NextResponse.json(
          {
            success: false,
            error: "Unauthorized: Invalid or revoked session token.",
          },
          { status: 401 },
        );
      }
    }

    // 6. Resolve Next.js params (supports async params in Next.js 16)
    let resolvedParams: Record<string, string | string[] | undefined> = {};
    if (routeProps?.params) {
      resolvedParams = await Promise.resolve(routeProps.params);
    }

    const context: GuardedContext = {
      params: resolvedParams,
      user: authenticatedUser,
      clientIp,
    };

    // 7. Execute inner handler with timing & error safety
    try {
      const response = await handler(req, context);

      // Append security and rate-limiting headers
      response.headers.set("X-Content-Type-Options", "nosniff");
      response.headers.set("X-Frame-Options", "DENY");
      response.headers.set(
        "Referrer-Policy",
        "strict-origin-when-cross-origin",
      );

      Object.entries(rateLimitHeaders).forEach(([k, v]) => {
        response.headers.set(k, v);
      });

      return response;
    } catch (handlerError) {
      console.error("[ApiGuard] Unhandled API error:", handlerError);
      return NextResponse.json(
        {
          success: false,
          error:
            handlerError instanceof Error
              ? handlerError.message
              : "Internal server error occurred.",
        },
        { status: 500, headers: rateLimitHeaders },
      );
    }
  };
}

/**
 * Pre-configured wrapper for Public APIs (Rate limited + CSRF protected)
 */
export function withPublicApi(handler: RouteHandler) {
  return withApiGuard(
    { requireAuth: false, rateLimit: "public", csrf: true },
    handler,
  );
}

/**
 * Pre-configured wrapper for Admin APIs (Firebase Session Required + Admin Rate Limit + CSRF)
 */
export function withAdminApi(handler: RouteHandler) {
  return withApiGuard(
    { requireAuth: true, rateLimit: "admin", csrf: true },
    handler,
  );
}

/**
 * Pre-configured wrapper for Auth APIs (Strict Rate Limit + CSRF)
 */
export function withAuthApi(handler: RouteHandler) {
  return withApiGuard(
    { requireAuth: false, rateLimit: "auth", csrf: true },
    handler,
  );
}
