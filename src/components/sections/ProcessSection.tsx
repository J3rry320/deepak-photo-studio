import { getTranslations, getLocale } from 'next-intl/server';
import { MediaSlot } from '@/components/MediaSlot';
import { Reveal } from '@/components/ui/Reveal';
import { landingMediaConfig } from '@/config/landing-media';

export async function ProcessSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isOr = locale === 'or';

  const { cinematicBanner } = landingMediaConfig.process;

  const steps = [
    {
      num: t('process.step1Num'),
      title: t('process.step1Title'),
      desc: t('process.step1Desc'),
    },
    {
      num: t('process.step2Num'),
      title: t('process.step2Title'),
      desc: t('process.step2Desc'),
    },
    {
      num: t('process.step3Num'),
      title: t('process.step3Title'),
      desc: t('process.step3Desc'),
    },
    {
      num: t('process.step4Num'),
      title: t('process.step4Title'),
      desc: t('process.step4Desc'),
    },
  ];

  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <Reveal className="max-w-2xl space-y-2.5">
          <h2 className="font-display text-2xl sm:text-4xl text-[var(--color-highlight)] leading-tight">
            {t('process.title')}
          </h2>
          <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {t('process.lead')}
          </p>
        </Reveal>

        {/* Widescreen 21:9 Cinematic Experience Frame */}
        <Reveal delay={0.05}>
          <MediaSlot
            type={cinematicBanner.type}
            src={cinematicBanner.src}
            aspectRatio={cinematicBanner.aspectRatio}
            alt={isOr ? cinematicBanner.altOr : cinematicBanner.altEn}
            className="max-h-72"
          />
        </Reveal>

        {/* 4-Step Editorial Print Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-2">
          {steps.map((step, idx) => (
            <Reveal
              key={step.num}
              delay={idx * 0.08}
              className="space-y-3 border-t border-[var(--color-border)] pt-5"
            >
              <span className="font-display text-2xl sm:text-3xl text-[var(--color-accent)] block">
                {step.num}
              </span>
              <h3 className="font-display text-lg sm:text-xl text-[var(--color-highlight)] leading-snug">
                {step.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
