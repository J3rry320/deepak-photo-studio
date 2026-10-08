'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ratesConfig } from '@/config/rates';
import { LocalizedPackage } from '@/types/service';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { MediaSlot } from '@/components/MediaSlot';
import {
  BothSidesUnionIcon,
  GroomBaraatIcon,
  BrideRitualIcon,
  PreWeddingCoastIcon,
  CinemaRollIcon,
  AudioVowsIcon,
  ArchivalAlbumIcon,
  StudioTrioIcon,
  GalleryVaultIcon,
} from '@/components/WeddingIcons';

interface RatesPreviewSectionProps {
  packages?: LocalizedPackage[];
}

export function RatesPreviewSection({ packages = [] }: RatesPreviewSectionProps) {
  const t = useTranslations();

  // Pick the 4 signature wedding packages from database data
  const completePkg =
    packages.find((p) => p.slug === 'complete-both-sides-wedding') || packages[0];
  const groomPkg =
    packages.find((p) => p.slug === 'groom-side-wedding') || packages[1];
  const bridePkg =
    packages.find((p) => p.slug === 'bride-side-wedding') || packages[2];
  const preWedPkg =
    packages.find((p) => p.slug === 'pre-wedding-shoot') || packages[3];

  // Map each deliverable to its unique contextual icon
  const getDeliverableIcon = (feat: string, index: number) => {
    const lower = feat.toLowerCase();
    if (lower.includes('crew') || lower.includes('artist') || lower.includes('photographer')) {
      return <StudioTrioIcon className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />;
    }
    if (lower.includes('trailer') || lower.includes('cinema') || lower.includes('film') || lower.includes('video')) {
      return <CinemaRollIcon className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />;
    }
    if (lower.includes('album') || lower.includes('book') || lower.includes('print')) {
      return <ArchivalAlbumIcon className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />;
    }
    if (lower.includes('audio') || lower.includes('vow') || lower.includes('sound')) {
      return <AudioVowsIcon className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />;
    }
    if (index === 0) {
      return <StudioTrioIcon className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />;
    }
    return <GalleryVaultIcon className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />;
  };

  const renderPackageCard = (
    pkg: LocalizedPackage | undefined,
    IconComponent: React.ComponentType<{ className?: string }>
  ) => {
    if (!pkg) return null;

    const deliverables = (pkg.deliverables && pkg.deliverables.length > 0)
      ? pkg.deliverables
      : (pkg.features || []).slice(0, 5);

    return (
      <div
        key={pkg.slug}
        className={`lg:col-span-6 p-7 sm:p-9 border flex flex-col justify-between space-y-7 transition-all ${
          pkg.isPopular
            ? 'border-[var(--color-accent)] bg-[var(--color-bg-primary)] shadow-sm'
            : 'border-[var(--color-border)] bg-[var(--color-bg-primary)] hover:border-[var(--color-accent)]'
        }`}
      >
        <div className="space-y-6">
          {/* Header Row: Unique Icon + Popular Badge */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shadow-xs">
              <IconComponent className="w-5 h-5" />
            </div>

            {pkg.isPopular && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[var(--color-accent)]/30 bg-[var(--color-bg-secondary)] text-[11px] font-body uppercase tracking-wider text-[var(--color-accent)] font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Featured Collection</span>
              </span>
            )}
          </div>

          {/* Title & Short Summary */}
          <div className="space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-highlight)] leading-snug">
              {pkg.title}
            </h3>
            <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
              {pkg.tagline}
            </p>
          </div>

          {/* Price Bar */}
          <div className="py-3.5 border-y border-[var(--color-border)] flex items-baseline justify-between">
            <span className="text-[11px] font-body uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
              {t('rates.startingAt')}
            </span>
            <span className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)] font-medium">
              {pkg.formattedStartingPrice}
            </span>
          </div>

          {/* Media Slot */}
          <MediaSlot
            src={pkg.media?.src}
            aspectRatio={pkg.media?.aspectRatio || '16/9'}
            label={pkg.media?.label}
            descriptor={pkg.media?.descriptor}
          />

          {/* Curated Deliverables with UNIQUE CONTEXTUAL ICONS */}
          <div className="space-y-3 pt-1">
            <span className="block text-[11px] font-body uppercase tracking-wider text-[var(--color-text-faint)]">
              Package Inclusions:
            </span>
            <ul className="space-y-2.5">
              {deliverables.slice(0, 5).map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm font-body text-[var(--color-text-muted)] leading-snug"
                >
                  {getDeliverableIcon(feat, idx)}
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-3">
          <Link
            href={`/services/${pkg.slug}`}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-body font-semibold uppercase tracking-[0.18em] transition-colors ${
              pkg.isPopular
                ? 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#ffffff]'
                : 'border border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#ffffff] text-[var(--color-highlight)]'
            }`}
          >
            <span>{t('rates.viewTiers')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="#inquire"
            className="inline-flex items-center justify-center px-6 py-3.5 border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-muted)] hover:text-[var(--color-highlight)] text-xs font-body uppercase tracking-[0.18em] transition-colors bg-[var(--color-bg-secondary)]"
          >
            <span>{t('hero.ctaInquire')}</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section
      id="investment"
      className="px-6 sm:px-10 lg:px-12 py-20 sm:py-28 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/20"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-[var(--color-border)]">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-highlight)] leading-tight">
              {t(ratesConfig.sectionTitleKey)}
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {t(ratesConfig.sectionLeadKey)}
            </p>
          </div>

          {/* Cuttack Base Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-xs font-body text-[var(--color-text-muted)] shadow-xs shrink-0">
            <MapPin className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
            <span className="font-medium">{t('rates.cuttackTeamNotice')}</span>
          </div>
        </div>

        {/* Dynamic Bento Grid Fed Directly from Database Model */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Row 1: Complete Both Sides Wedding & Groom Side */}
          {renderPackageCard(completePkg, BothSidesUnionIcon)}
          {renderPackageCard(groomPkg, GroomBaraatIcon)}

          {/* Row 2: Bride Side & Pre-Wedding */}
          {renderPackageCard(bridePkg, BrideRitualIcon)}
          {renderPackageCard(preWedPkg, PreWeddingCoastIcon)}

          {/* Row 3: Studio Base & Physical Album Delivery Guarantee Tiles */}
          <div className="lg:col-span-6 p-7 sm:p-8 border border-[var(--color-border)] bg-[var(--color-bg-primary)] flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shadow-xs">
                <StudioTrioIcon className="w-5 h-5" />
              </div>
              <h4 className="font-display text-2xl text-[var(--color-highlight)]">
                {t('rates.cuttackTileTitle')}
              </h4>
              <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {t('rates.cuttackTileDesc')}
              </p>
            </div>
            <div className="pt-4 border-t border-[var(--color-border)] text-[11px] font-body tracking-wider uppercase text-[var(--color-text-faint)]">
              Direct Cuttack Team • Transparent Travel & Stay
            </div>
          </div>

          <div className="lg:col-span-6 p-7 sm:p-8 border border-[var(--color-border)] bg-[var(--color-bg-primary)] flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shadow-xs">
                <ArchivalAlbumIcon className="w-5 h-5" />
              </div>
              <h4 className="font-display text-2xl text-[var(--color-highlight)]">
                {t('rates.albumTileTitle')}
              </h4>
              <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {t('rates.albumTileDesc')}
              </p>
            </div>
            <div className="pt-4 border-t border-[var(--color-border)] text-[11px] font-body tracking-wider uppercase text-[var(--color-text-faint)]">
              250 GSM Fuji Paper • Handcrafted Wooden Vault Box
            </div>
          </div>
        </div>

        {/* Footer Notice & Full Customizer Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[var(--color-border)] text-xs font-body">
          <p className="text-[var(--color-text-muted)] max-w-xl text-center sm:text-left leading-relaxed">
            {t(ratesConfig.customQuoteNoticeKey)}
          </p>

          <Link
            href="/services/complete-both-sides-wedding"
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
