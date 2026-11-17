import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFAB } from '@/components/WhatsAppFAB';
import { SmoothScrollProvider } from '@/components/SmoothScroll';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        {/* Global Marketing Navigation Header wrapped in Suspense for usePathname */}
        <Suspense fallback={<div className="h-20 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]" />}>
          <Navbar />
        </Suspense>

        {/* Main Public Editorial Content */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Reusable Luxury WhatsApp Floating Action Button */}
        <Suspense fallback={null}>
          <WhatsAppFAB />
        </Suspense>

        {/* Global Marketing Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
