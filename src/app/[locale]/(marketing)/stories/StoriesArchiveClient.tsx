'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LocalizedStory } from '@/lib/stories';
import { MediaSlot } from '@/components/MediaSlot';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';

interface StoriesArchiveClientProps {
  stories: LocalizedStory[];
}

export function StoriesArchiveClient({ stories }: StoriesArchiveClientProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { key: 'all', labelKey: 'stories.filterAll' },
    { key: 'real_wedding', labelKey: 'stories.filterRealWedding' },
    { key: 'editorial', labelKey: 'stories.filterEditorial' },
    { key: 'traditions_guide', labelKey: 'stories.filterTraditions' },
    { key: 'film_journal', labelKey: 'stories.filterJournal' },
  ];

  const filteredStories = stories.filter((story) => {
    if (activeTab === 'all') return true;
    return story.category === activeTab;
  });

  return (
    <>
      {/* Header */}
      <header className="px-6 sm:px-10 lg:px-12 pt-20 sm:pt-28 pb-16 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
        <div className="max-w-5xl mx-auto space-y-6 text-center sm:text-left">
          <span className="text-[11px] font-body uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
            Heirloom Journal
          </span>

          <h1 className="font-display text-4xl sm:text-6xl text-[var(--color-highlight)] leading-tight">
            {t('stories.archiveTitle')}
          </h1>

          <p className="font-body text-base sm:text-lg text-[var(--color-text-muted)] max-w-3xl leading-relaxed">
            {t('stories.archiveLead')}
          </p>

          {/* Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center gap-2 border-t border-[var(--color-border)]/50">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-4 py-2 text-xs font-body uppercase tracking-[0.16em] transition-colors cursor-pointer border ${
                  activeTab === cat.key
                    ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-[#ffffff] font-semibold'
                    : 'bg-[var(--color-bg-primary)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-highlight)]'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          {filteredStories.length === 0 ? (
            <div className="py-24 text-center border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8">
              <p className="font-body text-sm text-[var(--color-text-muted)]">
                {t('stories.empty')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <article
                  key={story.slug}
                  className="p-6 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col justify-between space-y-6 hover:border-[var(--color-accent)] transition-colors"
                >
                  <div className="space-y-4">
                    <MediaSlot
                      src={story.coverImage}
                      aspectRatio="16/9"
                      label={story.city.toUpperCase()}
                      descriptor={story.coupleNames || story.title}
                    />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-body text-[var(--color-text-faint)]">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[var(--color-accent)]" />
                          <span>{story.city}</span>
                        </span>
                        {story.weddingDate && (
                          <>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[var(--color-accent)]" />
                              <span>{new Date(story.weddingDate).toLocaleDateString()}</span>
                            </span>
                          </>
                        )}
                      </div>

                      {story.coupleNames && (
                        <p className="font-body text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold">
                          {story.coupleNames}
                        </p>
                      )}

                      <h2 className="font-display text-2xl text-[var(--color-highlight)] leading-snug">
                        {story.title}
                      </h2>

                      <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <Link
                      href={`/stories/${story.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.18em] text-[var(--color-accent)] hover:text-[var(--color-highlight)] font-semibold transition-colors"
                    >
                      <span>{t('stories.readStory')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
