/**
 * Centralized Landing Page Media & Editorial Placeholders
 * ========================================================
 * Replace `src` values with your actual image or video paths
 * (e.g., '/assets/videos/mandap-film.mp4' or '/assets/images/bride.jpg').
 *
 * Supported aspect ratios: '21/9' | '16/9' | '3/2' | '4/3' | '1/1' | '4/5' | '9/16'
 * Supported types: 'image' | 'video'
 */

import { LocalizedPortfolioItem } from '@/lib/portfolio';
import { LocalizedPackage } from '@/types/service';
import { LocalizedTestimonial } from '@/lib/testimonials';

export type MediaType = 'image' | 'video';
export type AspectRatioToken = '21/9' | '16/9' | '3/2' | '4/3' | '1/1' | '4/5' | '9/16';

export interface MediaConfigSlot {
  id: string;
  type: MediaType;
  src: string;
  poster?: string;
  aspectRatio: AspectRatioToken;
  altEn: string;
  altOr: string;
  objectPosition?: string;
}

export const landingMediaConfig = {
  /**
   * Section 2: Works & Cinema Showcase
   * Includes a 21:9 widescreen highlight film, two 9:16 portrait reels,
   * and curated editorial stills.
   */
  works: {
    featuredCinema: {
      id: 'works-featured-cinema',
      type: 'video' as MediaType,
      src: '', // Replace with 16:9 or 21:9 4K wedding highlight film (.mp4)
      poster: '',
      aspectRatio: '21/9' as AspectRatioToken,
      altEn: 'Cinematic 4K Odia Wedding Highlight Film across Cuttack and Puri',
      altOr: 'କଟକ ଓ ପୁରୀରେ ସୁଟ୍ ହୋଇଥିବା 4K ଓଡ଼ିଆ ବାହାଘର ସିନେମା ଭିଡିଓ',
    },
    portraitReels: [
      {
        id: 'works-reel-1',
        type: 'video' as MediaType,
        src: '', // Replace with 9:16 vertical reel (.mp4)
        poster: '',
        aspectRatio: '9/16' as AspectRatioToken,
        altEn: 'Sacred Odia Bridal Khandua Pata & Alta Rituals Vertical Reel',
        altOr: 'ଖଣ୍ଡୁଆ ପାଟ ଓ କନ୍ୟା ଅଳତା ଶୃଙ୍ଗାର ଭର୍ଟିକାଲ୍ ଭିଡିଓ ରିଲ୍',
      },
      {
        id: 'works-reel-2',
        type: 'video' as MediaType,
        src: '', // Replace with 9:16 vertical reel (.mp4)
        poster: '',
        aspectRatio: '9/16' as AspectRatioToken,
        altEn: 'High-Energy Cuttack Groom Baraat & Mandap Vows Vertical Reel',
        altOr: 'କଟକ ବରଯାତ୍ରୀ ଓ ବେଦୀ ସପ୍ତପଦୀ ଭର୍ଟିକାଲ୍ ଭିଡିଓ ରିଲ୍',
      },
    ],
  },

  /**
   * Section 3: Studio Philosophy & Approach (#about)
   * Pairs a 9:16 portrait video with a 16:9 landscape frame + 3 pillar frames.
   */
  philosophy: {
    leadPortraitVideo: {
      id: 'philosophy-portrait-video',
      type: 'video' as MediaType,
      src: '', // Replace with 9:16 portrait video of candid rituals
      poster: '',
      aspectRatio: '9/16' as AspectRatioToken,
      altEn: 'Unobtrusive candid wedding documentary filming during Mandap rituals',
      altOr: 'ବେଦୀ ପୂଜା ସମୟରେ ଶାନ୍ତ ଓ ସ୍ୱାଭାବିକ ଫଟୋଗ୍ରାଫି',
    },
    secondaryLandscape: {
      id: 'philosophy-secondary-landscape',
      type: 'image' as MediaType,
      src: '', // Replace with 16:9 or 3:2 landscape photograph
      aspectRatio: '16/9' as AspectRatioToken,
      altEn: 'Warm natural skin tones and family emotions at an Odia wedding',
      altOr: 'ପରିବାରର ଅସଲି ହସଖୁସି ଓ ସ୍ୱାଭାବିକ ରଙ୍ଗର ବାହାଘର ଫଟୋ',
    },
    pillars: [
      {
        id: 'philosophy-pillar-1',
        type: 'image' as MediaType,
        src: '', // Replace with 16:10 or 3:2 landscape image
        aspectRatio: '16/10' as AspectRatioToken,
        altEn: 'Respectful coverage of family elders and sacred Vedic vows',
        altOr: 'ବଡ଼ମାନଙ୍କୁ ସମ୍ମାନ ଦେଇ ବେଦୀ ରୀତିନୀତିର ଚିତ୍ରାୟନ',
      },
      {
        id: 'philosophy-pillar-2',
        type: 'video' as MediaType,
        src: '', // Replace with 16:10 landscape 4K cinema clip
        aspectRatio: '16/10' as AspectRatioToken,
        altEn: 'True-to-life 35mm film tones and 4K wedding cinematography',
        altOr: 'ଅସଲି ରଙ୍ଗ ଓ 4K ସିନେମା ଭିଡିଓ କ୍ୱାଲିଟି',
      },
      {
        id: 'philosophy-pillar-3',
        type: 'image' as MediaType,
        src: '', // Replace with 16:10 landscape image of heirloom album
        aspectRatio: '16/10' as AspectRatioToken,
        altEn: 'Handcrafted flushmount leather wedding album in wooden vault box',
        altOr: 'କାଠ ବକ୍ସ ସହ ହାତତିଆରି ଲେଦର୍ ବାହାଘର ଆଲବମ୍',
      },
    ],
  },

  /**
   * Section 4: Packages & Transparent Rates (#investment)
   * Media overrides for each signature package + album showcase video/image.
   */
  rates: {
    packageMedia: {
      'complete-both-sides-wedding': {
        id: 'rate-complete-both-sides',
        type: 'video' as MediaType,
        src: '', // Replace with 16:9 landscape video or image
        aspectRatio: '16/9' as AspectRatioToken,
        altEn: 'Complete Both Sides Odia Wedding Photography & 4K Cinema',
        altOr: 'ବର ଓ କନ୍ୟା ଉଭୟ ପକ୍ଷ ସମ୍ପୂର୍ଣ୍ଣ ବାହାଘର ଫଟୋଗ୍ରାଫି ଓ 4K ସିନେମା',
      },
      'groom-side-wedding': {
        id: 'rate-groom-side',
        type: 'video' as MediaType,
        src: '', // Replace with 16:9 landscape Baraat video or image
        aspectRatio: '16/9' as AspectRatioToken,
        altEn: 'Groom Side Baraat Procession & Reception Cinema in Odisha',
        altOr: 'ବର ପକ୍ଷ ବରଯାତ୍ରୀ ଓ ରିସେପ୍ସନ୍ ସିନେମା କଭରେଜ୍',
      },
      'bride-side-wedding': {
        id: 'rate-bride-side',
        type: 'image' as MediaType,
        src: '', // Replace with 16:9 bridal image or video
        aspectRatio: '16/9' as AspectRatioToken,
        altEn: 'Bride Side Haldi, Khandua Silk Styling & Emotional Vidaai',
        altOr: 'କନ୍ୟା ପକ୍ଷ ହଳଦୀ, ଖଣ୍ଡୁଆ ପାଟ ଶୃଙ୍ଗାର ଓ ବିଦାୟ ମୁହୂର୍ତ୍ତ',
      },
      'pre-wedding-shoot': {
        id: 'rate-pre-wedding',
        type: 'video' as MediaType,
        src: '', // Replace with 16:9 pre-wedding couple video or image
        aspectRatio: '16/9' as AspectRatioToken,
        altEn: 'Pre-Wedding Couple Shoot along Puri & Konark Marine Drive',
        altOr: 'ପୁରୀ ଓ କୋଣାର୍କ ସମୁଦ୍ର କୂଳରେ ପ୍ରି-ୱେଡିଂ କପଲ୍ ସୁଟ୍',
      },
    } as Record<string, MediaConfigSlot>,
    albumShowcase: {
      id: 'rates-album-showcase',
      type: 'video' as MediaType,
      src: '', // Replace with 16:9 video/photo of flipping through printed album
      aspectRatio: '16/9' as AspectRatioToken,
      altEn: '250 GSM Fuji Archival Wedding Album & Pan-Odisha Doorstep Delivery',
      altOr: '୨୫୦ GSM ଫୁଜି ପେପର୍ ବାହାଘର ଆଲବମ୍ ଓ ସାରା ଓଡ଼ିଶାରେ ହୋମ୍ ଡେଲିଭରି',
    },
  },

  /**
   * Section 5: The 4-Step Process
   * Includes a 21:9 cinematic widescreen banner + optional step frames.
   */
  process: {
    cinematicBanner: {
      id: 'process-cinematic-banner',
      type: 'video' as MediaType,
      src: '', // Replace with 21:9 or 16:9 widescreen behind-the-scenes / editing film
      aspectRatio: '21/9' as AspectRatioToken,
      altEn: 'From capturing sacred vows in Odisha to handcrafting your wedding film and album',
      altOr: 'ବେଦୀ ସୁଟ୍ ଠାରୁ ଆରମ୍ଭ କରି ଆପଣଙ୍କ ଘରେ ଆଲବମ୍ ପହଞ୍ଚିବା ପର୍ଯ୍ୟନ୍ତ ଆମ କାମ',
    },
  },

  /**
   * Section 6: Couple & Family Testimonials
   * Portrait media slots paired alongside each review.
   */
  testimonials: {
    portraits: [
      {
        id: 'testimonial-portrait-1',
        type: 'image' as MediaType,
        src: '', // Replace with 4:5 couple portrait
        aspectRatio: '4/5' as AspectRatioToken,
        altEn: 'Ananya & Siddharth — Puri Wedding Portrait',
        altOr: 'ଅନନ୍ୟା ଓ ସିଦ୍ଧାର୍ଥ — ପୁରୀ ବାହାଘର ଫଟୋ',
      },
      {
        id: 'testimonial-portrait-2',
        type: 'image' as MediaType,
        src: '', // Replace with 4:5 couple portrait
        aspectRatio: '4/5' as AspectRatioToken,
        altEn: 'Priyanka & Rahul — Bhubaneswar Mandap Portrait',
        altOr: 'ପ୍ରିୟଙ୍କା ଓ ରାହୁଲ — ଭୁବନେଶ୍ୱର ବେଦୀ ଫଟୋ',
      },
      {
        id: 'testimonial-portrait-3',
        type: 'image' as MediaType,
        src: '', // Replace with 4:5 couple portrait
        aspectRatio: '4/5' as AspectRatioToken,
        altEn: 'Sneha & Aditya — Cuttack Wedding Portrait',
        altOr: 'ସ୍ନେହା ଓ ଆଦିତ୍ୟ — କଟକ ବାହାଘର ଫଟୋ',
      },
    ],
  },

  /**
   * Section 7: Date Inquiry (#inquire)
   * Calm portrait frame accompanying the booking form.
   */
  inquiry: {
    portrait: {
      id: 'inquiry-portrait',
      type: 'image' as MediaType,
      src: '', // Replace with 4:5 portrait photo or video
      aspectRatio: '4/5' as AspectRatioToken,
      altEn: 'Book Deepak Photo Films for your upcoming wedding in Odisha',
      altOr: 'ଆପଣଙ୍କ ବାହାଘର ପାଇଁ ଦୀପକ ଫଟୋ ଫିଲ୍ମସ୍ ବୁକ୍ କରନ୍ତୁ',
    },
  },

  /**
   * Section 8: Frequently Asked Questions (#faq)
   * Vertical 9:16 portrait video/image anchoring the left column.
   */
  faq: {
    portrait: {
      id: 'faq-portrait',
      type: 'video' as MediaType,
      src: '', // Replace with 9:16 vertical reel or 4:5 portrait image
      aspectRatio: '9/16' as AspectRatioToken,
      altEn: 'Candid Odia wedding moments by Deepak Photo Films Cuttack',
      altOr: 'ଦୀପକ ଫଟୋ ଫିଲ୍ମସ୍ କଟକ ଦ୍ୱାରା ସୁଟ୍ ହୋଇଥିବା ବାହାଘର ମୁହୂର୍ତ୍ତ',
    },
  },
};

