'use client';

import { useTranslations } from 'next-intl';
import { navigationConfig } from '@/config/navigation';
import { WhatsAppIcon } from './SocialIcons';

interface WhatsAppFABProps {
  customMessage?: string;
}

export function WhatsAppFAB({ customMessage }: WhatsAppFABProps) {
  const t = useTranslations();
  
  const defaultText = encodeURIComponent(
    customMessage ||
      'Hello Deepak Photo Films, I would like to check availability and packages for my wedding.'
  );

  const phoneRaw = navigationConfig.contact.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${phoneRaw}?text=${defaultText}`;

  return (
    <aside
      aria-label="WhatsApp Floating Action"
      className="fixed bottom-6 right-6 z-40 group flex items-center"
    >
      {/* Editorial tooltip label (revealed smoothly on hover) */}
      <span className="hidden sm:inline-block pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3 px-3.5 py-1.5 bg-[var(--color-highlight)] border border-[var(--color-border)] text-[var(--color-bg-primary)] text-[11px] font-body uppercase tracking-[0.2em] shadow-xl">
        {t('common.whatsappInquire')}
      </span>

      {/* Button with hairline gold border and clean optical contrast */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Deepak Photo Films on WhatsApp"
        className="w-13 h-13 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-accent)] hover:bg-[var(--color-accent)] text-[var(--color-accent)] hover:text-[#ffffff] flex items-center justify-center shadow-xl transition-colors duration-300"
      >
        <WhatsAppIcon className="w-5 h-5" />
      </a>
    </aside>
  );
}
