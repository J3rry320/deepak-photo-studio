import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStoryBySlug } from '@/lib/stories';
import { Link } from '@/i18n/navigation';
import { MediaSlot } from '@/components/MediaSlot';
import { getTranslations } from 'next-intl/server';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  MapPin,
  Film,
  Sparkles,
} from 'lucide-react';

interface StoryDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const instant = false;

export async function generateMetadata({ params }: StoryDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const story = await getStoryBySlug(locale, slug);

  if (!story) {
    return {
      title: 'Story Not Found | Deepak Photo Films',
    };
  }

  return {
    title: `${story.metaTitle} | Deepak Photo Films`,
    description: story.metaDescription,
    keywords: story.seoKeywords,
    openGraph: {
      title: story.metaTitle,
      description: story.metaDescription,
      images: story.coverImage ? [{ url: story.coverImage }] : undefined,
    },
  };
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { locale, slug } = await params;
  const story = await getStoryBySlug(locale, slug);
  const t = await getTranslations();

  if (!story) {
    notFound();
  }

  const hasVendorCredits = Boolean(
    story.vendorCredits &&
      (story.vendorCredits.planner ||
        story.vendorCredits.venue ||
        story.vendorCredits.outfits ||
        story.vendorCredits.makeup ||
        story.vendorCredits.decor)
  );

  return (
    <article className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* Editorial Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-4 flex items-center justify-between">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('stories.backToStories')}</span>
          </Link>

          <span className="text-[11px] font-body uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
            {story.category.replace('_', ' ')}
          </span>
        </div>
      </nav>

      {/* Hero Masthead */}
      <header className="px-6 sm:px-10 lg:px-12 pt-16 sm:pt-24 pb-16 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-body text-[var(--color-text-muted)]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>{story.venueName ? `${story.venueName}, ${story.city}` : story.city}</span>
            </span>

            {story.weddingDate && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>{new Date(story.weddingDate).toLocaleDateString()}</span>
              </span>
            )}
          </div>

          {/* Couple Names */}
          {story.coupleNames && (
            <p className="font-body text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold">
              {story.coupleNames}
            </p>
          )}

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl text-[var(--color-highlight)] leading-tight">
            {story.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="font-body text-base sm:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            {story.excerpt}
          </p>
        </div>
      </header>

      {/* Main Cover Image */}
      {story.coverImage && (
        <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-10">
          <MediaSlot
            src={story.coverImage}
            aspectRatio="16/9"
            priority={true}
            label={story.city.toUpperCase()}
            descriptor={story.coupleNames || story.title}
          />
        </section>
      )}

      {/* Film Highlight Embed (if video exists) */}
      {story.filmUrl && (
        <section className="px-6 sm:px-10 lg:px-12 py-12 border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)]/20">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
              <Film className="w-4 h-4" />
              <span>{t('stories.filmEmbedTitle')}</span>
            </div>
            <div className="aspect-[16/9] w-full overflow-hidden border border-[var(--color-border)] bg-black">
              <iframe
                src={story.filmUrl}
                title={story.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </section>
      )}

      {/* Story Narrative Content */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="font-body text-base sm:text-lg text-[var(--color-text-primary)] leading-relaxed space-y-6 whitespace-pre-line">
          {story.content}
        </div>
      </section>

      {/* Gallery Stills Grid */}
      {story.galleryImages && story.galleryImages.length > 0 && (
        <section className="px-6 sm:px-10 lg:px-12 py-16 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-body uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                Photo Gallery
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)]">
                {t('stories.galleryTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {story.galleryImages.map((img, idx) => (
                <div key={idx} className="space-y-3">
                  <MediaSlot
                    src={img.url}
                    aspectRatio={img.aspectRatio}
                    descriptor={img.caption || `${story.coupleNames || 'Wedding'} Still ${idx + 1}`}
                  />
                  {img.caption && (
                    <p className="font-body text-xs text-[var(--color-text-muted)] italic text-center">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Creative Partners & Vendor Credits */}
      {hasVendorCredits && (
        <section className="max-w-4xl mx-auto px-6 sm:px-10 py-14">
          <div className="p-8 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] space-y-6">
            <div className="flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold border-b border-[var(--color-border)] pb-3">
              <Sparkles className="w-4 h-4" />
              <span>{t('stories.vendorCreditsTitle')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs font-body">
              {story.vendorCredits?.planner && (
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
                    Wedding Planner
                  </span>
                  <p className="text-[var(--color-highlight)] font-medium mt-1">
                    {story.vendorCredits.planner}
                  </p>
                </div>
              )}

              {story.vendorCredits?.venue && (
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
                    Venue
                  </span>
                  <p className="text-[var(--color-highlight)] font-medium mt-1">
                    {story.vendorCredits.venue}
                  </p>
                </div>
              )}

              {story.vendorCredits?.makeup && (
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
                    Bridal Makeup
                  </span>
                  <p className="text-[var(--color-highlight)] font-medium mt-1">
                    {story.vendorCredits.makeup}
                  </p>
                </div>
              )}

              {story.vendorCredits?.outfits && (
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
                    Attire & Silk
                  </span>
                  <p className="text-[var(--color-highlight)] font-medium mt-1">
                    {story.vendorCredits.outfits}
                  </p>
                </div>
              )}

              {story.vendorCredits?.decor && (
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
                    Floral & Mandap Decor
                  </span>
                  <p className="text-[var(--color-highlight)] font-medium mt-1">
                    {story.vendorCredits.decor}
                  </p>
                </div>
              )}

              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
                  Photography & Cinema
                </span>
                <p className="text-[var(--color-accent)] font-medium mt-1">
                  Deepak Photo Films
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking Intake CTA */}
      <section className="px-6 sm:px-10 lg:px-12 py-20 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/40">
        <div className="max-w-4xl mx-auto p-8 sm:p-12 border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-center space-y-6">
          <h3 className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)]">
            {t('stories.inquireAboutWedding')}
          </h3>
          <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
            {t('stories.inquireLead')}
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/#inquire"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#ffffff] text-xs font-body font-semibold uppercase tracking-[0.2em] transition-colors shadow-md"
            >
              <span>{t('hero.ctaInquire')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
