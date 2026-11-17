import { HeroSection } from '@/components/sections/HeroSection';
import { WorksGallerySection } from '@/components/sections/WorksGallerySection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { RatesPreviewSection } from '@/components/sections/RatesPreviewSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { InquirySection } from '@/components/sections/InquirySection';
import { FaqSection } from '@/components/sections/FaqSection';
import { getLocale, getTranslations } from 'next-intl/server';
import { getAllServices } from '@/lib/services';
import { getFeaturedPortfolioItems } from '@/lib/portfolio';
import { faqConfig } from '@/config/faq';
import { navigationConfig } from '@/config/navigation';

export default async function HomePage() {
  const locale = await getLocale();
  const [t, packages, portfolioItems] = await Promise.all([
    getTranslations(),
    getAllServices(locale),
    getFeaturedPortfolioItems(locale),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        name: navigationConfig.brand.name,
        description: t('hero.lead'),
        telephone: navigationConfig.contact.phone,
        email: navigationConfig.contact.email,
        priceRange: '₹25,000 - ₹1,65,000',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cuttack',
          addressRegion: 'Odisha',
          addressCountry: 'IN',
        },
        areaServed: [
          'Cuttack',
          'Bhubaneswar',
          'Puri',
          'Konark',
          'Jajpur',
          'Sambalpur',
          'Rourkela',
          'Odisha',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqConfig.items.map((item) => ({
          '@type': 'Question',
          name: t(item.questionKey),
          acceptedAnswer: {
            '@type': 'Answer',
            text: t(item.answerKey),
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero & Staggered Masonry Showcase */}
      <HeroSection />

      {/* 2. Selected Wedding Works, 4K Highlight Film & Vertical Reels */}
      <WorksGallerySection items={portfolioItems} />

      {/* 3. Studio Philosophy & Sacred Odia Wedding Craft (#about) */}
      <PhilosophySection />

      {/* 4. Curated Collections & Transparent Starting Rates (#investment) */}
      <RatesPreviewSection packages={packages} />

      {/* 5. The Heirloom Journey (4-Step Process & Widescreen Cinema Frame) */}
      <ProcessSection />

      {/* 6. Real Couples & Family Voices */}
      <TestimonialsSection />

      {/* 7. Date Availability Intake & Direct WhatsApp (#inquire) */}
      <InquirySection />

      {/* 8. Essential Inquiries & Portrait Reel (#faq) */}
      <FaqSection />
    </>
  );
}
