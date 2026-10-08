export interface NavItem {
  key: string; // Translation key or fallback label
  href: string;
  isExternal?: boolean;
}

export type SocialPlatform = 'instagram' | 'youtube' | 'whatsapp' | 'mail' | 'phone';

export interface SocialLink {
  name: string;
  href: string;
  platform: SocialPlatform;
  handle?: string;
}

export interface FooterSection {
  titleKey: string;
  items: NavItem[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  officeHours: string;
}

export interface NavigationConfig {
  brand: {
    name: string;
    subtitleKey: string;
    locationKey: string;
    estYear: string;
  };
  mainNav: NavItem[];
  cta: NavItem;
  socials: SocialLink[];
  footerSections: FooterSection[];
  contact: ContactInfo;
}

export const navigationConfig: NavigationConfig = {
  brand: {
    name: 'DEEPAK PHOTO FILMS',
    subtitleKey: 'brand.subtitle',
    locationKey: 'brand.location',
    estYear: 'EST. 2014',
  },

  // Navbar main links - easily add or remove items here
  mainNav: [
    { key: 'nav.portfolio', href: '/#portfolio' },
    { key: 'nav.films', href: '/#films' },
    { key: 'nav.stories', href: '/#stories' },
    { key: 'nav.about', href: '/#about' },
  ],

  // Primary Call-To-Action button in navbar and hero
  cta: {
    key: 'nav.contact',
    href: '/#inquire',
  },

  // Social channels - easily add YouTube, Vimeo, Behance, etc.
  socials: [
    {
      name: 'Instagram',
      href: 'https://instagram.com/deepakphotofilms',
      platform: 'instagram',
      handle: '@deepakphotofilms',
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@deepakphotofilms',
      platform: 'youtube',
      handle: 'Deepak Photo Films',
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/919876543210',
      platform: 'whatsapp',
      handle: '+91 98765 43210',
    },
    {
      name: 'Email',
      href: 'mailto:contact@deepakphotofilms.com',
      platform: 'mail',
      handle: 'contact@deepakphotofilms.com',
    },
  ],

  // Footer navigation columns
  footerSections: [
    {
      titleKey: 'footer.columns.archive',
      items: [
        { key: 'nav.portfolio', href: '/#portfolio' },
        { key: 'nav.films', href: '/#films' },
        { key: 'nav.stories', href: '/#stories' },
      ],
    },
    {
      titleKey: 'footer.columns.studio',
      items: [
        { key: 'nav.about', href: '/#about' },
        { key: 'nav.philosophy', href: '/#philosophy' },
        { key: 'nav.journal', href: '/#journal' },
      ],
    },
    {
      titleKey: 'footer.columns.inquire',
      items: [
        { key: 'nav.checkDates', href: '/#inquire' },
        { key: 'nav.investment', href: '/#investment' },
        { key: 'nav.faq', href: '/#faq' },
      ],
    },
  ],

  contact: {
    email: 'hello@deepakphotofilms.com',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    location: 'Cuttack & Bhubaneswar, Odisha • Available Pan-India',
    officeHours: 'Mon — Sat / 10:00 — 19:00 IST',
  },
};