export interface RawPortfolioConfigItem {
  id: string;
  titleEn: string;
  titleOr: string;
  category: 'mandap_rituals' | 'candid_portraiture' | 'twilight_celebration' | 'cinematic_reels' | 'analog_stills';
  aspect: 'portrait' | 'landscape' | 'square';
  src: string;
  filmStock: string;
  locationEn: string;
  locationOr: string;
  isFeatured: boolean;
  sortOrder: number;
}

export const staticPortfolioArchive: RawPortfolioConfigItem[] = [
  {
    id: 'work-mandap-1',
    titleEn: 'Sacred Vedic Mandap & Sindoor Daan in Puri',
    titleOr: 'ପୁରୀର ପବିତ୍ର ବେଦୀ ଓ ସିନ୍ଦୂର ଦାନ ମୁହୂର୍ତ୍ତ',
    category: 'mandap_rituals',
    aspect: 'landscape',
    src: '/assets/images/Landing.png',
    filmStock: 'Kodak Portra 400 Color Film',
    locationEn: 'Puri, Odisha',
    locationOr: 'ପୁରୀ, ଓଡ଼ିଶା',
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: 'work-mandap-2',
    titleEn: 'Saptapadi Sacred Agni Circumambulation',
    titleOr: 'ସପ୍ତପଦୀ ପବିତ୍ର ଅଗ୍ନି ପ୍ରଦକ୍ଷିଣ',
    category: 'mandap_rituals',
    aspect: 'landscape',
    src: '/assets/images/Landing.png',
    filmStock: 'Natural Available Mandap Light',
    locationEn: 'Sambalpur, Odisha',
    locationOr: 'ସମ୍ବଲପୁର, ଓଡ଼ିଶା',
    isFeatured: false,
    sortOrder: 2,
  },
  {
    id: 'work-mandap-3',
    titleEn: 'Hastaganthi & Seven Sacred Vows in Bhubaneswar',
    titleOr: 'ଭୁବନେଶ୍ୱରରେ ପବିତ୍ର ହସ୍ତଗଣ୍ଠି ଓ ବୈଦିକ ଶପଥ',
    category: 'mandap_rituals',
    aspect: 'portrait',
    src: '/assets/images/Landing.png',
    filmStock: 'Fuji 400H Color Palette',
    locationEn: 'Bhubaneswar, Odisha',
    locationOr: 'ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା',
    isFeatured: true,
    sortOrder: 3,
  },
  {
    id: 'work-portrait-1',
    titleEn: 'Candid Haldi Laughter & Khandua Silk Alta Details',
    titleOr: 'ହଳଦୀର ହସଖୁସି ଓ ଖଣ୍ଡୁଆ ପାଟ ଅଳତା ସାଜ',
    category: 'candid_portraiture',
    aspect: 'portrait',
    src: '/assets/images/Landing.png',
    filmStock: '35mm Prime Lens',
    locationEn: 'Cuttack, Odisha',
    locationOr: 'କଟକ, ଓଡ଼ିଶା',
    isFeatured: true,
    sortOrder: 4,
  },
  {
    id: 'work-portrait-2',
    titleEn: 'Bride Shringar & Silver Filigree Mathamani',
    titleOr: 'କଟକର ତାରାକସି ମଥାମଣି ଓ କନ୍ୟା ଶୃଙ୍ଗାର',
    category: 'candid_portraiture',
    aspect: 'portrait',
    src: '/assets/images/Landing.png',
    filmStock: 'Kodak Portra 160 Soft Skin Tone',
    locationEn: 'Cuttack, Odisha',
    locationOr: 'କଟକ, ଓଡ଼ିଶା',
    isFeatured: false,
    sortOrder: 5,
  },
  {
    id: 'work-portrait-3',
    titleEn: 'Quiet Maternal Blessing Before the Mandap',
    titleOr: 'ବେଦୀକୁ ଯିବା ପୂର୍ବରୁ ମାଆଙ୍କ ସ୍ନେହଭରା ଆଶୀର୍ବାଦ',
    category: 'candid_portraiture',
    aspect: 'landscape',
    src: '/assets/images/Landing.png',
    filmStock: '35mm Ambient Tones',
    locationEn: 'Angul, Odisha',
    locationOr: 'ଅନୁଗୁଳ, ଓଡ଼ିଶା',
    isFeatured: false,
    sortOrder: 6,
  },
  {
    id: 'work-celebration-1',
    titleEn: 'High-Energy Evening Baraat & Brass Band in Cuttack',
    titleOr: 'କଟକର ଉତ୍ସାହଭରା ବରଯାତ୍ରୀ ଓ ବାଜା-ରୋଶଣୀ',
    category: 'twilight_celebration',
    aspect: 'landscape',
    src: '/assets/images/Landing.png',
    filmStock: 'Cinematic 4K 60fps Prime',
    locationEn: 'Cuttack, Odisha',
    locationOr: 'କଟକ, ଓଡ଼ିଶା',
    isFeatured: true,
    sortOrder: 7,
  },
  {
    id: 'work-celebration-2',
    titleEn: 'Grand Reception Stage along the Mahanadi Riverfront',
    titleOr: 'ମହାନଦୀ କୂଳରେ ରାଜକୀୟ ରିସେପ୍ସନ୍ ସମାରୋହ',
    category: 'twilight_celebration',
    aspect: 'landscape',
    src: '/assets/images/Landing.png',
    filmStock: 'Low-light Prime Lens',
    locationEn: 'Cuttack, Odisha',
    locationOr: 'କଟକ, ଓଡ଼ିଶା',
    isFeatured: false,
    sortOrder: 8,
  },
  {
    id: 'work-celebration-3',
    titleEn: 'Family Folk Dance & Twilight Sparklers Celebration',
    titleOr: 'ସନ୍ଧ୍ୟା ଆତସବାଜି ଓ ପରିବାରର ଖୁସି ନୃତ୍ୟ',
    category: 'twilight_celebration',
    aspect: 'portrait',
    src: '/assets/images/Landing.png',
    filmStock: 'Cinematic Ambient Light',
    locationEn: 'Balasore, Odisha',
    locationOr: 'ବାଲେଶ୍ୱର, ଓଡ଼ିଶା',
    isFeatured: false,
    sortOrder: 9,
  },
  {
    id: 'work-reels-1',
    titleEn: 'Sunset Marine Drive Pre-Wedding Story along Konark',
    titleOr: 'କୋଣାର୍କ ମେରାଇନ୍ ଡ୍ରାଇଭ୍ ସୂର୍ଯ୍ୟାସ୍ତ କପଲ୍ କାହାଣୀ',
    category: 'cinematic_reels',
    aspect: 'landscape',
    src: '/assets/images/Landing.png',
    filmStock: '35mm Analog Prime & 4K Reel',
    locationEn: 'Konark Coastline, Odisha',
    locationOr: 'କୋଣାର୍କ, ଓଡ଼ିଶା',
    isFeatured: true,
    sortOrder: 10,
  },
  {
    id: 'work-reels-2',
    titleEn: 'Golden Hour Beach Stroll in Puri',
    titleOr: 'ପୁରୀ ସମୁଦ୍ରକୂଳରେ ଗୋଲ୍ଡେନ୍ ଆୱାର୍ କପଲ୍ ସୁଟ୍',
    category: 'cinematic_reels',
    aspect: 'portrait',
    src: '/assets/images/Landing.png',
    filmStock: '4K 60fps Drone & Prime',
    locationEn: 'Puri, Odisha',
    locationOr: 'ପୁରୀ, ଓଡ଼ିଶା',
    isFeatured: false,
    sortOrder: 11,
  },
  {
    id: 'work-reels-3',
    titleEn: 'Temple Heritage Shadows at Dhauli Peace Pagoda',
    titleOr: 'ଧଉଳି ଶାନ୍ତିସ୍ତୂପରେ ଐତିହ୍ୟ ଫଟୋଗ୍ରାଫି',
    category: 'cinematic_reels',
    aspect: 'portrait',
    src: '/assets/images/Landing.png',
    filmStock: 'Architectural Prime & 4K Reel',
    locationEn: 'Bhubaneswar, Odisha',
    locationOr: 'ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା',
    isFeatured: false,
    sortOrder: 12,
  },
  {
    id: 'work-analog-1',
    titleEn: 'Vintage 35mm Monochrome Vidaai Moment',
    titleOr: '୩୫mm ବ୍ଲାକ୍-ଆଣ୍ଡ-ହ୍ୱାଇଟ୍ କନ୍ୟା ବିଦାୟ ସ୍ମୃତି',
    category: 'analog_stills',
    aspect: 'portrait',
    src: '/assets/images/Landing.png',
    filmStock: 'Kodak Tri-X 400 Monochrome Film',
    locationEn: 'Jajpur, Odisha',
    locationOr: 'ଯାଜପୁର, ଓଡ଼ିଶା',
    isFeatured: true,
    sortOrder: 13,
  },
  {
    id: 'work-analog-2',
    titleEn: 'Grain & Silk: 35mm Kodak Portra Bridal Stills',
    titleOr: '୩୫mm କୋଡାକ୍ ପୋର୍ଟ୍ରାରେ କନ୍ୟା ପୋଟ୍ରେଟ୍',
    category: 'analog_stills',
    aspect: 'portrait',
    src: '/assets/images/Landing.png',
    filmStock: 'Kodak Portra 800 Natural Grain',
    locationEn: 'Puri, Odisha',
    locationOr: 'ପୁରୀ, ଓଡ଼ିଶା',
    isFeatured: false,
    sortOrder: 14,
  },
  {
    id: 'work-analog-3',
    titleEn: 'Analog Father-Daughter Tearful Embrace',
    titleOr: 'ବାପା ଓ ଝିଅଙ୍କ ଭାବବିହ୍ୱଳ ଆଲିଙ୍ଗନ',
    category: 'analog_stills',
    aspect: 'landscape',
    src: '/assets/images/Landing.png',
    filmStock: 'Ilford HP5 Plus Monochrome',
    locationEn: 'Rourkela, Odisha',
    locationOr: 'ରାଉରକେଲା, ଓଡ଼ିଶା',
    isFeatured: false,
    sortOrder: 15,
  },
];

