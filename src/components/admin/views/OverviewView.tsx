'use client';

import React, { useState, useEffect } from 'react';
import { adminClient } from '@/lib/api/admin-client';
import {
  Calendar,
  Mail,
  Package,
  BookOpen,
  Image as ImageIcon,
  Star,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

interface OverviewViewProps {
  onSelectTab: (tab: string) => void;
}

export function OverviewView({ onSelectTab }: OverviewViewProps) {
  const [stats, setStats] = useState<{
    bookings: { pending: number; total: number };
    enquiries: { unread: number; total: number };
    packages: { active: number };
    stories: { published: number; total: number };
    portfolio: { total: number };
    testimonials: { total: number };
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    adminClient.stats.get().then((res) => {
      if (active) {
        if (res.success && res.stats) {
          setStats(res.stats as unknown as typeof stats);
        }
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const statCards = [
    {
      title: 'Booking Requests',
      value: stats ? `${stats.bookings.pending} Pending` : '—',
      sub: stats ? `${stats.bookings.total} Total Reservations` : '—',
      icon: Calendar,
      tab: 'bookings',
      badge: stats?.bookings.pending ? `${stats.bookings.pending} New` : undefined,
    },
    {
      title: 'General Enquiries',
      value: stats ? `${stats.enquiries.unread} Unread` : '—',
      sub: stats ? `${stats.enquiries.total} Total Inquiries` : '—',
      icon: Mail,
      tab: 'enquiries',
      badge: stats?.enquiries.unread ? `${stats.enquiries.unread} New` : undefined,
    },
    {
      title: 'Active Packages',
      value: stats ? `${stats.packages.active} Collections` : '—',
      sub: 'Configured Wedding Rates',
      icon: Package,
      tab: 'packages',
    },
    {
      title: 'Stories & Journal',
      value: stats ? `${stats.stories.published} Published` : '—',
      sub: stats ? `${stats.stories.total} Total Features` : '—',
      icon: BookOpen,
      tab: 'stories',
    },
    {
      title: 'Portfolio Plates',
      value: stats ? `${stats.portfolio.total} Stills & Reels` : '—',
      sub: '35mm Film & Cinema Media',
      icon: ImageIcon,
      tab: 'portfolio',
    },
    {
      title: 'Couple Reviews',
      value: stats ? `${stats.testimonials.total} Testimonials` : '—',
      sub: 'Verified Reviews & Quotes',
      icon: Star,
      tab: 'testimonials',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Overview Masthead */}
      <div className="space-y-2 pb-6 border-b border-[var(--color-border)]">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)]">
          Studio Administration Overview
        </h1>
        <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Real-time snapshot of wedding date reservations, client messages, photography packages, and editorial journal stories.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onSelectTab(card.tab)}
              className="p-6 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col justify-between space-y-5 hover:border-[var(--color-accent)] transition-all cursor-pointer group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold">
                  {card.title}
                </span>
                <div className="flex items-center gap-2">
                  {card.badge && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[9px] font-semibold uppercase tracking-wider">
                      {card.badge}
                    </span>
                  )}
                  <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                </div>
              </div>

              <div>
                {loading ? (
                  <Skeleton className="h-8 w-24 my-1" />
                ) : (
                  <p className="font-display text-2xl sm:text-3xl text-[var(--color-highlight)]">
                    {card.value}
                  </p>
                )}
                <p className="text-xs text-[var(--color-text-muted)] mt-1 font-body">
                  {card.sub}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-body text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] transition-colors">
                <span>Manage {card.title}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture & Live Model Status */}
      <div className="p-6 sm:p-8 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Full Multi-Model CRUD Architecture Active</span>
        </div>
        <p className="text-xs font-body text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
          All 6 Mongoose models are connected to secured API endpoints with Redis cache invalidation, rate limiting, and CSRF protection. Select any tab in the console header to create, inspect, edit, or delete records.
        </p>
      </div>
    </div>
  );
}
