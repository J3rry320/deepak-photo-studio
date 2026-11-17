import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { HeroMasonry } from './HeroMasonry';

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="relative px-6 sm:px-10 lg:px-12 py-8 sm:py-12 lg:py-14 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          {/* Left Column: Headlines, Editorial Deck & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Main Editorial Headlines */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-normal tracking-tight text-[var(--color-highlight)] leading-[1.08]">
                {t('hero.titleLine1')}
              </h1>
              <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-normal tracking-tight text-[var(--color-accent)] leading-[1.08]">
                {t('hero.titleLine2')}
              </h2>
            </div>

            {/* Editorial Lead Paragraph */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[var(--color-text-muted)] font-body leading-relaxed max-w-xl">
              {t('hero.lead')}
            </p>

            {/* Action Buttons Directly Below Text */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
              <Link
                href="#investment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-bg-primary)] text-xs font-body font-semibold uppercase tracking-[0.18em] transition-all duration-300 border border-[var(--color-accent)] hover:border-[var(--color-accent-hover)] shadow-xs hover:shadow-sm"
              >
                <span>{t('hero.ctaExplore')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="#inquire"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-highlight)] hover:text-[var(--color-accent)] text-xs font-body uppercase tracking-[0.18em] transition-all duration-300 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)]"
              >
                {t('hero.ctaInquire')}
              </Link>
            </div>
          </div>

          {/* Right Column: Staggered Editorial Masonry Showcase */}
          <div className="lg:col-span-5 w-full">
            <HeroMasonry />
          </div>
        </div>
      </div>
    </section>
  );
}
