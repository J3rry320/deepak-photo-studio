import { NextRequest, NextResponse } from 'next/server';
import { withAuthApi } from '@/lib/api/guard';
import {
  SESSION_COOKIE_NAME,
  verifyAdminSessionCookie,
  revokeAdminUserSessions,
} from '@/lib/firebase/admin';

export const POST = withAuthApi(async (req: NextRequest) => {
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (sessionCookie) {
    try {
      const decoded = await verifyAdminSessionCookie(sessionCookie);
      await revokeAdminUserSessions(decoded.uid);
    } catch {
      // Ignore token verification errors during logout
    }
  }

  const response = NextResponse.json({
    success: true,
    message: 'Session successfully terminated.',
  });

  // Clear session cookie
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
});
