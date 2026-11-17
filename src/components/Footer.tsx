'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { navigationConfig } from '@/config/navigation';
import { ArrowUpRight, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { SocialIcon } from './SocialIcons';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/80 text-[var(--color-text-muted)] font-body">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 sm:pt-20 pb-24 sm:pb-20">
        {/* Tier 1: Main Brand, Direct Studio Contact & Navigation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pb-14 border-b border-[var(--color-border)]">
          {/* Left: Brand Identity & Direct Connect (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <Link href="/" className="inline-block group">
                <span className="font-display text-2xl sm:text-3xl tracking-[0.08em] text-[var(--color-highlight)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                  {navigationConfig.brand.name}
                </span>
              </Link>
              <p className="text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[var(--color-text-muted)] mt-1.5 font-medium">
                {t(navigationConfig.brand.subtitleKey)} — {navigationConfig.brand.estYear}
              </p>
            </div>

            {/* Direct Studio Contact Details */}
            <div className="space-y-2.5 pt-1 text-xs">
              <div className="flex items-start gap-2.5 text-[var(--color-text-muted)]">
                <MapPin className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t('footer.contact.location')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[var(--color-text-muted)]">
                <Clock className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span>{t('footer.contact.officeHours')}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                <a
                  href={`tel:${navigationConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 text-[var(--color-highlight)] hover:text-[var(--color-accent)] font-semibold transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                  <span>{navigationConfig.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${navigationConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                  <span>{navigationConfig.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[var(--color-highlight)] mb-3">
                {t('footer.connect')}
              </p>
              <div className="flex items-center gap-3">
                {navigationConfig.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xs border border-[var(--color-border)] bg-[var(--color-bg-primary)]/60 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-primary)] transition-all shadow-2xs"
                    aria-label={social.name}
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Dynamic Link Columns (7 cols on lg) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {navigationConfig.footerSections.map((section) => (
              <div key={section.titleKey} className="space-y-4">
                <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-highlight)] border-b border-[var(--color-border)] pb-2">
                  {t(section.titleKey)}
                </h4>
                <ul className="space-y-3 text-xs tracking-wider uppercase font-medium">
                  {section.items.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1 group whitespace-nowrap"
                      >
                        <span>{t(item.key)}</span>
                        {item.isExternal && (
                          <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Editorial SEO & Studio Services Narrative */}
        <div className="py-12 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-[1.5px] bg-[var(--color-accent)]" />
            <h3 className="font-display text-sm sm:text-base tracking-[0.06em] uppercase text-[var(--color-highlight)] font-semibold">
              {t('footer.seo.title')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-xs text-[var(--color-text-muted)] leading-relaxed">
            <div className="space-y-2 bg-[var(--color-bg-primary)]/40 p-4 sm:p-5 rounded-xs border border-[var(--color-border)]/50">
              <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[var(--color-accent)]">
                {t('footer.seo.col1Title')}
              </h4>
              <p className="leading-relaxed opacity-90">
                {t('footer.seo.col1Text')}
              </p>
            </div>
            <div className="space-y-2 bg-[var(--color-bg-primary)]/40 p-4 sm:p-5 rounded-xs border border-[var(--color-border)]/50">
              <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[var(--color-accent)]">
                {t('footer.seo.col2Title')}
              </h4>
              <p className="leading-relaxed opacity-90">
                {t('footer.seo.col2Text')}
              </p>
            </div>
            <div className="space-y-2 bg-[var(--color-bg-primary)]/40 p-4 sm:p-5 rounded-xs border border-[var(--color-border)]/50">
              <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[var(--color-accent)]">
                {t('footer.seo.col3Title')}
              </h4>
              <p className="leading-relaxed opacity-90">
                {t('footer.seo.col3Text')}
              </p>
            </div>
          </div>
        </div>

        {/* Tier 3: Bottom Bar — Copyright & Code Media Labs Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body text-[var(--color-text-muted)]">
          {/* Left: Studio Copyright */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2.5 gap-y-1 text-center md:text-left">
            <span className="font-medium text-[var(--color-text-primary)]">
              © 2026 {navigationConfig.brand.name}.
            </span>
            <span className="opacity-40">•</span>
            <span>{t('footer.copyright')}</span>
            <span className="opacity-40 hidden sm:inline">•</span>
            <span className="text-[11px] text-[var(--color-text-faint)] hidden sm:inline">
              {navigationConfig.contact.location}
            </span>
          </div>

          {/* Right: Code Media Labs Credits */}
          <div className="flex items-center gap-1.5 text-center md:text-right shrink-0 text-xs">
            <span>{t('footer.credits.designedBy')}</span>
            <Heart className="w-3.5 h-3.5 text-[#B91C1C] fill-[#B91C1C] inline-block mx-0.5" />
            <span>{t('footer.credits.by')}</span>
            <a
              href="https://codemedialabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--color-highlight)] hover:text-[var(--color-accent)] transition-colors underline decoration-[var(--color-accent)]/40 hover:decoration-[var(--color-accent)] underline-offset-4"
            >
              {t('footer.credits.author')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
