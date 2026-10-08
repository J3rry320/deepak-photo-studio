'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { navigationConfig, SocialPlatform } from '@/config/navigation';
import { ArrowUpRight, Phone, Mail } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from './SocialIcons';

export function Footer() {
  const t = useTranslations();

  const getSocialIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'instagram':
        return <InstagramIcon className="w-4 h-4" />;
      case 'youtube':
        return <YoutubeIcon className="w-4 h-4" />;
      case 'whatsapp':
        return <WhatsAppIcon className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'mail':
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/60 text-[var(--color-text-muted)] font-body">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-24">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-16 border-b border-[var(--color-border)]">
          {/* Brand & Studio Summary */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl sm:text-3xl tracking-wide text-[var(--color-highlight)]">
                {navigationConfig.brand.name}
              </span>
            </Link>
            <p className="text-xs tracking-wider uppercase text-[var(--color-text-faint)] leading-relaxed max-w-sm">
              {t(navigationConfig.brand.subtitleKey)} — {navigationConfig.brand.estYear}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-sm pt-2">
              {navigationConfig.contact.location}
            </p>

            {/* Social Icons row */}
            <div className="flex items-center gap-4 pt-4">
              {navigationConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-faint)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns from navigationConfig */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navigationConfig.footerSections.map((section) => (
              <div key={section.titleKey} className="space-y-4">
                <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--color-highlight)]">
                  {t(section.titleKey)}
                </h4>
                <ul className="space-y-2.5 text-xs tracking-wider uppercase text-[var(--color-text-faint)]">
                  {section.items.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        className="hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>{t(item.key)}</span>
                        {item.isExternal && <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Direct Contact */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-widest uppercase text-[var(--color-text-faint)]">
          <p>© {new Date().getFullYear()} {navigationConfig.brand.name}. {t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${navigationConfig.contact.email}`} className="hover:text-[var(--color-accent)] transition-colors">
              {navigationConfig.contact.email}
            </a>
            <span>•</span>
            <a href={`tel:${navigationConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-[var(--color-accent)] transition-colors">
              {navigationConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
