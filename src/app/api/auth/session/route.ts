import { NextRequest, NextResponse } from 'next/server';
import { withAuthApi } from '@/lib/api/guard';
import {
  createAdminSessionCookie,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_DURATION_MS,
  getAdminAuth,
} from '@/lib/firebase/admin';

export const POST = withAuthApi(async (req: NextRequest) => {
  const body = await req.json().catch(() => null);
  const idToken = body?.idToken;

  if (!idToken || typeof idToken !== 'string') {
    return NextResponse.json(
      { success: false, error: 'idToken is required.' },
      { status: 400 }
    );
  }

  // Verify ID token first to ensure authenticity
  const auth = getAdminAuth();
  if (!auth) {
    return NextResponse.json(
      {
        success: false,
        error: 'Firebase Admin is not configured. Please set service account credentials.',
      },
      { status: 503 }
    );
  }

  const decoded = await auth.verifyIdToken(idToken, true);

  // Generate a long-lived 14-day session cookie
  const sessionCookie = await createAdminSessionCookie(idToken, SESSION_COOKIE_DURATION_MS);

  const response = NextResponse.json({
    success: true,
    user: {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    },
    expiresIn: SESSION_COOKIE_DURATION_MS,
  });

  // Set secure, HTTP-only session cookie for 14 days
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionCookie,
    maxAge: Math.floor(SESSION_COOKIE_DURATION_MS / 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
});
