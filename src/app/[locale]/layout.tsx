import type { Metadata } from 'next';
import { Marcellus, Tenor_Sans, Noto_Serif_Oriya, Anek_Odia } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { activeTheme } from '@/config/theme';
import '../globals.css';

// Classical Humanist Roman Flare Serif (Display / Headings)
const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marcellus',
  display: 'swap',
});

// Refined Editorial Fashion Sans (Body / Subtitles / Navigation)
const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tenor-sans',
  display: 'swap',
});

// Odia Classical Display Serif
const notoSerifOriya = Noto_Serif_Oriya({
  subsets: ['oriya'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-odia-serif',
  display: 'swap',
});

// Odia Editorial Body Sans
const anekOdia = Anek_Odia({
  subsets: ['oriya'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-odia-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DEEPAK PHOTO FILMS | 35mm Analog & Fine Art Wedding Cinema',
  description: 'Documentary wedding photography and cinematic 35mm films. Preserving fleeting glances, heartfelt ceremonies, and timeless love across India.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
}

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  const locale = await getLocale();

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  // Inject current theme's CSS variables dynamically onto root
  const themeCssVariables = {
    '--color-bg-primary': activeTheme.colors.bgPrimary,
    '--color-bg-secondary': activeTheme.colors.bgSecondary,
    '--color-bg-tertiary': activeTheme.colors.bgTertiary,
    '--color-border': activeTheme.colors.surfaceBorder,
    '--color-text-primary': activeTheme.colors.textPrimary,
    '--color-text-muted': activeTheme.colors.textMuted,
    '--color-text-faint': activeTheme.colors.textFaint,
    '--color-accent': activeTheme.colors.accent,
    '--color-accent-hover': activeTheme.colors.accentHover,
    '--color-accent-glow': activeTheme.colors.accentGlow,
    '--color-highlight': activeTheme.colors.highlight,
  } as React.CSSProperties;

  return (
    <html
      lang={locale}
      style={themeCssVariables}
      className={`${marcellus.variable} ${tenorSans.variable} ${notoSerifOriya.variable} ${anekOdia.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] selection:bg-[var(--color-highlight)] selection:text-[#ffffff]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
