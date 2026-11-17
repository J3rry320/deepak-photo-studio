/**
 * Active Theme Configuration for Deepak Photo Films.
 * Sacred Mandap & Chandan Silk: Traditional Odia Wedding Heritage
 * Palette: Chandan Silk Ivory, Warm Sandalwood, Royal Khandua/Sindoor Crimson, Temple Zari Gold
 * Fonts: Marcellus (Display / Titles) + Tenor Sans (Body / Editorial) + Odia Script Fonts
 */

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  surfaceBorder: string;
  textPrimary: string;
  textMuted: string;
  textFaint: string;
  accent: string;
  accentHover: string;
  accentGlow: string;
  highlight: string;
}

export interface ThemeFontConfig {
  displayFamily: string;
  bodyFamily: string;
  odiaDisplayFamily: string;
  odiaBodyFamily: string;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  tagline: string;
  colors: ThemeColors;
  fonts: ThemeFontConfig;
}

export const activeTheme: ThemeDefinition = {
  id: 'sacred-mandap-chandan-silk',
  name: 'Sacred Mandap & Chandan Silk',
  tagline: 'Traditional Odia Wedding Heritage (Sindoor Crimson & Zari Gold)',
  colors: {
    bgPrimary: '#FAF7F2',           // Warm Chandan Silk Ivory
    bgSecondary: '#F3ECE2',         // Warm Sandalwood Paper / Alabaster Surface
    bgTertiary: '#ECE3D5',          // Aged Silk Parchment
    surfaceBorder: 'rgba(125, 17, 23, 0.22)', // Crisp Sindoor Hairline Rule
    textPrimary: '#1C0E10',         // Deep Mahua Charcoal Ink (16.5:1 contrast)
    textMuted: '#423330',           // Deep Sandalwood Slate (10.5:1 contrast)
    textFaint: '#5F4E4B',           // Refined Earth Ash (7.2:1 contrast)
    accent: '#946500',              // Rich Temple Zari Gold
    accentHover: '#7A5200',         // Deep Burnished Gold
    accentGlow: 'transparent',      // Zero digital glow
    highlight: '#7D1117',           // Deep Royal Khandua Crimson Red (10.4:1 contrast)
  },
  fonts: {
    displayFamily: 'var(--font-marcellus)',
    bodyFamily: 'var(--font-tenor-sans)',
    odiaDisplayFamily: 'var(--font-odia-serif)',
    odiaBodyFamily: 'var(--font-odia-sans)',
  },
};
