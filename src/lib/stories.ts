import { cacheLife, cacheTag } from 'next/cache';
import { connectToDatabase } from '@/lib/db/mongodb';
import { BlogStory, IBlogStory, StoryCategory } from '@/models/BlogStory';
import { aspectToRatio } from '@/lib/portfolio';

export interface LocalizedGalleryImage {
  url: string;
  caption?: string;
  aspect: 'portrait' | 'landscape' | 'square';
  aspectRatio: string;
  filmStock?: string;
}

export interface LocalizedStory {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: StoryCategory;
  coupleNames?: string;
  city: string;
  venueName?: string;
  weddingDate?: string;
  coverImage: string;
  galleryImages: LocalizedGalleryImage[];
  filmUrl?: string;
  vendorCredits?: {
    planner?: string;
    venue?: string;
    outfits?: string;
    makeup?: string;
    decor?: string;
  };
  seoKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  publishedAt?: string;
}


function toLocalizedStory(
  doc: Partial<IBlogStory> | Record<string, unknown>,
  locale: string
): LocalizedStory {
  const isOdia = locale === 'or';
  const r = doc as Record<string, unknown>;

  const galleryImages: LocalizedGalleryImage[] = Array.isArray(r.galleryImages)
    ? r.galleryImages.map((img: Record<string, unknown>) => {
        const aspect = (img.aspect as 'portrait' | 'landscape' | 'square') || 'portrait';
        return {
          url: String(img.url || ''),
          caption: String((isOdia ? img.captionOr : img.captionEn) || img.captionEn || ''),
          aspect,
          aspectRatio: aspectToRatio(aspect),
          filmStock: img.filmStock ? String(img.filmStock) : undefined,
        };
      })
    : [];

  const vendorCredits = (r.vendorCredits as Record<string, unknown>) || {};

  return {
    id: String(r._id || Math.random()),
    slug: String(r.slug || ''),
    title: String((isOdia ? r.titleOr : r.titleEn) || r.titleEn || ''),
    excerpt: String((isOdia ? r.excerptOr : r.excerptEn) || r.excerptEn || ''),
    content: String((isOdia ? r.contentOr : r.contentEn) || r.contentEn || ''),
    category: (r.category as StoryCategory) || 'real_wedding',
    coupleNames: r.coupleNames ? String(r.coupleNames) : undefined,
    city: String(r.city || 'Odisha'),
    venueName: r.venueName ? String(r.venueName) : undefined,
    weddingDate: r.weddingDate ? new Date(String(r.weddingDate)).toISOString() : undefined,
    coverImage: String(r.coverImage || ''),
    galleryImages,
    filmUrl: r.filmUrl ? String(r.filmUrl) : undefined,
    vendorCredits: {
      planner: vendorCredits.planner ? String(vendorCredits.planner) : undefined,
      venue: vendorCredits.venue ? String(vendorCredits.venue) : undefined,
      outfits: vendorCredits.outfits ? String(vendorCredits.outfits) : undefined,
      makeup: vendorCredits.makeup ? String(vendorCredits.makeup) : undefined,
      decor: vendorCredits.decor ? String(vendorCredits.decor) : undefined,
    },
    seoKeywords: Array.isArray(r.seoKeywords) ? (r.seoKeywords as string[]) : [],
    metaTitle: String(r.metaTitle || (isOdia ? r.titleOr : r.titleEn) || r.titleEn || ''),
    metaDescription: String(r.metaDescription || (isOdia ? r.excerptOr : r.excerptEn) || r.excerptEn || ''),
    publishedAt: r.publishedAt ? new Date(String(r.publishedAt)).toISOString() : undefined,
  };
}

/**
 * Returns all published blog stories directly from MongoDB,
 * cached using Next.js 16 'use cache' directive with cacheTag('stories').
 */
export async function getAllPublishedStories(
  locale: string = 'en',
  category?: string
): Promise<LocalizedStory[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('stories');

  try {
    await connectToDatabase();
    const query: Record<string, unknown> = { isPublished: true };
    if (category && category !== 'all') {
      query.category = category;
    }

    const docs = await BlogStory.find(query)
      .sort({ weddingDate: -1, createdAt: -1 })
      .lean();

    return docs.map((doc) =>
      toLocalizedStory(doc as unknown as Record<string, unknown>, locale)
    );
  } catch (err) {
    console.warn('[Stories] Database connection unavailable:', err);
    return [];
  }
}

/**
 * Returns a single published story by slug directly from MongoDB.
 */
export async function getStoryBySlug(
  locale: string,
  slug: string
): Promise<LocalizedStory | undefined> {
  'use cache';
  cacheLife('hours');
  cacheTag('stories');
  cacheTag(`story-${slug}`);

  try {
    await connectToDatabase();
    const doc = await BlogStory.findOne({ slug, isPublished: true }).lean();
    if (!doc) {
      return undefined;
    }

    return toLocalizedStory(doc as unknown as Record<string, unknown>, locale);
  } catch (err) {
    console.warn(`[Stories] Database connection unavailable for slug ${slug}:`, err);
    return undefined;
  }
}

/**
 * Returns all published story slugs directly from MongoDB for SSG generateStaticParams()
 */
export async function getAllStorySlugs(): Promise<string[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('stories');

  try {
    await connectToDatabase();
    const docs = await BlogStory.find({ isPublished: true }).select('slug').lean();
    return docs.map((s) => String(s.slug));
  } catch (err) {
    console.warn('[Stories] Database connection unavailable for slugs:', err);
    return [];
  }
}
