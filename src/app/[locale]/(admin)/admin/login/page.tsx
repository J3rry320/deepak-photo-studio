'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithGoogle } from '@/lib/firebase/client';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Skeleton } from '@/components/ui/Skeleton';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/admin';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
      router.push(nextUrl);
      router.refresh();
    } catch (err) {
      console.error('[AdminLogin] Sign-in error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Authentication failed. Please verify credentials or admin email whitelist.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 sm:p-10 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] space-y-8 shadow-sm">
      {/* Studio Branding */}
      <div className="space-y-3 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] mx-auto flex items-center justify-center text-[var(--color-accent)] shadow-xs">
          <Lock className="w-5 h-5" />
        </div>

        <h1 className="font-display text-2xl sm:text-3xl text-[var(--color-highlight)]">
          Studio Console Access
        </h1>
        <p className="font-body text-xs text-[var(--color-text-muted)] leading-relaxed">
          Restricted administrative portal for Deepak Photo Films photographers & coordinators.
        </p>
      </div>

      {/* Error Feedback */}
      {error && (
        <div className="p-3.5 bg-[var(--color-bg-primary)] border border-red-500/40 text-red-600 text-xs font-body leading-relaxed">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="space-y-4">
        <Button
          size="lg"
          variant="primary"
          className="w-full"
          isLoading={loading}
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </Button>

        <div className="pt-2 flex items-center justify-between text-xs font-body text-[var(--color-text-faint)]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Site</span>
          </Link>

          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span>14-Day Session</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6">
      <Suspense fallback={<Skeleton className="w-full max-w-md h-80" />}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
