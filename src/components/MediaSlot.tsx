import React from 'react';
import Image from 'next/image';
import { Camera, Film } from 'lucide-react';

export interface MediaSlotProps {
  src?: string;
  alt?: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | '4/5' | '9/16' | string;
  descriptor?: string;
  label?: string;
  className?: string;
  priority?: boolean;
}

export function MediaSlot({
  src,
  alt = 'Deepak Photo Films Wedding Photography',
  aspectRatio = '3/2',
  descriptor = 'Wedding photograph placeholder. Replace with real photo.',
  label,
  className = '',
  priority = false,
}: MediaSlotProps) {
  // Map common aspect ratio tokens to Tailwind classes or fallback to inline style
  const aspectClassMap: Record<string, string> = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    '4/5': 'aspect-[4/5]',
    '9/16': 'aspect-[9/16]',
  };

  const containerAspectClass = aspectClassMap[aspectRatio] || '';
  const inlineAspectStyle = !aspectClassMap[aspectRatio] ? { aspectRatio } : undefined;

  // Case 1: Image path is provided -> Clean, full bleed responsive image
  if (src && src.trim() !== '') {
    return (
      <div
        style={inlineAspectStyle}
        className={`relative w-full overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] ${containerAspectClass} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[var(--color-border)]" />
      </div>
    );
  }

  // Case 2: No image path provided -> Calm, uncluttered, elegant placeholder
  const isVideoOrCinema = aspectRatio.includes('16/9');

  return (
    <div
      style={inlineAspectStyle}
      className={`relative w-full overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-[var(--color-bg-secondary)] border border-[var(--color-border)] select-none transition-colors hover:border-[var(--color-accent)] ${containerAspectClass} ${className}`}
    >
      {/* Icon badge */}
      <div className="w-10 h-10 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] mb-3 shadow-xs">
        {isVideoOrCinema ? <Film className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
      </div>

      {/* Clean meta label */}
      <span className="text-[11px] font-body tracking-wider uppercase text-[var(--color-accent)] font-medium mb-1.5">
        {label ? `${label} (${aspectRatio.replace('/', ':')})` : `PHOTO PREVIEW • ${aspectRatio.replace('/', ':')}`}
      </span>

      {/* Suggested photo descriptor */}
      <p className="font-body text-xs text-[var(--color-text-muted)] max-w-sm leading-relaxed">
        {descriptor}
      </p>
    </div>
  );
}
