export type ServiceCategory = 'wedding' | 'pre-wedding' | 'event' | 'portrait' | 'analog';

export interface ServiceTier {
  name: string;
  tagline: string;
  priceDisplay: string;
  isPopular?: boolean;
  deliverables: string[];
}

export interface ServiceAddOn {
  name: string;
  price: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceSeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface ServiceMedia {
  src?: string;
  aspectRatio: string;
  label: string;
  descriptor: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  tagline: string;
  category: ServiceCategory;
  startingPrice: number;
  formattedStartingPrice: string;
  startingPriceNote: string;
  baseLocation: string;
  teamCrew: string;
  travelNote: string;
  printAndDeliverySupport: {
    title: string;
    description: string;
    items: string[];
  };
  duration: string;
  features: string[];
  deliverables: string[];
  tiers: ServiceTier[];
  ritualsCovered: string[];
  addOns: ServiceAddOn[];
  faqs: ServiceFaq[];
  seo: ServiceSeo;
  media: ServiceMedia;
  isPopular: boolean;
  displayOrder: number;
}

export type LocalizedPackage = ServiceItem;
