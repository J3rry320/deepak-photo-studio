import { getTranslations } from 'next-intl/server';
import { testimonialsConfig } from '@/config/testimonials';

export async function TestimonialsSection() {
  const t = await getTranslations();

  return (
    <section className="px-6 sm:px-10 lg:px-12 py-20 sm:py-28 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="max-w-xl space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-highlight)] leading-tight">
            {t(testimonialsConfig.sectionTitleKey)}
          </h2>
          <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {t(testimonialsConfig.sectionLeadKey)}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14">
          {testimonialsConfig.items.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 border border-[var(--color-border)] bg-[var(--color-bg-primary)] flex flex-col justify-between space-y-8"
            >
              <blockquote className="font-display text-xl sm:text-2xl text-[var(--color-highlight)] leading-relaxed">
                {t(item.quoteKey)}
              </blockquote>

              <div className="pt-6 border-t border-[var(--color-border)] space-y-1">
                <p className="font-display text-lg text-[var(--color-accent)]">
                  {t(item.coupleKey)}
                </p>
                <p className="font-body text-xs uppercase tracking-wider text-[var(--color-text-faint)]">
                  {t(item.locationKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
