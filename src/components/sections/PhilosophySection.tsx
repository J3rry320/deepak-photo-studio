import { getTranslations, getLocale } from 'next-intl/server';
import { MediaSlot } from '@/components/MediaSlot';
import { Reveal } from '@/components/ui/Reveal';
import { landingMediaConfig } from '@/config/landing-media';

export async function PhilosophySection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isOr = locale === 'or';

  const { leadPortraitVideo, secondaryLandscape, pillars } =
    landingMediaConfig.philosophy;

  const pillarItems = [
    {
      title: t('philosophy.pillar1Title'),
      desc: t('philosophy.pillar1Desc'),
      media: pillars[0],
    },
    {
      title: t('philosophy.pillar2Title'),
      desc: t('philosophy.pillar2Desc'),
      media: pillars[1],
    },
    {
      title: t('philosophy.pillar3Title'),
      desc: t('philosophy.pillar3Desc'),
      media: pillars[2],
    },
  ];

  return (
    <section
      id="about"
      className="relative px-6 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30"
    >
      <span id="philosophy" className="sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Top Row: Editorial Manifesto & Asymmetric Dual-Media Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative & Founder Quote */}
          <Reveal className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h2 className="font-display text-2xl sm:text-4xl text-[var(--color-highlight)] leading-tight">
                {t('philosophy.title')}
              </h2>
              <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-xl">
                {t('philosophy.lead')}
              </p>
            </div>

            <div className="border-l-2 border-[var(--color-accent)] pl-5 sm:pl-6 py-1 space-y-2.5">
              <blockquote className="font-display text-lg sm:text-xl lg:text-2xl text-[var(--color-highlight)] leading-relaxed">
                {t('philosophy.quote')}
              </blockquote>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {t('philosophy.author')}
              </p>
            </div>
          </Reveal>

          {/* Right Column: Portrait Video + Staggered Landscape Frame */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-start">
              <div className="col-span-5">
                <MediaSlot
                  type={leadPortraitVideo.type}
                  src={leadPortraitVideo.src}
                  poster={leadPortraitVideo.poster}
                  aspectRatio="3/4"
                  alt={isOr ? leadPortraitVideo.altOr : leadPortraitVideo.altEn}
                />
              </div>
              <div className="col-span-7 pt-4 sm:pt-8">
                <MediaSlot
                  type={secondaryLandscape.type}
                  src={secondaryLandscape.src}
                  aspectRatio="16/10"
                  alt={isOr ? secondaryLandscape.altOr : secondaryLandscape.altEn}
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom Row: 3 Pillars of Studio Craft in Uniform Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-10 border-t border-[var(--color-border)] items-stretch">
          {pillarItems.map((pillar, idx) => (
            <Reveal
              key={pillar.media.id}
              delay={idx * 0.08}
              className="p-5 sm:p-6 border border-[var(--color-border)] bg-[var(--color-bg-primary)] flex flex-col justify-between space-y-4 transition-colors duration-300 hover:border-[var(--color-accent)]"
            >
              <div className="space-y-4">
                <MediaSlot
                  type={pillar.media.type}
                  src={pillar.media.src}
                  aspectRatio="16/10"
                  alt={isOr ? pillar.media.altOr : pillar.media.altEn}
                />
                <h3 className="font-display text-lg sm:text-xl text-[var(--color-highlight)] leading-snug">
                  {pillar.title}
                </h3>
              </div>
              <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                {pillar.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
