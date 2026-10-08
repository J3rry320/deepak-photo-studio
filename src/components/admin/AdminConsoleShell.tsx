'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signOutUser } from '@/lib/firebase/client';
import { Link } from '@/i18n/navigation';
import {
  LayoutDashboard,
  Calendar,
  Mail,
  Package,
  BookOpen,
  Image as ImageIcon,
  Star,
  ArrowLeft,
  LogOut,
} from 'lucide-react';
import { OverviewView } from './views/OverviewView';
import { BookingsView } from './views/BookingsView';
import { EnquiriesView } from './views/EnquiriesView';
import { PackagesView } from './views/PackagesView';
import { StoriesView } from './views/StoriesView';
import { PortfolioView } from './views/PortfolioView';
import { TestimonialsView } from './views/TestimonialsView';

type TabKey =
  | 'overview'
  | 'bookings'
  | 'enquiries'
  | 'packages'
  | 'stories'
  | 'portfolio'
  | 'testimonials';

export function AdminConsoleShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabKey) || 'overview';

  const handleTabChange = (tab: TabKey) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    router.push(url.pathname + url.search);
  };

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/admin/login');
    router.refresh();
  };

  const navItems: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'bookings', label: 'Requests', icon: Calendar },
    { key: 'enquiries', label: 'Enquiries', icon: Mail },
    { key: 'packages', label: 'Packages', icon: Package },
    { key: 'stories', label: 'Stories', icon: BookOpen },
    { key: 'portfolio', label: 'Portfolio', icon: ImageIcon },
    { key: 'testimonials', label: 'Reviews', icon: Star },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-body">
      {/* Studio Console Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
          {/* Brand Left */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-accent)] hover:text-[var(--color-highlight)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Return to Site</span>
            </Link>

            <div className="h-4 w-px bg-[var(--color-border)] hidden sm:block" />

            <span className="font-display text-base sm:text-lg tracking-wider text-[var(--color-highlight)] whitespace-nowrap">
              DEEPAK PHOTO FILMS{' '}
              <span className="text-[var(--color-accent)] text-[10px] sm:text-xs font-body tracking-widest uppercase ml-1 sm:ml-2">
                Console
              </span>
            </span>
          </div>

          {/* Right: Sign Out */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border)] hover:border-red-500 hover:text-red-600 text-xs text-[var(--color-text-muted)] uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-[var(--color-border)]/50 pt-1 -mb-px">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleTabChange(item.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all cursor-pointer border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-[var(--color-accent)] text-[var(--color-highlight)] font-semibold bg-[var(--color-bg-primary)]'
                    : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-highlight)]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--color-accent)]' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Tabbed Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 lg:p-10">
        {activeTab === 'overview' && (
          <OverviewView onSelectTab={(tab) => handleTabChange(tab as TabKey)} />
        )}
        {activeTab === 'bookings' && <BookingsView />}
        {activeTab === 'enquiries' && <EnquiriesView />}
        {activeTab === 'packages' && <PackagesView />}
        {activeTab === 'stories' && <StoriesView />}
        {activeTab === 'portfolio' && <PortfolioView />}
        {activeTab === 'testimonials' && <TestimonialsView />}
      </main>
    </div>
  );
}
