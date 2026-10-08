import { getTranslations } from 'next-intl/server';

export async function ProcessSection() {
  const t = await getTranslations();

  const steps = [
    { num: t('process.step1Num'), title: t('process.step1Title'), desc: t('process.step1Desc') },
    { num: t('process.step2Num'), title: t('process.step2Title'), desc: t('process.step2Desc') },
    { num: t('process.step3Num'), title: t('process.step3Title'), desc: t('process.step3Desc') },
    { num: t('process.step4Num'), title: t('process.step4Title'), desc: t('process.step4Desc') },
  ];

  return (
    <section className="px-6 sm:px-10 lg:px-12 py-20 sm:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="max-w-xl space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-highlight)] leading-tight">
            {t('process.title')}
          </h2>
          <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {t('process.lead')}
          </p>
        </div>

        {/* 4-Step Print Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {steps.map((step) => (
            <div key={step.num} className="space-y-4 border-t border-[var(--color-border)] pt-6">
              <span className="font-display text-2xl sm:text-3xl text-[var(--color-accent)] block">
                {step.num}
              </span>
              <h3 className="font-display text-xl text-[var(--color-highlight)]">
                {step.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
