import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllServices } from '@/lib/services';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, Check, MapPin, Sparkles } from 'lucide-react';
import { MediaSlot } from '@/components/MediaSlot';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('servicesPage.title')} | Deepak Photo Films`,
    description: t('servicesPage.lead'),
    openGraph: {
      title: `${t('servicesPage.title')} | Deepak Photo Films`,
      description: t('servicesPage.lead'),
    },
  };
}

export default async function ServicesIndexPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const services = await getAllServices(locale);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* Editorial Header */}
      <header className="px-6 sm:px-10 lg:px-12 pt-20 sm:pt-28 pb-16 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
        <div className="max-w-5xl mx-auto space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-xs font-body text-[var(--color-text-muted)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span>{t('servicesPage.cuttackNotice')}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl text-[var(--color-highlight)] leading-tight">
            {t('servicesPage.title')}
          </h1>

          <p className="font-body text-base sm:text-lg text-[var(--color-text-muted)] max-w-3xl leading-relaxed">
            {t('servicesPage.lead')}
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="px-6 sm:px-10 lg:px-12 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {services.map((pkg) => (
            <article
              key={pkg.slug}
              className={`p-8 sm:p-10 border flex flex-col justify-between space-y-8 bg-[var(--color-bg-secondary)] transition-all ${
                pkg.isPopular
                  ? 'border-[var(--color-accent)] shadow-md'
                  : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'
              }`}
            >
              <div className="space-y-6">
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-body uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                    {pkg.category}
                  </span>

                  {pkg.isPopular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 border border-[var(--color-accent)] bg-[var(--color-bg-primary)] text-[10px] font-body uppercase tracking-wider text-[var(--color-accent)] font-semibold">
                      <Sparkles className="w-3 h-3" />
                      <span>Signature Collection</span>
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <div className="space-y-2">
                  <h2 className="font-display text-3xl text-[var(--color-highlight)] leading-snug">
                    {pkg.title}
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Pricing Banner */}
                <div className="py-4 border-y border-[var(--color-border)] flex items-baseline justify-between">
                  <span className="text-[11px] font-body uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                    {t('rates.startingAt')}
                  </span>
                  <span className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)] font-medium">
                    {pkg.formattedStartingPrice}
                  </span>
                </div>

                {/* Media Preview Slot */}
                <MediaSlot
                  src={pkg.media?.src}
                  aspectRatio={pkg.media?.aspectRatio || '16/9'}
                  label={pkg.media?.label}
                  descriptor={pkg.media?.descriptor}
                />

                {/* Key Deliverables */}
                <div className="space-y-3 pt-2">
                  <span className="block text-[11px] font-body uppercase tracking-wider text-[var(--color-text-faint)]">
                    Package Inclusions:
                  </span>
                  <ul className="space-y-2.5">
                    {(pkg.deliverables && pkg.deliverables.length > 0
                      ? pkg.deliverables
                      : pkg.features
                    )
                      .slice(0, 4)
                      .map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs font-body text-[var(--color-text-muted)] leading-snug"
                        >
                          <Check className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-[var(--color-border)]">
                <Link
                  href={`/services/${pkg.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#ffffff] text-xs font-body font-semibold uppercase tracking-[0.2em] transition-colors"
                >
                  <span>{t('servicesPage.exploreTiers')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
