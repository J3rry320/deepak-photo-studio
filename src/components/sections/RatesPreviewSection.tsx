'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { LocalizedPackage } from '@/types/service';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { MediaSlot } from '@/components/MediaSlot';
import { Reveal } from '@/components/ui/Reveal';
import { landingMediaConfig, getFallbackPackages } from '@/config/landing-media';

interface RatesPreviewSectionProps {
  packages?: LocalizedPackage[];
}

export function RatesPreviewSection({ packages = [] }: RatesPreviewSectionProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isOr = locale === 'or';

  const activePackages =
    packages && packages.length > 0 ? packages : getFallbackPackages(locale);

  const completePkg =
    activePackages.find((p) => p.slug === 'complete-both-sides-wedding') ||
    activePackages[0];
  const groomPkg =
    activePackages.find((p) => p.slug === 'groom-side-wedding') ||
    activePackages[1];
  const bridePkg =
    activePackages.find((p) => p.slug === 'bride-side-wedding') ||
    activePackages[2];
  const preWedPkg =
    activePackages.find((p) => p.slug === 'pre-wedding-shoot') ||
    activePackages[3];

  const orderedPackages = [completePkg, groomPkg, bridePkg, preWedPkg].filter(
    (p): p is LocalizedPackage => Boolean(p)
  );

  const { packageMedia, albumShowcase } = landingMediaConfig.rates;

  return (
    <section
      id="investment"
      className="px-6 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/20"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <Reveal className="pb-6 border-b border-[var(--color-border)]">
          <div className="max-w-3xl space-y-2.5">
            <h2 className="font-display text-2xl sm:text-4xl text-[var(--color-highlight)] leading-tight">
              {t('rates.title')}
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {t('rates.lead')}
            </p>
          </div>
        </Reveal>

        {/* 4 Signature Collections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {orderedPackages.map((pkg, idx) => {
            const configSlot = packageMedia[pkg.slug];
            const mediaSrc =
              (configSlot && configSlot.src) || pkg.media?.src || '';
            const mediaType = configSlot?.type || 'image';
            const mediaRatio = configSlot?.aspectRatio || '16/9';
            const mediaAlt = configSlot
              ? isOr
                ? configSlot.altOr
                : configSlot.altEn
              : pkg.title;

            const deliverables =
              pkg.deliverables && pkg.deliverables.length > 0
                ? pkg.deliverables
                : (pkg.features || []).slice(0, 4);

            return (
              <Reveal
                key={pkg.slug}
                delay={(idx % 2) * 0.08}
                className={`lg:col-span-6 p-5 sm:p-6 lg:p-7 border flex flex-col justify-between space-y-6 transition-colors duration-300 ${
                  pkg.isPopular
                    ? 'border-[var(--color-accent)] bg-[var(--color-bg-primary)] shadow-xs'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-primary)] hover:border-[var(--color-accent)]'
                }`}
              >
                <div className="space-y-5">
                  {/* Sleek Editorial Media Frame */}
                  <MediaSlot
                    type={mediaType}
                    src={mediaSrc}
                    aspectRatio={mediaRatio}
                    alt={mediaAlt}
                    className="max-h-48"
                  />

                  {/* Title, Tagline & Price Row */}
                  <div className="space-y-3 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3.5 border-b border-[var(--color-border)]">
                      <h3 className="font-display text-xl sm:text-2xl text-[var(--color-highlight)] leading-snug">
                        {pkg.title}
                      </h3>
                      <div className="flex items-baseline gap-2 shrink-0">
                        <span className="text-[10px] font-body uppercase tracking-[0.16em] text-[var(--color-text-muted)] font-medium">
                          {t('rates.startingAt')}
                        </span>
                        <span className="font-display text-xl sm:text-2xl text-[var(--color-accent)] font-medium">
                          {pkg.formattedStartingPrice}
                        </span>
                      </div>
                    </div>

                    <p className="font-body text-xs sm:text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Clean Deliverable Points */}
                  <ul className="space-y-2 pt-1">
                    {deliverables.slice(0, 4).map((feat, featIdx) => (
                      <li
                        key={featIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] font-body text-[var(--color-text-primary)] leading-relaxed"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-1.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Links */}
                <div className="pt-5 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/services/${pkg.slug}`}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-body font-semibold uppercase tracking-[0.16em] transition-colors ${
                      pkg.isPopular
                        ? 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-bg-primary)]'
                        : 'border border-[var(--color-accent)] hover:bg-[var(--color-accent)] text-[var(--color-highlight)] hover:text-[var(--color-bg-primary)]'
                    }`}
                  >
                    <span>{t('rates.viewTiers')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="#inquire"
                    className="inline-flex items-center justify-center px-5 py-3 border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-muted)] hover:text-[var(--color-highlight)] text-xs font-body uppercase tracking-[0.16em] transition-colors bg-[var(--color-bg-secondary)]"
                  >
                    <span>{t('hero.ctaInquire')}</span>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Heirloom Album & Pan-Odisha Coverage Editorial Spread */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center p-6 sm:p-8 border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
          <div className="lg:col-span-7">
            <MediaSlot
              type={albumShowcase.type}
              src={albumShowcase.src}
              aspectRatio={albumShowcase.aspectRatio}
              alt={isOr ? albumShowcase.altOr : albumShowcase.altEn}
            />
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2.5">
              <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-highlight)] leading-snug">
                {t('rates.albumTileTitle')}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {t('rates.albumTileDesc')}
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)] space-y-2.5">
              <h3 className="font-display text-xl sm:text-2xl text-[var(--color-highlight)] leading-snug">
                {t('rates.cuttackTileTitle')}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {t('rates.cuttackTileDesc')}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Bottom Custom Quote Notice & Full Services Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[var(--color-border)] text-xs font-body">
          <p className="text-[var(--color-text-muted)] max-w-2xl text-center sm:text-left leading-relaxed">
            {t('rates.customQuoteNotice')}
          </p>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 uppercase tracking-[0.18em] text-[var(--color-accent)] hover:text-[var(--color-highlight)] font-semibold transition-colors whitespace-nowrap"
          >
            <span>{t('rates.viewPackagesCta')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
