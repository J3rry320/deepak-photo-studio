import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, Auth, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'deepak-photo-films.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'deepak-photo-films',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'deepak-photo-films.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '0000000000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:0000000000:web:0000000000',
};

function getClientApp(): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export function getClientAuth(): Auth {
  return getAuth(getClientApp());
}

export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Signs in user with Google popup, exchanges ID token for a 14-day server session cookie
 */
export async function signInWithGoogle(): Promise<{ user: User; success: boolean }> {
  const auth = getClientAuth();
  const credential = await signInWithPopup(auth, googleAuthProvider);
  const idToken = await credential.user.getIdToken(true);

  // Exchange ID token for a long-lived HTTP-only session cookie
  const res = await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to establish admin session.');
  }

  return { user: credential.user, success: true };
}

/**
 * Signs out client and destroys server session cookie
 */
export async function signOutUser(): Promise<void> {
  const auth = getClientAuth();
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (e) {
    console.warn('[AuthClient] Logout request failed:', e);
  }
  await signOut(auth);
}
