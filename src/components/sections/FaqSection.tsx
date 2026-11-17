'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { faqConfig } from '@/config/faq';
import { MediaSlot } from '@/components/MediaSlot';
import { Reveal } from '@/components/ui/Reveal';
import { landingMediaConfig } from '@/config/landing-media';
import { ChevronDown } from 'lucide-react';

export function FaqSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isOr = locale === 'or';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { portrait } = landingMediaConfig.faq;

  return (
    <section
      id="faq"
      className="px-6 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Heading, Lead & Vertical 9:16 Portrait Reel */}
          <Reveal className="lg:col-span-5 space-y-6">
            <div className="space-y-2.5">
              <h2 className="font-display text-2xl sm:text-4xl text-[var(--color-highlight)] leading-tight">
                {t(faqConfig.sectionTitleKey)}
              </h2>
              <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                {t(faqConfig.sectionLeadKey)}
              </p>
            </div>

            <div className="max-w-xs sm:max-w-sm">
              <MediaSlot
                type={portrait.type}
                src={portrait.src}
                aspectRatio="9/16"
                alt={isOr ? portrait.altOr : portrait.altEn}
                className="max-h-72"
              />
            </div>
          </Reveal>

          {/* Right Column: Animated Editorial Accordion */}
          <Reveal
            delay={0.08}
            className="lg:col-span-7 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]"
          >
            {faqConfig.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.id} className="py-4.5 sm:py-5.5">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between text-left gap-4 font-display text-lg sm:text-xl text-[var(--color-highlight)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="leading-snug">{t(item.questionKey)}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--color-accent)] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3.5 pr-6 font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                          {t(item.answerKey)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
