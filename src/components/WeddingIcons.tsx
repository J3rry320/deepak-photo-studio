import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * 1. Both Sides Unified Wedding Icon:
 * Sacred Varamala (Twin Wedding Garlands) & Sacred Agni Union
 */
export function BothSidesUnionIcon({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Twin Intersecting Sacred Rings & Garlands */}
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
      {/* Auspicious Sacred Fire / Tilak Spark at center */}
      <path d="M12 4v2" />
      <path d="M12 9c.5-1 1.5-1.5 2-1" />
      <path d="M12 18v2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * 2. Groom Side & Royal Baraat Icon:
 * Royal Groom Pagdi (Turban) with Kalgi Plume
 */
export function GroomBaraatIcon({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Royal Kalgi Plume */}
      <path d="M12 2c1 2 2 4 1 6-1 2-2 3-1 4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Regal Turban Drapes */}
      <path d="M6 14c0-3 3-5 6-5s6 2 6 5" />
      <path d="M4 17c1-3 4-5 8-5s7 2 8 5" />
      <path d="M5 19h14c1 0 2-.8 2-1.8v-.2c0-1-1-1.8-2-1.8H5c-1 0-2 .8-2 1.8v.2C3 18.2 4 19 5 19z" />
    </svg>
  );
}

/**
 * 3. Bride Side & Sacred Rituals Icon:
 * Sacred Lotus Mandap & Bridal Ornament
 */
export function BrideRitualIcon({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Sacred Temple Lotus Petals */}
      <path d="M12 3c-1.5 3-2 6-2 9 1-2 2-3 4-3s3 1 4 3c0-3-.5-6-2-9-1.2 2-2.8 2-4 0z" />
      <path d="M6 14c2-1 4-1 6 1-2 2-4 2-6-1z" />
      <path d="M18 14c-2-1-4-1-6 1 2 2 4 2 6-1z" />
      <path d="M4 18c3-1 6-1 8 1 2-2 5-2 8-1" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * 4. Pre-Wedding Coastal Icon:
 * Puri Marine Drive Sun, Horizon & Camera Lens
 */
export function PreWeddingCoastIcon({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Golden Hour Sun */}
      <circle cx="12" cy="9" r="4" />
      <path d="M12 2v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
      {/* Ocean Coast Waves */}
      <path d="M2 17c3-1 5-1 8 0s5 1 8 0 4-1 4-1" />
      <path d="M2 21c3-1 5-1 8 0s5 1 8 0 4-1 4-1" />
    </svg>
  );
}

/**
 * 5. 4K Cinema & 35mm Analog Film Icon
 */
export function CinemaRollIcon({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M2 14h20" />
      <path d="M6 5v5" />
      <path d="M10 5v5" />
      <path d="M14 5v5" />
      <path d="M18 5v5" />
      <path d="M6 14v5" />
      <path d="M10 14v5" />
      <path d="M14 14v5" />
      <path d="M18 14v5" />
    </svg>
  );
}

/**
 * 6. Audio & Vows Acoustic Fidelity Icon
 */
export function AudioVowsIcon({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <line x1="8" x2="16" y1="22" y2="22" />
    </svg>
  );
}

/**
 * 7. Luxury Handcrafted Wedding Album Icon
 */
export function ArchivalAlbumIcon({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10" />
      <path d="M6 10h10" />
      <path d="M6 14h6" />
      {/* Archival silk bookmark ribbon */}
      <path d="M16 2v7l-2-1.5L12 9V2" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

/**
 * 8. 3-Artist Dedicated Team Icon
 */
export function StudioTrioIcon({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Central Senior Artist */}
      <circle cx="12" cy="7" r="3" />
      <path d="M6.5 21v-2a5.5 5.5 0 0 1 11 0v2" />
      {/* Supporting Stills & Cinema Artists */}
      <circle cx="5" cy="9" r="2" />
      <path d="M2 20v-1a4 4 0 0 1 4-4" />
      <circle cx="19" cy="9" r="2" />
      <path d="M22 20v-1a4 4 0 0 0-4-4" />
    </svg>
  );
}

/**
 * 10. Archival Online Gallery Vault Icon
 */
export function GalleryVaultIcon({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}