/**
 * Fallback & Static Portfolio Items (Compiled statically from configuration)
 */
export function getFallbackPortfolioItems(locale: string = 'en'): LocalizedPortfolioItem[] {
  const isOr = locale === 'or';
  return staticPortfolioArchive.map((item) => {
    const aspect = item.aspect || 'portrait';
    const title = isOr ? item.titleOr : item.titleEn;
    const location = isOr ? item.locationOr : item.locationEn;
    const aspectRatio = aspect === 'landscape' ? '16/9' : aspect === 'square' ? '1/1' : '4/5';

    return {
      id: item.id,
      title,
      category: item.category,
      aspect,
      aspectRatio,
      src: item.src,
      filmStock: item.filmStock,
      location,
      descriptor: `${item.filmStock} • ${location}`,
      isFeatured: item.isFeatured,
      sortOrder: item.sortOrder,
    };
  });
}

/**
 * Fallback Packages (used when database is empty or offline)
 */
export function getFallbackPackages(locale: string = 'en'): LocalizedPackage[] {
  const isOr = locale === 'or';
  return [
    {
      slug: 'complete-both-sides-wedding',
      title: isOr
        ? 'ସମ୍ପୂର୍ଣ୍ଣ ବାହାଘର (ବର ଓ କନ୍ୟା ଉଭୟ ପକ୍ଷ)'
        : 'Complete Wedding (Both Sides Unified)',
      tagline: isOr
        ? 'ବର ଓ କନ୍ୟା ଉଭୟ ପରିବାରର ସବୁ ରୀତିନୀତି ପାଇଁ ଆମର ଗୋଟିଏ ଅଭିଜ୍ଞ ଟିମ୍।'
        : 'One unified senior crew covering both bride and groom celebrations seamlessly.',
      category: 'wedding',
      startingPrice: 110000,
      formattedStartingPrice: isOr ? '₹୧,୧୦,୦୦୦' : '₹1,10,000',
      startingPriceNote: isOr
        ? '୨ ଦିନର ସମ୍ପୂର୍ଣ୍ଣ କଭରେଜ୍ • ସାରା ଓଡ଼ିଶା'
        : 'Full 2-day coverage across Odisha',
      baseLocation: isOr ? 'କଟକ ଷ୍ଟୁଡିଓ' : 'Cuttack Studio Base',
      teamCrew: isOr ? '୪ ରୁ ୬ ଜଣିଆ ଟିମ୍' : '4 to 6 Dedicated Artists',
      travelNote: isOr ? 'ସାରା ଓଡ଼ିଶାରେ ଉପଲବ୍ଧ' : 'Available across all 30 districts of Odisha',
      duration: isOr ? '୨ ପୂରା ଦିନ' : '2 Full Days Coverage',
      features: [],
      deliverables: isOr
        ? [
            '୬୦୦+ ଏଡିଟ୍ ହୋଇଥିବା ହାଇ-ରେଜୋଲ୍ୟୁସନ୍ ଫଟୋ ଅନଲାଇନ୍ ଗ୍ୟାଲେରୀ ସହ',
            '୪–୬ ମିନିଟ୍‌ର 4K ସିନେମାଟିକ୍ ହାଇଲାଇଟ୍ ଟ୍ରେଲର୍ ଓ ପୂରା ବାହାଘର ଭିଡିଓ',
            'ବର ଓ କନ୍ୟା ଉଭୟ ଘରର ହଳଦୀ, ବରଯାତ୍ରୀ ଓ ବେଦୀର ଏକକାଳୀନ ସୁଟ୍',
            'କାଠ ବକ୍ସ ସହ ୪୦ ପୃଷ୍ଠାର ପ୍ରିମିୟମ୍ ହାତତିଆରି ଲେଦର୍ ଆଲବମ୍',
          ]
        : [
            '600+ hand-edited photographs delivered via private cloud gallery',
            '4–6 minute 4K cinematic highlight trailer & full documentary film',
            'Simultaneous coverage of bride preparation, Haldi, Baraat & Mandap vows',
            'Master 40-page handcrafted leather album in a solid wooden vault box',
          ],
      tiers: [],
      ritualsCovered: [],
      addOns: [],
      printAndDeliverySupport: {
        title: '',
        description: '',
        items: [],
      },
      faqs: [],
      seo: { metaTitle: '', metaDescription: '', keywords: [] },
      media: {
        src: landingMediaConfig.rates.packageMedia['complete-both-sides-wedding'].src,
        aspectRatio: '16/9',
        label: '',
        descriptor: '',
      },
      isPopular: true,
      displayOrder: 1,
    },
    {
      slug: 'groom-side-wedding',
      title: isOr
        ? 'ବର ପକ୍ଷ ବାହାଘର ଫଟୋଗ୍ରାଫି ଓ 4K ସିନେମା'
        : 'Groom Side Wedding Photography & Cinema',
      tagline: isOr
        ? 'ବର ହଳଦୀ, ଧୁମ୍‌ଧାମ୍ ବରଯାତ୍ରୀ, ବେଦୀ ଓ ରିସେପ୍ସନ୍‌ର ସମ୍ପୂର୍ଣ୍ଣ ସୁଟ୍।'
        : 'High-energy Baraat processions, groom rituals, Mandap vows, and reception coverage.',
      category: 'wedding',
      startingPrice: 70000,
      formattedStartingPrice: isOr ? '₹୭୦,୦୦୦' : '₹70,000',
      startingPriceNote: isOr
        ? 'ବର ହଳଦୀ, ବରଯାତ୍ରୀ, ବେଦୀ ଓ ରିସେପ୍ସନ୍'
        : 'Groom Haldi, Baraat, Mandap & Reception',
      baseLocation: isOr ? 'କଟକ ଷ୍ଟୁଡିଓ' : 'Cuttack Studio Base',
      teamCrew: isOr ? '୩ ଜଣିଆ ଟିମ୍' : '3 Dedicated Artists',
      travelNote: isOr ? 'ସାରା ଓଡ଼ିଶାରେ ଉପଲବ୍ଧ' : 'Available across Odisha',
      duration: isOr ? '୧.୫ ଦିନ' : '1.5 Days Coverage',
      features: [],
      deliverables: isOr
        ? [
            '୩୫୦+ ଏଡିଟ୍ ହୋଇଥିବା ସୁନ୍ଦର ଫଟୋ ଅନଲାଇନ୍ ଗ୍ୟାଲେରୀ ସହ',
            '୩–୫ ମିନିଟ୍‌ର 4K ସିନେମା ଟ୍ରେଲର୍ ଓ ପୂରା ରିସେପ୍ସନ୍ ଭିଡିଓ',
            'ଗିମ୍ବଲ୍ କ୍ୟାମେରାରେ ଉତ୍ସାହଭରା ବରଯାତ୍ରୀ ଓ ପରିବାର ଡ୍ୟାନ୍ସ କଭରେଜ୍',
            '୩୦ ପୃଷ୍ଠାର ପ୍ରିମିୟମ୍ ହାତତିଆରି ୱେଡିଂ ଆଲବମ୍',
          ]
        : [
            '350+ color-graded high-resolution photographs',
            '3–5 minute 4K cinematic highlight trailer & full ceremony film',
            'Dynamic gimbal cinematography for Baraat procession & family celebrations',
            '30-page handcrafted flushmount wedding album delivered home',
          ],
      tiers: [],
      ritualsCovered: [],
      addOns: [],
      printAndDeliverySupport: {
        title: '',
        description: '',
        items: [],
      },
      faqs: [],
      seo: { metaTitle: '', metaDescription: '', keywords: [] },
      media: {
        src: landingMediaConfig.rates.packageMedia['groom-side-wedding'].src,
        aspectRatio: '16/9',
        label: '',
        descriptor: '',
      },
      isPopular: false,
      displayOrder: 2,
    },
    {
      slug: 'bride-side-wedding',
      title: isOr
        ? 'କନ୍ୟା ପକ୍ଷ ବାହାଘର ଫଟୋଗ୍ରାଫି ଓ 4K ସିନେମା'
        : 'Bride Side Wedding Photography & Cinema',
      tagline: isOr
        ? 'ସକାଳ ହଳଦୀ, କନ୍ୟା ଶୃଙ୍ଗାର, ବେଦୀ ହସ୍ତଗଣ୍ଠି ଓ ଭାବପୂର୍ଣ୍ଣ ବିଦାୟର ସ୍ମୃତି।'
        : 'Intimate bridal preparation, Haldi, sacred Mandap rituals, and emotional Vidaai.',
      category: 'wedding',
      startingPrice: 50000,
      formattedStartingPrice: isOr ? '₹୫୦,୦୦୦' : '₹50,000',
      startingPriceNote: isOr
        ? 'ହଳଦୀ, କନ୍ୟା ଶୃଙ୍ଗାର, ବେଦୀ ଓ ବିଦାୟ'
        : 'Haldi, Bridal Portraits, Mandap & Vidaai',
      baseLocation: isOr ? 'କଟକ ଷ୍ଟୁଡିଓ' : 'Cuttack Studio Base',
      teamCrew: isOr ? '୩ ଜଣିଆ ଟିମ୍' : '3 Dedicated Artists',
      travelNote: isOr ? 'ସାରା ଓଡ଼ିଶାରେ ଉପଲବ୍ଧ' : 'Available across Odisha',
      duration: isOr ? '୧ ପୂରା ଦିନ' : '1 Full Day Coverage',
      features: [],
      deliverables: isOr
        ? [
            '୩୦୦+ ଏଡିଟ୍ ହୋଇଥିବା ଫଟୋ ଓ କନ୍ୟା ପୋଟ୍ରେଟ୍',
            '୩–୫ ମିନିଟ୍‌ର ଭାବପୂର୍ଣ୍ଣ 4K ସିନେମା ଟ୍ରେଲର୍ ଓ ପୂରା ଭିଡିଓ',
            'ଖଣ୍ଡୁଆ ପାଟ, ଅଳତା ଓ ଗହଣାର ସୂକ୍ଷ୍ମ କଳାତ୍ମକ ଫଟୋ',
            '୩୦ ପୃଷ୍ଠାର ପ୍ରିମିୟମ୍ ଲେଦର୍ ବନ୍ଧାଇ ୱେଡିଂ ଆଲବମ୍',
          ]
        : [
            '300+ hand-edited photographs capturing candid bridal & family moments',
            '3–5 minute emotional 4K cinematic highlight film & full ceremony video',
            'Detailed portraiture of Khandua Pata silk, Alta rituals, and heirloom jewelry',
            '30-page archival flushmount wedding book delivered to your doorstep',
          ],
      tiers: [],
      ritualsCovered: [],
      addOns: [],
      printAndDeliverySupport: {
        title: '',
        description: '',
        items: [],
      },
      faqs: [],
      seo: { metaTitle: '', metaDescription: '', keywords: [] },
      media: {
        src: landingMediaConfig.rates.packageMedia['bride-side-wedding'].src,
        aspectRatio: '4/5',
        label: '',
        descriptor: '',
      },
      isPopular: false,
      displayOrder: 3,
    },
    {
      slug: 'pre-wedding-shoot',
      title: isOr
        ? 'ପ୍ରି-ୱେଡିଂ କପଲ୍ ଫଟୋ ଓ ସିନେମା ସୁଟ୍'
        : 'Pre-Wedding Cinematic Couple Shoot',
      tagline: isOr
        ? 'ପୁରୀ ସମୁଦ୍ର କୂଳ, କୋଣାର୍କ ମେରାଇନ୍ ଡ୍ରାଇଭ୍ କିମ୍ବା ଆପଣଙ୍କ ପସନ୍ଦର ଜାଗାରେ ସୁନ୍ଦର କପଲ୍ ସୁଟ୍।'
        : 'Relaxed outdoor storytelling along Puri beaches, Konark Marine Drive, or heritage locales.',
      category: 'pre-wedding',
      startingPrice: 25000,
      formattedStartingPrice: isOr ? '₹୨୫,୦୦୦' : '₹25,000',
      startingPriceNote: isOr
        ? '୧ ଦିନ ଆଉଟଡୋର୍ ସୁଟ୍ • 4K ରିଲ୍ ସହ'
        : '1 Full Day Outdoor Shoot • 4K Reel Included',
      baseLocation: isOr ? 'କଟକ ଷ୍ଟୁଡିଓ' : 'Cuttack Studio Base',
      teamCrew: isOr ? '୨ ଜଣିଆ ଟିମ୍' : '2 Dedicated Artists',
      travelNote: isOr ? 'ପୁରୀ, କୋଣାର୍କ ଓ ଭୁବନେଶ୍ୱର' : 'Puri, Konark, Chilika & Bhubaneswar',
      duration: isOr ? 'ସୂର୍ଯ୍ୟୋଦୟରୁ ସୂର୍ଯ୍ୟାସ୍ତ' : 'Sunrise to Sunset (1 Day)',
      features: [],
      deliverables: isOr
        ? [
            '୪୦+ ସୁନ୍ଦର ଭାବେ ଏଡିଟ୍ ହୋଇଥିବା କପଲ୍ ଫଟୋ',
            '୬୦ ସେକେଣ୍ଡ୍‌ର 4K ରୋମାଣ୍ଟିକ୍ ଭିଡିଓ ରିଲ୍',
            'ଓଡ଼ିଶାର ୨ଟି ସୁନ୍ଦର ଆଉଟଡୋର୍ ଲୋକେସନ୍‌ରେ ସୁଟ୍',
            'ପୋଷାକ ଓ ଲୋକେସନ୍ ବାଛିବାରେ ଆମ ଟିମ୍‌ର ସମ୍ପୂର୍ଣ୍ଣ ସାହାଯ୍ୟ',
          ]
        : [
            '40+ professionally color-graded high-resolution couple portraits',
            '60-second 4K cinematic vertical reel for family & social sharing',
            '2 scenic outdoor locations of your choice across Odisha',
            'Outfit styling & golden-hour location planning with our team',
          ],
      tiers: [],
      ritualsCovered: [],
      addOns: [],
      printAndDeliverySupport: {
        title: '',
        description: '',
        items: [],
      },
      faqs: [],
      seo: { metaTitle: '', metaDescription: '', keywords: [] },
      media: {
        src: landingMediaConfig.rates.packageMedia['pre-wedding-shoot'].src,
        aspectRatio: '4/5',
        label: '',
        descriptor: '',
      },
      isPopular: false,
      displayOrder: 4,
    },
  ];
}

