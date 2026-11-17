'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { navigationConfig } from '@/config/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SocialIcon } from './SocialIcons';

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOdia = locale === 'or';

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg-primary)]/95 backdrop-blur-md border-b border-[var(--color-border)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand identity */}
        <div className="flex flex-col justify-center min-w-0">
          <Link href="/" className="group inline-flex flex-col">
            <span className="font-display text-[16px] sm:text-xl lg:text-[22px] tracking-[0.04em] sm:tracking-[0.08em] lg:tracking-[0.1em] text-[var(--color-highlight)] group-hover:text-[var(--color-accent)] transition-colors leading-tight truncate">
              {navigationConfig.brand.name}
            </span>
            <span
              className={`text-[7.5px] sm:text-[9px] uppercase text-[var(--color-text-muted)] font-body whitespace-nowrap mt-0.5 ${
                isOdia ? 'tracking-normal' : 'tracking-[0.14em] sm:tracking-[0.2em]'
              }`}
            >
              {t(navigationConfig.brand.subtitleKey)}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links (>= 1024px) */}
        <nav
          className={`hidden lg:flex items-center gap-7 xl:gap-9 uppercase font-body text-[var(--color-text-primary)] ${
            isOdia ? 'tracking-normal text-[13px]' : 'text-xs tracking-[0.14em]'
          }`}
        >
          {navigationConfig.mainNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && !item.href.startsWith('/#') && pathname.startsWith(item.href));

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`hover:text-[var(--color-accent)] transition-colors relative py-1 font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-[var(--color-highlight)] font-semibold'
                    : 'text-[var(--color-text-primary)]'
                }`}
              >
                {t(item.key)}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--color-accent)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions (CTA & Language Switcher) (>= 1024px) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center text-[11px] font-body tracking-wider text-[var(--color-text-faint)] border border-[var(--color-border)] rounded-sm px-2.5 py-1 bg-[var(--color-bg-secondary)]/30">
            <Link
              href={pathname}
              locale="en"
              className={`px-1 py-0.5 transition-colors ${
                locale === 'en'
                  ? 'text-[var(--color-highlight)] font-semibold'
                  : 'text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]'
              }`}
            >
              EN
            </Link>
            <span className="opacity-30">/</span>
            <Link
              href={pathname}
              locale="or"
              className={`px-1 py-0.5 transition-colors ${
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
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[var(--color-accent)] text-[var(--color-highlight)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] uppercase font-body font-semibold transition-all duration-300 whitespace-nowrap ${
              isOdia ? 'text-xs tracking-normal' : 'text-[11px] tracking-[0.14em]'
            }`}
          >
            <span>{t(navigationConfig.cta.key)}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile / Tablet Menu Button & Controls (< 1024px) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 lg:hidden">
          {/* Language Switcher (compact) */}
          <div className="flex items-center text-[10px] sm:text-[11px] font-body text-[var(--color-text-faint)] border border-[var(--color-border)] rounded-sm px-2 py-0.5 bg-[var(--color-bg-secondary)]/30">
            <Link
              href={pathname}
              locale="en"
              className={`px-1 py-0.5 transition-colors ${
                locale === 'en'
                  ? 'text-[var(--color-highlight)] font-semibold'
                  : 'text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]'
              }`}
            >
              EN
            </Link>
            <span className="opacity-30">/</span>
            <Link
              href={pathname}
              locale="or"
              className={`px-1 py-0.5 transition-colors ${
                locale === 'or'
                  ? 'text-[var(--color-highlight)] font-semibold'
                  : 'text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]'
              }`}
            >
              ଓଡ଼ିଆ
            </Link>
          </div>

          {/* Hamburger / Close Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[var(--color-highlight)] hover:text-[var(--color-accent)] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] px-6 py-6 flex flex-col gap-5 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <nav
            className={`flex flex-col gap-3.5 uppercase font-body text-[var(--color-text-primary)] ${
              isOdia ? 'text-sm tracking-normal' : 'text-xs tracking-[0.16em]'
            }`}
          >
            {navigationConfig.mainNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && !item.href.startsWith('/#') && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 flex items-center justify-between transition-colors ${
                    isActive
                      ? 'text-[var(--color-highlight)] font-semibold'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent)]'
                  }`}
                >
                  <span>{t(item.key)}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-3.5">
            <Link
              href={navigationConfig.cta.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--color-accent)] text-[var(--color-bg-primary)] uppercase font-body font-semibold transition-colors hover:bg-[var(--color-highlight)] ${
                isOdia ? 'text-sm tracking-normal' : 'text-xs tracking-[0.16em]'
              }`}
            >
              <span>{t(navigationConfig.cta.key)}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Language Switcher inside Drawer */}
            <div className="flex items-center justify-center gap-3 pt-1 text-xs font-body tracking-wider text-[var(--color-text-faint)]">
              <span className="text-[var(--color-text-muted)] text-[11px] uppercase tracking-wider">Language:</span>
              <Link
                href={pathname}
                locale="en"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-2 py-1 border border-[var(--color-border)] rounded-xs transition-colors ${
                  locale === 'en'
                    ? 'border-[var(--color-accent)] text-[var(--color-highlight)] font-semibold bg-[var(--color-bg-secondary)]'
                    : 'text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]'
                }`}
              >
                English
              </Link>
              <Link
                href={pathname}
                locale="or"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-2 py-1 border border-[var(--color-border)] rounded-xs transition-colors ${
                  locale === 'or'
                    ? 'border-[var(--color-accent)] text-[var(--color-highlight)] font-semibold bg-[var(--color-bg-secondary)]'
                    : 'text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]'
                }`}
              >
                ଓଡ଼ିଆ
              </Link>
            </div>

            {/* Social Links inside Mobile Menu */}
            <div className="flex items-center justify-center gap-6 pt-2 text-[var(--color-text-faint)]">
              {navigationConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-accent)] transition-colors p-1"
                  aria-label={social.name}
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
