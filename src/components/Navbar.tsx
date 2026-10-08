'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { navigationConfig, SocialPlatform } from '@/config/navigation';
import { Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from './SocialIcons';

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex flex-col">
          <Link href="/" className="group inline-block">
            <span className="font-display text-2xl sm:text-3xl tracking-wide text-[var(--color-highlight)] group-hover:text-[var(--color-accent)] transition-colors">
              {navigationConfig.brand.name}
            </span>
          </Link>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-faint)] font-body">
            {t(navigationConfig.brand.subtitleKey)}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-body text-[var(--color-text-muted)]">
          {navigationConfig.mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="hover:text-[var(--color-accent)] transition-colors relative py-1"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions (CTA & Language Switcher) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 text-xs font-body tracking-wider text-[var(--color-text-faint)] border border-[var(--color-border)] px-3 py-1">
            <Link
              href={pathname}
              locale="en"
              className={`transition-colors ${
                locale === 'en'
                  ? 'text-[var(--color-highlight)] font-semibold'
                  : 'text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]'
              }`}
            >
              EN
            </Link>
            <span>/</span>
            <Link
              href={pathname}
              locale="or"
              className={`transition-colors ${
                locale === 'or'
                  ? 'text-[var(--color-highlight)] font-semibold'
                  : 'text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]'
              }`}
            >
              ଓଡ଼ିଆ
            </Link>
          </div>

          {/* Primary CTA */}
          <Link
            href={navigationConfig.cta.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-accent)] text-[var(--color-highlight)] hover:bg-[var(--color-accent)] hover:text-[#ffffff] text-xs uppercase tracking-[0.2em] font-body transition-all duration-300"
          >
            <span>{t(navigationConfig.cta.key)}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-1 text-[11px] font-body text-[var(--color-text-faint)] mr-2">
            <Link
              href={pathname}
              locale="en"
              className={locale === 'en' ? 'text-[var(--color-highlight)] font-semibold' : ''}
            >
              EN
            </Link>
            <span>/</span>
            <Link
              href={pathname}
              locale="or"
              className={locale === 'or' ? 'text-[var(--color-highlight)] font-semibold' : ''}
            >
              ଓଡ଼ିଆ
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--color-highlight)] hover:text-[var(--color-accent)] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] px-6 py-8 flex flex-col gap-6 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-5 text-sm tracking-[0.2em] uppercase font-body text-[var(--color-text-muted)]">
            {navigationConfig.mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-4">
            <Link
              href={navigationConfig.cta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[#ffffff] text-xs uppercase tracking-[0.2em] font-body font-semibold"
            >
              <span>{t(navigationConfig.cta.key)}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Social Links inside Mobile Menu */}
            <div className="flex items-center justify-center gap-6 pt-3 text-[var(--color-text-faint)]">
              {navigationConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-accent)] transition-colors"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
