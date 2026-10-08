import { HeroSection } from '@/components/sections/HeroSection';
import { WorksGallerySection } from '@/components/sections/WorksGallerySection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { RatesPreviewSection } from '@/components/sections/RatesPreviewSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { InquirySection } from '@/components/sections/InquirySection';
import { FaqSection } from '@/components/sections/FaqSection';
import { getLocale } from 'next-intl/server';
import { getAllServices } from '@/lib/services';

export default async function HomePage() {
  const locale = await getLocale();
  const packages = await getAllServices(locale);

  return (
    <>
      {/* 1. Hero & Masthead Manifesto */}
      <HeroSection />

      {/* 2. Selected Wedding Works & Film Stills */}
      <WorksGallerySection />

      {/* 3. Studio Philosophy & Sacred Indian Wedding Craft */}
      <PhilosophySection />

      {/* 4. Curated Collections & Transparent Starting Rates */}
      <RatesPreviewSection packages={packages} />

      {/* 5. The Heirloom Journey (4-Step Process) */}
      <ProcessSection />

      {/* 6. Words from Real Couples (Testimonials) */}
      <TestimonialsSection />

      {/* 7. Clean Date Reservation Intake & Inquiries */}
      <InquirySection />

      {/* 8. Essential Inquiries (FAQ) */}
      <FaqSection />
    </>
  );
}
