'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { portfolioConfig, PortfolioTab } from '@/config/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { MediaSlot } from '@/components/MediaSlot';

export function WorksGallerySection() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<PortfolioTab>('all');

  const filteredItems = portfolioConfig.items.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section
      id="portfolio"
      className="px-6 sm:px-10 lg:px-12 py-20 sm:py-28 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--color-border)]">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-highlight)] leading-tight">
              {t(portfolioConfig.sectionTitleKey)}
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {t(portfolioConfig.sectionLeadKey)}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border border-[var(--color-border)] p-1 bg-[var(--color-bg-secondary)] shrink-0">
            {(
              [
                { key: 'all', labelKey: 'works.filterAll' },
                { key: 'ceremony', labelKey: 'works.filterCeremony' },
                { key: 'portraits', labelKey: 'works.filterPortraits' },
                { key: 'cinema', labelKey: 'works.filterCinema' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 text-xs font-body uppercase tracking-[0.18em] transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[var(--color-accent)] text-[#ffffff] font-semibold'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-highlight)]'
                }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid with Reusable Media Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="p-6 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col justify-between space-y-5 hover:border-[var(--color-accent)] transition-colors"
            >
              <div className="space-y-4">
                {/* Media Slot with aspect ratio and descriptor */}
                <MediaSlot
                  src={item.imageSrc}
                  aspectRatio={item.aspectRatio}
                  label={item.location.toUpperCase()}
                  descriptor={item.mediaDescriptor}
                />

                {/* Content Block */}
                <div className="space-y-2 pt-1">
                  <h3 className="font-display text-2xl text-[var(--color-highlight)] leading-snug">
                    {t(item.titleKey)}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>

              {/* Meta footer */}
              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-faint)]">
                <span>{item.filmStock}</span>
                <span>{item.location}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Link to Inquire / View Packages */}
        <div className="pt-6 flex justify-end">
          <Link
            href="#investment"
            className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-[var(--color-accent)] hover:text-[var(--color-highlight)] transition-colors"
          >
            <span>{t('common.exploreArchive')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
