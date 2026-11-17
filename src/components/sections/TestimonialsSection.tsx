import { getTranslations, getLocale } from 'next-intl/server';
import { getFeaturedTestimonials } from '@/lib/testimonials';
import { MediaSlot } from '@/components/MediaSlot';
import { Reveal } from '@/components/ui/Reveal';
import {
  landingMediaConfig,
  getFallbackTestimonials,
} from '@/config/landing-media';

export async function TestimonialsSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isOr = locale === 'or';

  const dbTestimonials = await getFeaturedTestimonials(locale);
  const testimonials =
    dbTestimonials && dbTestimonials.length > 0
      ? dbTestimonials
      : getFallbackTestimonials(locale);

  const { portraits } = landingMediaConfig.testimonials;

  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/20">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        <Reveal className="max-w-2xl space-y-2.5">
          <h2 className="font-display text-2xl sm:text-4xl text-[var(--color-highlight)] leading-tight">
            {t('testimonials.title')}
          </h2>
          <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {t('testimonials.lead')}
          </p>
        </Reveal>

        {/* Editorial Testimonials Grid Paired with Couple Portrait Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.slice(0, 3).map((item, idx) => {
            const portraitSlot = portraits[idx % portraits.length];

            return (
              <Reveal
                key={item.id}
                delay={idx * 0.08}
                className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] flex flex-col justify-between p-5 sm:p-6 space-y-5 transition-colors duration-300 hover:border-[var(--color-accent)] shadow-2xs"
              >
                <div className="space-y-4">
                  <MediaSlot
                    type={portraitSlot.type}
                    src={portraitSlot.src}
                    aspectRatio="4/3"
                    alt={`${item.coupleNames} — ${isOr ? portraitSlot.altOr : portraitSlot.altEn}`}
                    className="max-h-44"
                  />

                  <blockquote className="font-display text-base sm:text-lg text-[var(--color-highlight)] leading-relaxed">
                    “{item.quote}”
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-baseline justify-between gap-3">
                  <p className="font-display text-base sm:text-lg text-[var(--color-accent)]">
                    {item.coupleNames}
                  </p>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--color-text-faint)] shrink-0">
                    {item.weddingLocation} • {item.weddingYear}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