/**
 * Fallback Testimonials (used when database is empty or offline)
 */
export function getFallbackTestimonials(locale: string = 'en'): LocalizedTestimonial[] {
  const isOr = locale === 'or';
  return [
    {
      id: 'fallback-testimonial-1',
      coupleNames: isOr ? 'ଅନନ୍ୟା ଓ ସିଦ୍ଧାର୍ଥ' : 'Ananya & Siddharth',
      weddingLocation: isOr ? 'ପୁରୀ' : 'Puri',
      weddingYear: isOr ? '୨୦୨୫' : '2025',
      quote: isOr
        ? 'ଯେତେବେଳେ ଆମ ବାହାଘର ଭିଡିଓ ଆସିଲା, ଘରର ସମସ୍ତେ ଏକାଠି ବସି ଦେଖିলে ଆଉ ଖୁସିରେ ଆଖିରେ ଲୁହ ଆସିଗଲା। ଦୀପକ ଓ ତାଙ୍କ ଟିମ୍ କେବଳ ଫଟୋ ଉଠାଇ ନଥିଲେ, ସେଦିନର ସବୁ ଅସଲି ଖୁସିକୁ ସବୁଦିନ ପାଇଁ ବଞ୍ଚাই ଦେଲେ।'
        : 'When our wedding film arrived, our entire family sat together and cried happy tears. Deepak and his team didn’t just take pictures—they preserved how joyful and emotional that day truly felt.',
      rating: 5,
      featuredOnHome: true,
      sortOrder: 1,
    },
    {
      id: 'fallback-testimonial-2',
      coupleNames: isOr ? 'ପ୍ରିୟଙ୍କା ଓ ରାହୁଲ' : 'Priyanka & Rahul',
      weddingLocation: isOr ? 'ଭୁବନେଶ୍ୱର' : 'Bhubaneswar',
      weddingYear: isOr ? '୨୦୨୫' : '2025',
      quote: isOr
        ? 'ବେଦୀ ପୂଜା ସମୟରେ ଫଟୋଗ୍ରାଫରମାନଙ୍କ ଶାନ୍ତ ବ୍ୟବହାର ଦେଖି ଆମ ବାପା-ମାଆ ବହୁତ ଖୁସି ହୋଇଥିଲେ। ସେମାନେ ପୂଜା ମଝିରେ ଜମା ବାଧା ନଦେଇ ଏତେ ସୁନ୍ଦର ଫଟୋ ଉଠାଇଛନ୍ତି ଯେ ଦେଖିଲେ ଆଶ୍ଚର୍ଯ୍ୟ ଲାଗେ।'
        : 'Our parents were so pleased with how polite and respectful the team was during the Mandap rituals. They never interrupted the sacred vows or asked us to freeze for fake smiles.',
      rating: 5,
      featuredOnHome: true,
      sortOrder: 2,
    },
    {
      id: 'fallback-testimonial-3',
      coupleNames: isOr ? 'ସ୍ନେହା ଓ ଆଦିତ୍ୟ' : 'Sneha & Aditya',
      weddingLocation: isOr ? 'କଟକ' : 'Cuttack',
      weddingYear: isOr ? '୨୦୨୪' : '2024',
      quote: isOr
        ? 'ପ୍ରିଣ୍ଟ୍ ହୋଇ ଆସିଥିବା ଆଲବମ୍‌ଟି ସତରେ ବହୁତ ସୁନ୍ଦର ହୋଇଛି। କାଠ ବକ୍ସ ଓ ମୋଟା ଫୁଜି ପେପର୍‌ର କ୍ୱାଲିଟି ଏତେ ଭଲ ଯେ ଆମ ଘରକୁ ଯିଏ ଆସୁଛନ୍ତି ସମସ୍ତେ ପ୍ରଶଂସା କରୁଛନ୍ତି।'
        : 'The printed album is breathtaking. The 250 GSM Fuji paper and handcrafted wooden box feel like a true family heirloom that our children and grandchildren will admire.',
      rating: 5,
      featuredOnHome: true,
      sortOrder: 3,
    },
  ];
}
