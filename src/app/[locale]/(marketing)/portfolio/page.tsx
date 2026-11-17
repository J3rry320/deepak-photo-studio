import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllPortfolioItems } from '@/lib/portfolio';
import { PortfolioGalleryClient } from './PortfolioGalleryClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('portfolioPage.title')} | Deepak Photo Films`,
    description: t('portfolioPage.lead'),
    openGraph: {
      title: `${t('portfolioPage.title')} | Deepak Photo Films`,
      description: t('portfolioPage.lead'),
    },
  };
}

export default async function PortfolioArchivePage() {
  const locale = await getLocale();
  const items = await getAllPortfolioItems(locale);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <PortfolioGalleryClient items={items} />
    </div>
  );
}
