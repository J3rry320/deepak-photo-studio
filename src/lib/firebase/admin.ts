import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth, DecodedIdToken } from 'firebase-admin/auth';

let adminApp: App | null = null;
let adminAuthInstance: Auth | null = null;

function getAdminApp(): App | null {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Check for service account JSON or environment variables
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (serviceAccountJson) {
    try {
      const parsed = JSON.parse(serviceAccountJson);
      adminApp = initializeApp({ credential: cert(parsed) });
      return adminApp;
    } catch (e) {
      console.warn('[FirebaseAdmin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', e);
    }
  }

  if (projectId && clientEmail && privateKey) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      return adminApp;
    } catch (e) {
      console.warn('[FirebaseAdmin] Failed to initialize with cert credentials:', e);
    }
  }

  if (projectId) {
    try {
      adminApp = initializeApp({ projectId });
      return adminApp;
    } catch (e) {
      console.warn('[FirebaseAdmin] Failed to initialize with projectId:', e);
    }
  }

  return null;
}

export function getAdminAuth(): Auth | null {
  if (adminAuthInstance) return adminAuthInstance;
  const app = getAdminApp();
  if (!app) return null;
  adminAuthInstance = getAuth(app);
  return adminAuthInstance;
}

// 14 days session duration (maximum allowed by Firebase)
export const SESSION_COOKIE_DURATION_MS = 14 * 24 * 60 * 60 * 1000;
export const SESSION_COOKIE_NAME = 'deepak_admin_session';

/**
 * Creates a server-verified session cookie with 14-day validity from client ID token
 */
export async function createAdminSessionCookie(
  idToken: string,
  expiresInMs: number = SESSION_COOKIE_DURATION_MS
): Promise<string> {
  const auth = getAdminAuth();
  if (!auth) {
    throw new Error('Firebase Admin SDK is not initialized. Please configure credentials.');
  }
  return await auth.createSessionCookie(idToken, { expiresIn: expiresInMs });
}

/**
 * Verifies the session cookie on admin requests, checking for revocation
 */
export async function verifyAdminSessionCookie(
  sessionCookie: string
): Promise<DecodedIdToken> {
  const auth = getAdminAuth();
  if (!auth) {
    throw new Error('Firebase Admin SDK is not initialized. Please configure credentials.');
  }
  // checkRevoked = true guarantees revoked sessions or deleted users are denied immediately
  return await auth.verifySessionCookie(sessionCookie, true);
}

/**
 * Revokes all refresh tokens and active sessions for a user UID
 */
export async function revokeAdminUserSessions(uid: string): Promise<void> {
  const auth = getAdminAuth();
  if (!auth) return;
  await auth.revokeRefreshTokens(uid);
}
