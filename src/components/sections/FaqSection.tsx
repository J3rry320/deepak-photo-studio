'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { faqConfig } from '@/config/faq';
import { ChevronDown } from 'lucide-react';

export function FaqSection() {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="px-6 sm:px-10 lg:px-12 py-20 sm:py-28 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl text-[var(--color-highlight)] leading-tight">
            {t(faqConfig.sectionTitleKey)}
          </h2>
          <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {t(faqConfig.sectionLeadKey)}
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {faqConfig.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.id} className="py-6">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left gap-4 font-display text-xl sm:text-2xl text-[var(--color-highlight)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{t(item.questionKey)}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-accent)] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-4 pr-8">
                    <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {t(item.answerKey)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
