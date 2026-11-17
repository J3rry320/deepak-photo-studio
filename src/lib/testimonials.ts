import { cacheLife, cacheTag } from 'next/cache';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Testimonial, ITestimonial } from '@/models/Testimonial';

export interface LocalizedTestimonial {
  id: string;
  coupleNames: string;
  weddingLocation: string;
  weddingYear: string;
  quote: string;
  rating: number;
  featuredOnHome: boolean;
  sortOrder: number;
}

function toLocalizedTestimonial(
  doc: Partial<ITestimonial> | Record<string, unknown>,
  locale: string
): LocalizedTestimonial {
  const isOdia = locale === 'or';
  const r = doc as Record<string, unknown>;

  return {
    id: String(r._id || Math.random()),
    coupleNames: String(r.coupleNames || ''),
    weddingLocation: String(r.weddingLocation || ''),
    weddingYear: String(r.weddingYear || '2025'),
    quote: String((isOdia ? r.quoteOr : r.quoteEn) || r.quoteEn || ''),
    rating: typeof r.rating === 'number' ? r.rating : 5,
    featuredOnHome: Boolean(r.featuredOnHome),
    sortOrder: typeof r.sortOrder === 'number' ? r.sortOrder : 0,
  };
}

/**
 * Returns featured reviews for the homepage directly from MongoDB,
 * cached using Next.js 16 'use cache' directive with cacheTag('testimonials').
 */
export async function getFeaturedTestimonials(
  locale: string = 'en'
): Promise<LocalizedTestimonial[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('testimonials');

  try {
    await connectToDatabase();
    const docs = await Testimonial.find({ featuredOnHome: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return docs.map((doc) =>
      toLocalizedTestimonial(doc as unknown as Record<string, unknown>, locale)
    );
  } catch (err) {
    console.warn('[Testimonials] Database connection unavailable:', err);
    return [];
  }
}

/**
 * Returns all client testimonials directly from MongoDB.
 */
export async function getAllTestimonials(
  locale: string = 'en'
): Promise<LocalizedTestimonial[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('testimonials');

  try {
    await connectToDatabase();
    const docs = await Testimonial.find()
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return docs.map((doc) =>
      toLocalizedTestimonial(doc as unknown as Record<string, unknown>, locale)
    );
  } catch (err) {
    console.warn('[Testimonials] Database connection unavailable:', err);
    return [];
  }
}
