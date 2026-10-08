import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="relative px-6 sm:px-10 lg:px-12 pt-20 sm:pt-28 md:pt-36 pb-16 sm:pb-24 border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Editorial Headlines - No Eyebrows */}
        <div className="space-y-3 sm:space-y-4 mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal tracking-tight text-[var(--color-highlight)] leading-[1.04]">
            {t('hero.titleLine1')}
          </h1>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal tracking-tight text-[var(--color-accent)] leading-[1.04]">
            {t('hero.titleLine2')}
          </h2>
        </div>

        {/* Deck Copy & Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 border-t border-[var(--color-border)]">
          <p className="md:col-span-8 text-base sm:text-lg text-[var(--color-text-muted)] font-body leading-relaxed max-w-2xl">
            {t('hero.lead')}
          </p>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3.5 w-full">
            <Link
              href="#investment"
              className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#ffffff] text-xs font-body font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              <span>{t('hero.ctaExplore')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="#inquire"
              className="w-full inline-flex items-center justify-center px-7 py-3.5 border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-highlight)] text-xs font-body uppercase tracking-[0.2em] transition-colors bg-[var(--color-bg-secondary)]"
            >
              {t('hero.ctaInquire')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
