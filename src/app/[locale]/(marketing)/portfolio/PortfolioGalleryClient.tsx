'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LocalizedPortfolioItem } from '@/lib/portfolio';
import { MediaSlot } from '@/components/MediaSlot';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioGalleryClientProps {
  items: LocalizedPortfolioItem[];
}

export function PortfolioGalleryClient({ items }: PortfolioGalleryClientProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { key: 'all', labelKey: 'portfolioPage.filterAll' },
    { key: 'mandap_rituals', labelKey: 'portfolioPage.filterCeremony' },
    { key: 'candid_portraiture', labelKey: 'portfolioPage.filterPortraits' },
    { key: 'twilight_celebration', labelKey: 'portfolioPage.filterCelebration' },
    { key: 'cinematic_reels', labelKey: 'portfolioPage.filterCinema' },
    { key: 'analog_stills', labelKey: 'portfolioPage.filterAnalog' },
  ];

  const filteredItems = items.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <>
      {/* Editorial Masthead */}
      <header className="px-6 sm:px-10 lg:px-12 pt-20 sm:pt-28 pb-16 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
        <div className="max-w-5xl mx-auto space-y-6 text-center sm:text-left">
          <span className="text-[11px] font-body uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
            Visual Archive
          </span>

          <h1 className="font-display text-4xl sm:text-6xl text-[var(--color-highlight)] leading-tight">
            {t('portfolioPage.title')}
          </h1>

          <p className="font-body text-base sm:text-lg text-[var(--color-text-muted)] max-w-3xl leading-relaxed">
            {t('portfolioPage.lead')}
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center gap-2 border-t border-[var(--color-border)]/50">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-4 py-2 text-xs font-body uppercase tracking-[0.16em] transition-colors cursor-pointer border ${
                  activeTab === cat.key
                    ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-[#ffffff] font-semibold'
                    : 'bg-[var(--color-bg-primary)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-highlight)]'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid Display */}
      <main className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="py-24 text-center border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8">
              <p className="font-body text-sm text-[var(--color-text-muted)]">
                {t('portfolioPage.empty')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="p-6 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col justify-between space-y-5 hover:border-[var(--color-accent)] transition-colors"
                >
                  <div className="space-y-4">
                    <MediaSlot
                      src={item.src}
                      aspectRatio={item.aspectRatio}
                      label={item.location.toUpperCase()}
                      descriptor={item.descriptor}
                    />

                    <div className="space-y-1.5 pt-1">
                      <h2 className="font-display text-xl text-[var(--color-highlight)] leading-snug">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-faint)]">
                    <span>{item.filmStock}</span>
                    <span>{item.location}</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom Inquire Banner */}
          <div className="mt-20 p-8 sm:p-12 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-display text-2xl text-[var(--color-highlight)]">
                Planning Your Wedding Celebration in Odisha?
              </h3>
              <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)]">
                Our 3-artist Cuttack crew travels across all 30 districts of Odisha.
              </p>
            </div>

            <Link
              href="/#inquire"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#ffffff] text-xs font-body font-semibold uppercase tracking-[0.2em] transition-colors shrink-0"
            >
              <span>{t('hero.ctaInquire')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
