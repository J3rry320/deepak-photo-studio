'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Camera, Film, Volume2, VolumeX } from 'lucide-react';

export interface MediaSlotProps {
  src?: string;
  poster?: string;
  type?: 'image' | 'video';
  alt?: string;
  aspectRatio?: '21/9' | '16/9' | '4/3' | '3/2' | '1/1' | '4/5' | '9/16' | string;
  descriptor?: string;
  label?: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
}

export function MediaSlot({
  src,
  poster,
  type,
  alt = 'Deepak Photo Films Wedding Photography & 4K Cinema',
  aspectRatio = '3/2',
  className = '',
  objectPosition = 'object-center',
  priority = false,
}: MediaSlotProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const aspectClassMap: Record<string, string> = {
    '21/9': 'aspect-[16/9] sm:aspect-[21/9]',
    '16/9': 'aspect-[16/9]',
    '16/10': 'aspect-[16/10]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    '4/5': 'aspect-[4/5]',
    '3/4': 'aspect-[3/4]',
    '9/16': 'aspect-[9/16]',
  };

  const containerAspectClass = aspectClassMap[aspectRatio] || '';
  const inlineAspectStyle = !aspectClassMap[aspectRatio] ? { aspectRatio } : undefined;

  const isVideoFile =
    type === 'video' ||
    Boolean(src && /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(src.trim()));

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Case 1: Active Video Source Provided
  if (src && src.trim() !== '' && isVideoFile) {
    return (
      <div
        style={inlineAspectStyle}
        className={`group relative w-full overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] transition-colors duration-500 hover:border-[var(--color-accent)] ${containerAspectClass} ${className}`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${objectPosition}`}
        />

        {/* Discreet audio toggle for cinematic experience */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="absolute bottom-3.5 right-3.5 z-20 w-8 h-8 flex items-center justify-center bg-[var(--color-bg-primary)]/85 backdrop-blur-xs border border-[var(--color-border)] text-[var(--color-highlight)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[var(--color-border)]/40 z-10" />
      </div>
    );
  }

  // Case 2: Active Image Source Provided
  if (src && src.trim() !== '') {
    return (
      <div
        style={inlineAspectStyle}
        className={`group relative w-full overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] transition-colors duration-500 hover:border-[var(--color-accent)] ${containerAspectClass} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${objectPosition}`}
        />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[var(--color-border)]/40 z-10" />
      </div>
    );
  }

  // Case 3: Silent, Text-Free Regal Architectural Placeholder
  const isCinemaPlaceholder =
    type === 'video' ||
    aspectRatio === '21/9' ||
    aspectRatio === '16/9' ||
    aspectRatio === '9/16';

  return (
    <div
      style={inlineAspectStyle}
      aria-label={alt}
      className={`group relative w-full overflow-hidden flex items-center justify-center bg-[var(--color-bg-secondary)] border border-[var(--color-border)] select-none transition-colors duration-500 hover:border-[var(--color-accent)] ${containerAspectClass} ${className}`}
    >
      {/* Subtle architectural inset mat frame */}
      <div className="absolute inset-3 sm:inset-4 pointer-events-none border border-[var(--color-border)]/40 transition-colors duration-500 group-hover:border-[var(--color-accent)]/30" />

      {/* Minimalist silent emblem */}
      <div className="relative z-10 w-10 h-10 rounded-full bg-[var(--color-bg-primary)]/80 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]/70 group-hover:text-[var(--color-accent)] group-hover:scale-105 transition-all duration-300">
        {isCinemaPlaceholder ? (
          <Film className="w-4 h-4 stroke-[1.5]" />
        ) : (
          <Camera className="w-4 h-4 stroke-[1.5]" />
        )}
      </div>
    </div>
  );
}
