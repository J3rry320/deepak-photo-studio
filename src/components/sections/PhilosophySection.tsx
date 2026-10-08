import { getTranslations } from 'next-intl/server';

export async function PhilosophySection() {
  const t = await getTranslations();

  return (
    <section id="philosophy" className="px-6 sm:px-10 lg:px-12 py-20 sm:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Main Philosophy Header & Pull Quote */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-highlight)] leading-tight">
              {t('philosophy.title')}
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {t('philosophy.lead')}
            </p>
          </div>

          <div className="md:col-span-7 border-l border-[var(--color-border)] pl-6 sm:pl-10 space-y-4">
            <blockquote className="font-display text-2xl sm:text-3xl text-[var(--color-accent)] leading-relaxed">
              {t('philosophy.quote')}
            </blockquote>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
              {t('philosophy.author')}
            </p>
          </div>
        </div>

        {/* 3 Pillars of Craft - Hairline Frame Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[var(--color-border)]">
          <div className="space-y-3">
            <h3 className="font-display text-xl text-[var(--color-highlight)]">
              {t('philosophy.pillar1Title')}
            </h3>
            <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t('philosophy.pillar1Desc')}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-xl text-[var(--color-highlight)]">
              {t('philosophy.pillar2Title')}
            </h3>
            <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t('philosophy.pillar2Desc')}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-xl text-[var(--color-highlight)]">
              {t('philosophy.pillar3Title')}
            </h3>
            <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t('philosophy.pillar3Desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
