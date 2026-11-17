import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllPublishedStories } from '@/lib/stories';
import { StoriesArchiveClient } from './StoriesArchiveClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t('stories.archiveTitle')} | Deepak Photo Films`,
    description: t('stories.archiveLead'),
    openGraph: {
      title: `${t('stories.archiveTitle')} | Deepak Photo Films`,
      description: t('stories.archiveLead'),
    },
  };
}

export default async function StoriesArchivePage() {
  const locale = await getLocale();
  const stories = await getAllPublishedStories(locale);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <StoriesArchiveClient stories={stories} />
    </div>
  );
}
