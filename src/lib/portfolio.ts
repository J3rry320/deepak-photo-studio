import { getFallbackPortfolioItems } from '@/config/landing-media';

export interface LocalizedPortfolioItem {
  id: string;
  title: string;
  category: string;
  aspect: 'portrait' | 'landscape' | 'square';
  aspectRatio: string;
  src: string;
  filmStock: string;
  location: string;
  descriptor: string;
  isFeatured: boolean;
  sortOrder: number;
}

export function aspectToRatio(aspect?: 'portrait' | 'landscape' | 'square'): string {
  switch (aspect) {
    case 'portrait':
      return '4/5';
    case 'landscape':
      return '16/9';
    case 'square':
      return '1/1';
    default:
      return '3/2';
  }
}

/**
 * Returns featured portfolio items directly from static configuration,
 * fully compiled during build time with zero database roundtrips.
 */
export async function getFeaturedPortfolioItems(
  locale: string = 'en'
): Promise<LocalizedPortfolioItem[]> {
  const allItems = getFallbackPortfolioItems(locale);
  return allItems.filter((item) => item.isFeatured);
}

/**
 * Returns all portfolio items directly from static configuration,
 * optionally filtered by category. Fully localized for 'en' and 'or'.
 */
export async function getAllPortfolioItems(
  locale: string = 'en',
  category?: string
): Promise<LocalizedPortfolioItem[]> {
  const allItems = getFallbackPortfolioItems(locale);
  if (!category || category === 'all') {
    return allItems;
  }
  return allItems.filter((item) => item.category === category);
}
