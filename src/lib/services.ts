import { cacheLife, cacheTag } from 'next/cache';
import { LocalizedPackage, ServiceItem } from '@/types/service';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Package, IPackage } from '@/models/Package';

// Helper to convert DB package document to LocalizedPackage for the active locale
export function toLocalizedPackage(
  raw: Partial<IPackage> | Record<string, unknown>,
  locale: string
): LocalizedPackage {
  const isOdia = locale === 'or';
  const r = raw as Record<string, unknown>;

  const tiers = Array.isArray(r.tiers)
    ? r.tiers.map((t: Record<string, unknown>) => ({
        name: String((isOdia ? t.nameOr : t.nameEn) || t.nameEn || ''),
        tagline: String((isOdia ? t.taglineOr : t.taglineEn) || t.taglineEn || ''),
        priceDisplay: String((isOdia ? t.priceDisplayOr : t.priceDisplayEn) || t.priceDisplayEn || ''),
        isPopular: Boolean(t.isPopular),
        deliverables: Array.isArray(isOdia ? t.deliverablesOr : t.deliverablesEn)
          ? ((isOdia ? t.deliverablesOr : t.deliverablesEn) as string[])
          : [],
      }))
    : [];

  const addOns = Array.isArray(r.addOns)
    ? r.addOns.map((a: Record<string, unknown>) => ({
        name: String((isOdia ? a.nameOr : a.nameEn) || a.nameEn || ''),
        price: String((isOdia ? a.priceOr : a.priceEn) || a.priceEn || ''),
        description: String((isOdia ? a.descriptionOr : a.descriptionEn) || a.descriptionEn || ''),
      }))
    : [];

  const faqs = Array.isArray(r.faqs)
    ? r.faqs.map((f: Record<string, unknown>) => ({
        question: String((isOdia ? f.questionOr : f.questionEn) || f.questionEn || ''),
        answer: String((isOdia ? f.answerOr : f.answerEn) || f.answerEn || ''),
      }))
    : [];

  const printSupport = (r.printAndDeliverySupport as Record<string, unknown>) || {};
  const seo = (r.seo as Record<string, unknown>) || {};
  const media = (r.media as Record<string, unknown>) || {};

  return {
    slug: String(r.slug || ''),
    title: String((isOdia ? r.titleOr : r.titleEn) || r.titleEn || ''),
    tagline: String((isOdia ? r.taglineOr : r.taglineEn) || r.taglineEn || ''),
    category: (r.category as ServiceItem['category']) || 'wedding',
    startingPrice: typeof r.startingPrice === 'number' ? r.startingPrice : 0,
    formattedStartingPrice: String(
      (isOdia ? r.formattedPriceOr : r.formattedPriceEn) ||
        r.formattedPriceEn ||
        `₹${(Number(r.startingPrice) || 0).toLocaleString('en-IN')}`
    ),
    startingPriceNote: String((isOdia ? r.startingPriceNoteOr : r.startingPriceNoteEn) || r.startingPriceNoteEn || ''),
    baseLocation: String((isOdia ? r.baseLocationOr : r.baseLocationEn) || r.baseLocationEn || ''),
    teamCrew: String((isOdia ? r.teamCrewOr : r.teamCrewEn) || r.teamCrewEn || ''),
    travelNote: String((isOdia ? r.travelNoteOr : r.travelNoteEn) || r.travelNoteEn || ''),
    duration: String((isOdia ? r.durationOr : r.durationEn) || r.durationEn || ''),
    features: Array.isArray(isOdia ? r.featuresOr : r.featuresEn)
      ? ((isOdia ? r.featuresOr : r.featuresEn) as string[])
      : [],
    deliverables: Array.isArray(isOdia ? r.deliverablesOr : r.deliverablesEn)
      ? ((isOdia ? r.deliverablesOr : r.deliverablesEn) as string[])
      : [],
    tiers,
    ritualsCovered: Array.isArray(isOdia ? r.ritualsCoveredOr : r.ritualsCoveredEn)
      ? ((isOdia ? r.ritualsCoveredOr : r.ritualsCoveredEn) as string[])
      : [],
    addOns,
    printAndDeliverySupport: {
      title: String((isOdia ? printSupport.titleOr : printSupport.titleEn) || printSupport.titleEn || ''),
      description: String((isOdia ? printSupport.descriptionOr : printSupport.descriptionEn) || printSupport.descriptionEn || ''),
      items: Array.isArray(isOdia ? printSupport.itemsOr : printSupport.itemsEn)
        ? ((isOdia ? printSupport.itemsOr : printSupport.itemsEn) as string[])
        : [],
    },
    faqs,
    seo: {
      metaTitle: String((isOdia ? seo.metaTitleOr : seo.metaTitleEn) || seo.metaTitleEn || ''),
      metaDescription: String((isOdia ? seo.metaDescriptionOr : seo.metaDescriptionEn) || seo.metaDescriptionEn || ''),
      keywords: Array.isArray(seo.keywords) ? (seo.keywords as string[]) : [],
    },
    media: {
      src: typeof media.src === 'string' ? media.src : undefined,
      aspectRatio: String(media.aspectRatio || '16/9'),
      label: String((isOdia ? media.labelOr : media.labelEn) || media.labelEn || ''),
      descriptor: String((isOdia ? media.descriptorOr : media.descriptorEn) || media.descriptorEn || ''),
    },
    isPopular: Boolean(r.isPopular),
    displayOrder: typeof r.displayOrder === 'number' ? r.displayOrder : 0,
  };
}

/**
 * Returns all active packages localized for the requested locale directly from MongoDB,
 * cached using Next.js 16 'use cache' directive with cacheTag('packages').
 */
export async function getAllServices(locale: string = 'en'): Promise<LocalizedPackage[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('packages');

  try {
    await connectToDatabase();
    const docs = await Package.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
    return docs.map((pkg) => toLocalizedPackage(pkg as unknown as Record<string, unknown>, locale));
  } catch (err) {
    console.warn('[Services] Database connection unavailable:', err);
    return [];
  }
}

/**
 * Returns a specific package by slug localized for the requested locale directly from MongoDB,
 * cached using Next.js 16 'use cache' directive.
 */
export async function getServiceBySlug(
  locale: string,
  slug: string
): Promise<LocalizedPackage | undefined> {
  'use cache';
  cacheLife('hours');
  cacheTag('packages');
  cacheTag(`package-${slug}`);

  try {
    await connectToDatabase();
    const doc = await Package.findOne({ slug, isActive: true }).lean();
    if (!doc) {
      return undefined;
    }
    return toLocalizedPackage(doc as unknown as Record<string, unknown>, locale);
  } catch (err) {
    console.warn(`[Services] Database connection unavailable for slug ${slug}:`, err);
    return undefined;
  }
}

/**
 * Returns all active package slugs directly from MongoDB for SSG generateStaticParams()
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('packages');

  try {
    await connectToDatabase();
    const docs = await Package.find({ isActive: true }).select('slug').lean();
    return docs.map((s) => String(s.slug));
  } catch (err) {
    console.warn('[Services] Database connection unavailable for slugs:', err);
    return [];
  }
}
