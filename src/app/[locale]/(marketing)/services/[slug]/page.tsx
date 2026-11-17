import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/services';
import { Link } from '@/i18n/navigation';
import { navigationConfig } from '@/config/navigation';
import { WhatsAppIcon } from '@/components/SocialIcons';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  MapPin,
  Clock,
  Users,
  Package,
  Sparkles,
  Truck,
  BookOpen,
} from 'lucide-react';

interface ServicePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const instant = false;

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(locale, slug);

  if (!service) {
    return {
      title: 'Service Not Found | Deepak Photo Films',
    };
  }

  return {
    title: service.seo.metaTitle,
    description: service.seo.metaDescription,
    keywords: service.seo.keywords,
    openGraph: {
      title: service.seo.metaTitle,
      description: service.seo.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(locale, slug);

  if (!service) {
    notFound();
  }

  const phoneRaw = navigationConfig.contact.whatsapp.replace(/\D/g, '');
  const waPreFill = encodeURIComponent(
    `Hello Deepak Photo Films, I am interested in inquiring for the "${service.title}" (${service.formattedStartingPrice}) for my upcoming event.`
  );
  const whatsappUrl = `https://wa.me/${phoneRaw}?text=${waPreFill}`;

  const isOdia = locale === 'or';

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* Editorial Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-4 flex items-center justify-between">
          <Link
            href="/#investment"
            className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isOdia ? 'ସମସ୍ତ ପ୍ୟାକେଜ୍' : 'All Packages'}</span>
          </Link>

          <span className="text-[11px] font-body uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
            {service.category}
          </span>
        </div>
      </nav>

      {/* Hero Masthead Section */}
      <header className="px-6 sm:px-10 lg:px-12 pt-16 sm:pt-24 pb-16 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Cuttack Base & Travel Notice */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-body text-[var(--color-text-muted)]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>{service.baseLocation}</span>
            </span>
            <span className="text-[var(--color-text-faint)]">•</span>
            <span>{service.travelNote}</span>
          </div>

          {/* Grand Title & Tagline */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[var(--color-highlight)] leading-[1.06]">
              {service.title}
            </h1>
            <p className="font-body text-base sm:text-xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed">
              {service.tagline}
            </p>
          </div>

          {/* Starting Price & Direct Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[var(--color-border)]">
            <div>
              <span className="block text-[11px] font-body uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                {isOdia ? 'ଆରମ୍ଭ ମୂଲ୍ୟ' : 'Starting Price'}
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)]">
                {service.formattedStartingPrice}
              </span>
              <span className="block text-xs font-body text-[var(--color-text-muted)] mt-1">
                {service.startingPriceNote}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#tiers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#ffffff] text-xs font-body font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                <span>{isOdia ? 'ପ୍ୟାକେଜ୍ ଦେଖନ୍ତୁ' : 'Explore Tiers'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#ffffff] text-[var(--color-highlight)] text-xs font-body uppercase tracking-[0.2em] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[var(--color-accent)] group-hover:text-[#ffffff]" />
                <span>{isOdia ? 'ହ୍ୱାଟ୍ସଆପ୍ ପଚାରନ୍ତୁ' : 'WhatsApp Inquiry'}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3-Box Fast Specs: Duration, Team, Deliverables */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
          <div className="space-y-2 pt-4 md:pt-0">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
              <Clock className="w-4 h-4" />
              <span>{isOdia ? 'ସମୟସୀମା' : 'Coverage Duration'}</span>
            </div>
            <p className="font-display text-lg text-[var(--color-highlight)]">
              {service.duration}
            </p>
          </div>

          <div className="space-y-2 pt-4 md:pt-0 md:pl-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
              <Users className="w-4 h-4" />
              <span>{isOdia ? 'କଟକ କ୍ରୁ' : 'Cuttack Team Crew'}</span>
            </div>
            <p className="font-display text-lg text-[var(--color-highlight)]">
              {service.teamCrew}
            </p>
          </div>

          <div className="space-y-2 pt-4 md:pt-0 md:pl-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
              <Package className="w-4 h-4" />
              <span>{isOdia ? 'ପ୍ରିଣ୍ଟ୍ ଓ ଆଲବମ୍' : 'Physical Delivery'}</span>
            </div>
            <p className="font-display text-lg text-[var(--color-highlight)]">
              {isOdia ? 'ହସ୍ତନିର୍ମିତ ଆଲବମ୍ ଓ ଘରେ ବିତରଣ' : 'Fine-Art Flushmount Album & Doorstep Delivery'}
            </p>
          </div>
        </div>
      </section>

      {/* Tiered Packages & Upsells Section */}
      <section id="tiers" className="px-6 sm:px-10 lg:px-12 py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)]">
              {isOdia ? 'ପ୍ୟାକେଜ୍ ବିକଳ୍ପ ଓ ଅପଗ୍ରେଡ୍' : 'Curated Package Tiers & Upgrades'}
            </h2>
            <p className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed">
              {isOdia
                ? 'ଏହି ସେବାର ଆରମ୍ଭ ବେସ୍ ପ୍ୟାକେଜ୍ ଠାରୁ ଆରମ୍ଭ କରି ସମ୍ପୂର୍ଣ୍ଣ ଆଲବମ୍ ଓ ଡ୍ରୋନ୍ ସେବା ବିଶିଷ୍ଟ ଉଚ୍ଚ ପ୍ୟାକେଜ୍ ଚୟନ କରନ୍ତୁ।'
                : 'Choose between our base essential coverage or upgrade to our full cinema, drone, and handcrafted leather album packages.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {service.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-8 border flex flex-col justify-between ${
                  tier.isPopular
                    ? 'border-[var(--color-accent)] bg-[var(--color-bg-secondary)] relative shadow-md'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-primary)]'
                }`}
              >
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    {tier.isPopular && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-body uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                        <Sparkles className="w-3 h-3" />
                        <span>{isOdia ? 'ସର୍ବାଧିକ ପସନ୍ଦ' : 'Most Popular Choice'}</span>
                      </span>
                    )}
                    <h3 className="font-display text-2xl text-[var(--color-highlight)]">
                      {tier.name}
                    </h3>
                    <p className="text-xs font-body text-[var(--color-text-muted)]">
                      {tier.tagline}
                    </p>
                  </div>

                  <div className="py-4 border-y border-[var(--color-border)]">
                    <span className="font-display text-3xl text-[var(--color-highlight)]">
                      {tier.priceDisplay}
                    </span>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {tier.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-body text-[var(--color-text-muted)] leading-snug">
                        <Check className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="#book"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-body uppercase tracking-[0.2em] transition-colors ${
                      tier.isPopular
                        ? 'bg-[var(--color-accent)] text-[#ffffff] font-semibold hover:bg-[var(--color-accent-hover)]'
                        : 'border border-[var(--color-border)] text-[var(--color-highlight)] hover:border-[var(--color-accent)]'
                    }`}
                  >
                    <span>{isOdia ? 'ଏହି ପ୍ୟାକେଜ୍ ବୁକ୍ କରନ୍ତୁ' : 'Select This Tier'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Print, Album & Doorstep Delivery Guarantee Section */}
      <section className="px-6 sm:px-10 lg:px-12 py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-[var(--color-accent)]">
                <Truck className="w-4 h-4" />
                <span>{isOdia ? 'ପ୍ରିଣ୍ଟ୍ ଓ ଡେଲିଭରି ସହାୟତା' : 'Physical Delivery Support'}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)]">
                {service.printAndDeliverySupport.title}
              </h2>
              <p className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed">
                {service.printAndDeliverySupport.description}
              </p>
            </div>

            <div className="md:col-span-7 p-8 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] space-y-4">
              <div className="flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-[var(--color-highlight)] font-semibold">
                <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />
                <span>{isOdia ? 'ହସ୍ତନିର୍ମିତ ଆଲବମ୍ ବୈଶିଷ୍ଟ୍ୟ' : 'Handcrafted Album Specifications'}</span>
              </div>
              <ul className="space-y-3">
                {service.printAndDeliverySupport.items.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs font-body text-[var(--color-text-muted)] leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ceremonies & Rituals Covered */}
      <section className="px-6 sm:px-10 lg:px-12 py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)]">
              {isOdia ? 'ଅନ୍ତର୍ଭୁକ୍ତ ରୀତିନୀତି ଓ କାର୍ଯ୍ୟକ୍ରମ' : 'Rituals & Key Moments Documented'}
            </h2>
            <p className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed">
              {isOdia
                ? 'ଆମେ ପ୍ରତ୍ୟେକ ପବିତ୍ର ବିଧିବିଧାନକୁ ସମ୍ମାନର ସହ ନୀରବରେ ଚିତ୍ରାୟନ କରିଥାଉ।'
                : 'Every sacred vow, unscripted glance, and family ritual is preserved with documentary reverence.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {service.ritualsCovered.map((ritual, idx) => (
              <div
                key={idx}
                className="p-5 border border-[var(--color-border)] bg-[var(--color-bg-primary)] flex items-start gap-3"
              >
                <span className="font-display text-lg text-[var(--color-accent)] shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="font-body text-xs sm:text-sm text-[var(--color-highlight)] leading-snug">
                  {ritual}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Section */}
      {service.addOns.length > 0 && (
        <section className="px-6 sm:px-10 lg:px-12 py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-highlight)]">
                {isOdia ? 'ଇଚ୍ଛାଧୀନ କଷ୍ଟମ୍ ଆଡ୍-ଅନ୍ସ' : 'Bespoke Upgrades & Add-Ons'}
              </h2>
              <p className="font-body text-sm text-[var(--color-text-muted)]">
                {isOdia
                  ? 'ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ଏହି ସେବାଗୁଡ଼ିକୁ ଯୋଡ଼ିପାରିବେ।'
                  : 'Tailor your package with aerial drone cinematography, vintage film rolls, or extra parent albums.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.addOns.map((addon) => (
                <div
                  key={addon.name}
                  className="p-6 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)] transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--color-border)] pb-2.5">
                      <h3 className="font-display text-lg text-[var(--color-highlight)] leading-snug">
                        {addon.name}
                      </h3>
                      <span className="font-body font-bold text-sm text-[var(--color-accent)] whitespace-nowrap tracking-wide">
                        {addon.price}
                      </span>
                    </div>
                    <p className="text-xs font-body text-[var(--color-text-muted)] leading-relaxed">
                      {addon.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Intake & Direct Contact */}
      <section id="book" className="px-6 sm:px-10 lg:px-12 py-20 sm:py-28 bg-[var(--color-bg-secondary)]/40">
        <div className="max-w-4xl mx-auto p-8 sm:p-12 border border-[var(--color-border)] bg-[var(--color-bg-primary)] space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-body uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
              {isOdia ? 'ତାରିଖ ଯାଞ୍ଚ ଓ ଆଲୋଚନା' : 'Check Date Availability'}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-highlight)]">
              {isOdia ? `ବୁକ୍ କରନ୍ତୁ: ${service.title}` : `Inquire for ${service.title}`}
            </h2>
            <p className="font-body text-sm text-[var(--color-text-muted)] max-w-lg mx-auto">
              {isOdia
                ? 'କଟକରୁ ଆମ ଟିମ୍ ଓଡ଼ିଶାର ଯେକୌଣସି ସ୍ଥାନକୁ ଯାତ୍ରା କରିଥାନ୍ତି। ଆପଣଙ୍କ ତାରିଖ ଜଣାନ୍ତୁ।'
                : 'Our 3-artist Cuttack team accepts a limited number of weddings per season. Contact us to reserve your dates.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#ffffff] text-xs font-body font-semibold uppercase tracking-[0.2em] transition-colors shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#ffffff]" />
              <span>{isOdia ? 'ହ୍ୱାଟ୍ସଆପ୍‌ରେ ତୁରନ୍ତ କଥା ହୁଅନ୍ତୁ' : 'Instant WhatsApp Reservation'}</span>
            </a>

            <Link
              href="/#inquire"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-highlight)] text-xs font-body uppercase tracking-[0.2em] transition-colors"
            >
              <span>{isOdia ? 'ୱେବସାଇଟ୍ ଫର୍ମ ପୂରଣ କରନ୍ତୁ' : 'Fill Online Inquiry Form'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
