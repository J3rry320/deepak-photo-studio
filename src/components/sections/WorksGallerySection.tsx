'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { MediaSlot } from '@/components/MediaSlot';
import { Reveal } from '@/components/ui/Reveal';
import { LocalizedPortfolioItem } from '@/lib/portfolio';
import { landingMediaConfig, getFallbackPortfolioItems } from '@/config/landing-media';

interface WorksGallerySectionProps {
  items?: LocalizedPortfolioItem[];
}

export function WorksGallerySection({ items = [] }: WorksGallerySectionProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isOr = locale === 'or';
  const [activeTab, setActiveTab] = useState<string>('all');

  const activeItems =
    items && items.length > 0 ? items : getFallbackPortfolioItems(locale);

  const filteredItems = activeItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const filterTabs = [
    { key: 'all', labelKey: 'works.filterAll' },
    { key: 'mandap_rituals', labelKey: 'works.filterCeremony' },
    { key: 'candid_portraiture', labelKey: 'works.filterPortraits' },
    { key: 'cinematic_reels', labelKey: 'works.filterCinema' },
  ];

  const showCinemaShowcase = activeTab === 'all' || activeTab === 'cinematic_reels';
  const { featuredCinema, portraitReels } = landingMediaConfig.works;

  return (
    <section
      id="portfolio"
      className="px-6 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Section Header & Minimalist Filter Bar */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-[var(--color-border)]">
          <div className="space-y-2.5 max-w-2xl">
            <h2 className="font-display text-2xl sm:text-4xl text-[var(--color-highlight)] leading-tight">
              {t('works.title')}
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {t('works.lead')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1 border border-[var(--color-border)] p-1 bg-[var(--color-bg-secondary)] shrink-0 self-start lg:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 text-xs font-body uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-highlight)]'
                }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cinematic Landscape Feature Film + Dual 9:16 Portrait Reels Showcase */}
        {showCinemaShowcase && (
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            <div className="lg:col-span-8 flex flex-col">
              <MediaSlot
                type={featuredCinema.type}
                src={featuredCinema.src}
                poster={featuredCinema.poster}
                aspectRatio="16/9"
                alt={isOr ? featuredCinema.altOr : featuredCinema.altEn}
                className="h-full"
              />
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
              {portraitReels.map((reel) => (
                <MediaSlot
                  key={reel.id}
                  type={reel.type}
                  src={reel.src}
                  poster={reel.poster}
                  aspectRatio={reel.aspectRatio}
                  alt={isOr ? reel.altOr : reel.altEn}
                  className="h-full"
                />
              ))}
            </div>
          </Reveal>
        )}

        {/* Editorial Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const displayRatio = item.src
                ? item.aspectRatio
                : idx % 3 === 0
                  ? '16/9'
                  : '4/5';

              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group space-y-3"
                >
                  <MediaSlot
                    src={item.src}
                    aspectRatio={displayRatio}
                    alt={`${item.title} — ${item.location}`}
                  />

                  <div className="flex items-baseline justify-between gap-4 pt-1 border-b border-[var(--color-border)] pb-2.5">
                    <h3 className="font-display text-lg sm:text-xl text-[var(--color-highlight)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <span className="font-body text-xs text-[var(--color-text-faint)] shrink-0">
                      {item.location}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Editorial Archive Link */}
        <div className="pt-2 flex justify-end">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] text-xs font-body uppercase tracking-[0.2em] text-[var(--color-highlight)] hover:text-[var(--color-accent)] transition-all duration-300"
          >
            <span>{t('common.exploreArchive')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
