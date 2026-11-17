/**
 * Hero Section Imagery Configuration
 * ======================================================
 * Add or replace paths here as you provide high-resolution images.
 *
 * Supported formats: local public assets (e.g. '/assets/images/filename.jpg')
 * or external URLs configured in next.config.ts.
 *
 * When multiple images are provided, the Hero Masonry frames will
 * automatically cycle through them with staggered cinematic crossfades.
 */

export interface HeroImage {
  src: string;
  alt?: string;
  objectPosition?: string;
}

export const heroImages: HeroImage[] = [
  {
    src: '/assets/images/Landing.png',
    alt: 'Deepak Photo Films Wedding Photography',
    objectPosition: 'object-center',
  },
];
