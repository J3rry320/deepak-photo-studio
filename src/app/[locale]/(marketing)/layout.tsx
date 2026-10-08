import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFAB } from '@/components/WhatsAppFAB';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* Global Marketing Navigation Header */}
      <Navbar />

      {/* Main Public Editorial Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Reusable Luxury WhatsApp Floating Action Button */}
      <WhatsAppFAB />

      {/* Global Marketing Footer */}
      <Footer />
    </div>
  );
}
