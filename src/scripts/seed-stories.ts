/**
 * Deepak Photo Films - Standalone Editorial Blog Stories Seeder
 * =============================================================
 * Populates MongoDB with rich real wedding features, Odia traditions guides,
 * and film journals with bilingual English/Odia text and image galleries.
 */

import mongoose from 'mongoose';
import { BlogStory, IBlogStory } from '../models/BlogStory';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deepak_photo_films';

export const initialBlogStories: Partial<IBlogStory>[] = [
  {
    slug: 'puri-khandua-silk-heritage-wedding',
    titleEn: 'A Khandua Silk Wedding at the Sacred Mandap of Puri',
    titleOr: 'ପୁରୀର ପବିତ୍ର ବେଦୀରେ ଖଣ୍ଡୁଆ ପାଟର ଐତିହ୍ୟ ବିବାହ',
    excerptEn: 'Deep red Khandua Pata silk, authentic Vedic chants, and sea-breeze ceremonies documented with 35mm film discipline.',
    excerptOr: 'ଗାଢ଼ ଲାଲ୍ ଖଣ୍ଡୁଆ ପାଟ, ପବିତ୍ର ବେଦୀ ମନ୍ତ୍ର ଓ ସମୁଦ୍ର ପବନରେ ଅନୁଷ୍ଠିତ ଏକ ହୃଦୟସ୍ପର୍ଶୀ ବିବାହ କାହାଣୀ।',
    contentEn: `In the temple town of Puri, Ananya and Siddharth came together for a traditional two-day celebration steeped in generational Odia customs.

The morning commenced with the Mangala Krutya and Haldi ceremonies, where close aunts and grandmothers anointed the bride with fresh turmeric paste from Sambalpur. Ananya wore a heritage Khandua Pata saree woven with sacred Jayadeva verses—a gift passed down from her maternal grandmother.

Rather than intrusive flashes or artificial staging, our 3-artist Cuttack team observed quietly with natural primes and 35mm Kodak Portra film. Every unscripted laugh, the delicate touch of Alta on Ananya’s feet, and the rhythmic sound of conch shells (Sankha Dhwani) were preserved just as they happened.

At sunset, Siddharth arrived with a vibrant Baraat moving along the sea-facing avenue. The sacred Hastaganthi and Saptapadi vows by the holy Agni fire took place under a jasmine-canopied mandap. When the Vidaai came in the early hours of dawn, there was not a dry eye in the courtyard. These are the moments we cherish documenting—honest, deep, and forever timeless.`,
    contentOr: `ପୁରୀର ପବିତ୍ର ବାତାବରଣରେ ଅନନ୍ୟା ଓ ସିଦ୍ଧାର୍ଥଙ୍କ ଦୁଇ ଦିନିଆ ପାରମ୍ପରିକ ବିବାହ ଅତ୍ୟନ୍ତ ଆନନ୍ଦ ଓ ଭାବପୂର୍ଣ୍ଣ ମାହୋଲରେ ସମ୍ପନ୍ନ ହୋଇଥିଲା।

ସକାଳେ ହଳଦୀ ଉତ୍ସବରୁ ଆରମ୍ଭ ହୋଇଥିବା ରୀତିନୀତିରେ ଅନନ୍ୟା ତାଙ୍କ ଆଇଙ୍କ ହାତତିଆରି ଐତିହ୍ୟ ଖଣ୍ଡୁଆ ପାଟ ଶାଢ଼ି ପରିଧାନ କରିଥିଲେ। ଆମ କଟକ ଟିମ୍ କୌଣସି ଅପ୍ରାକୃତିକ ପୋଜ୍ ନନେଇ ପ୍ରତ୍ୟେକ ପ୍ରାକୃତିକ ମୁହୂର୍ତ୍ତ, ଶଙ୍ଖ ଧ୍ୱନି ଓ ଅଳତା ଶୃଙ୍ଗାରକୁ କ୍ୟାମେରାରେ ସାଇତି ରଖିଥିଲେ।

ସନ୍ଧ୍ୟାରେ ବିଶାଳ ବରଯାତ୍ରୀ ସହ ବେଦୀର ସପ୍ତପଦୀ ଓ ସିନ୍ଦୂର ଦାନ କାର୍ଯ୍ୟ ସମାପ୍ତ ହୋଇଥିଲା। ପାହାନ୍ତା ସମୟରେ କନ୍ୟା ବିଦାୟର ସେହି କୋହଭରା ମୁହୂର୍ତ୍ତ ସମସ୍ତଙ୍କ ଆଖିରେ ଲୁହ ଭରିଦେଇଥିଲା। ଏହି ସ୍ମୃତିକୁ ଫଟୋ ଓ 4K ସିନେମାରେ ଜୀବନ୍ତ ରଖିବା ହିଁ ଆମର ପ୍ରକୃତ ଉଦ୍ଦେଶ୍ୟ।`,
    category: 'real_wedding',
    coupleNames: 'Ananya & Siddharth',
    city: 'Puri',
    venueName: 'Mayfair Waves Heritage Lawn, Puri',
    weddingDate: new Date('2025-02-14'),
    coverImage: '/assets/images/Landing.png',
    galleryImages: [
      {
        url: '/assets/images/Landing.png',
        captionEn: 'The bride in heirloom Khandua Pata silk with traditional silver filigree headpiece',
        captionOr: 'ପାରମ୍ପରିକ ଖଣ୍ଡୁଆ ପାଟ ଓ ରୂପା ତାରାକସି ଗହଣାରେ କନ୍ୟା',
        aspect: 'portrait',
        filmStock: '35mm Kodak Portra 400',
      },
      {
        url: '/assets/images/Landing.png',
        captionEn: 'Sacred Agni circumambulation during the seven Vedic vows',
        captionOr: 'ବେଦୀରେ ପବିତ୍ର ଅଗ୍ନି ପ୍ରଦକ୍ଷିଣ ଓ ସପ୍ତପଦୀ',
        aspect: 'landscape',
        filmStock: 'Natural Available Mandap Light',
      },
      {
        url: '/assets/images/Landing.png',
        captionEn: 'Emotional morning Vidaai moments in the ancestral courtyard',
        captionOr: 'ପାରମ୍ପରିକ ଅଗଣାରେ ଭାବପୂର୍ଣ୍ଣ କନ୍ୟା ବିଦାୟ ମୁହୂର୍ତ୍ତ',
        aspect: 'portrait',
        filmStock: 'Kodak Tri-X 400 Monochrome',
      },
    ],
    filmUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    vendorCredits: {
      planner: 'Odisha Heritage Events',
      venue: 'Mayfair Waves Puri',
      outfits: 'Boyanika & Nuapatna Master Weavers',
      makeup: 'Rupkatha Bridal Artistry Cuttack',
      decor: 'Mandap Vows Puri',
    },
    seoKeywords: ['puri wedding photography', 'khandua silk odia bride', 'mayfair puri wedding', 'odia wedding rituals'],
    metaTitle: 'Puri Heritage Wedding | Ananya & Siddharth | Deepak Photo Films',
    metaDescription: 'Discover Ananya & Siddharth’s coastal Odia wedding in Puri documented with documentary reverence by Deepak Photo Films.',
    isPublished: true,
    publishedAt: new Date('2025-02-20'),
  },
  {
    slug: 'cuttack-mahanadi-riverfront-wedding',
    titleEn: 'Riverfront Grandeur: Royal Baraat and Vedic Vows in Cuttack',
    titleOr: 'କଟକ ମହାନଦୀ କୂଳରେ ରାଜକୀୟ ବରଯାତ୍ରୀ ଓ ବୈଦିକ ବିବାହ',
    excerptEn: 'Historic Silver City celebrations with high-energy family dancing, silver filigree craft, and riverside mandap rituals.',
    excerptOr: 'କଟକର ତାରାକସି କଳା, ମହାନଦୀ କୂଳର ସନ୍ଧ୍ୟା ବେଦୀ ଓ ଉତ୍ସାହଭରା ବରଯାତ୍ରୀର ସୁନ୍ଦର କାହାଣୀ।',
    contentEn: `Cuttack, the ancient Millenium City of Odisha, possesses an unmistakable charm when it comes to weddings.

Priyanka and Rahul celebrated their union on the banks of the Mahanadi river. The groom’s Baraat featured historic brass trumpets and three generations of family members dancing together through the illuminated gates.

Deepak Photo Films captured the grand scale using dual cinematic cameras and multi-track audio recording. The couple exchanged silver rings handcrafted by traditional Cuttack Chandi Tarakasi artisans. The full documentary film preserves the heartfelt speeches given by Rahul’s grandfather—an audio memory the family now treasures above all else.`,
    contentOr: `ହଜାରେ ବର୍ଷର ଐତିହ୍ୟ ସହର କଟକର ମହାନଦୀ କୂଳରେ ପ୍ରିୟଙ୍କା ଓ ରାହୁଲଙ୍କ ବିବାହ ଅନୁଷ୍ଠିତ ହୋଇଥିଲା।

କଟକର ପ୍ରସିଦ୍ଧ ତାରାକସି ରୂପା ଅଳଙ୍କାର ଓ ପାରମ୍ପରିକ ପିତଳ ବାଜା ସହ ବରଯାତ୍ରୀ ପ୍ରବେଶ କରିଥିଲା। ଦୀପକ ଫଟୋ ଫିଲ୍ମସ୍‌ର ଦୁଇଜଣ ସିନେମାଟୋଗ୍ରାଫର୍ ସମ୍ପୂର୍ଣ୍ଣ କାର୍ଯ୍ୟକ୍ରମକୁ 4K କ୍ୱାଲିଟିରେ ଚିତ୍ରାୟନ କରିଥିଲେ। ରାହୁଲଙ୍କ ଜେଜେବାପାଙ୍କ ଆଶୀର୍ବାଦ ଓ ଭାବପୂର୍ଣ୍ଣ ଭାଷଣକୁ ଆମେ ସ୍ୱଚ୍ଛ ଅଡିଓ ସହ ରେକର୍ଡ କରିଥିଲୁ, ଯାହା ପରିବାର ପାଇଁ ଚିରକାଳ ସାଇତା ହୋଇ ରହିବ।`,
    category: 'real_wedding',
    coupleNames: 'Priyanka & Rahul',
    city: 'Cuttack',
    venueName: 'Mahanadi Riverfront Lawns, Cuttack',
    weddingDate: new Date('2025-01-28'),
    coverImage: '/assets/images/Landing.png',
    galleryImages: [
      {
        url: '/assets/images/Landing.png',
        captionEn: 'Groom entry with traditional brass music in Cuttack',
        captionOr: 'ବାଜା-ରୋଶଣୀ ସହ କଟକରେ ବର ପ୍ରବେଶ',
        aspect: 'landscape',
        filmStock: 'Cinematic 4K Stills',
      },
      {
        url: '/assets/images/Landing.png',
        captionEn: 'Cuttack Chandi silver filigree rings exchange',
        captionOr: 'କଟକର ପ୍ରସିଦ୍ଧ ରୂପା ତାରାକସି ମୁଦି ଅଦଳବଦଳ',
        aspect: 'portrait',
        filmStock: 'Macro 90mm Prime',
      },
    ],
    filmUrl: '',
    vendorCredits: {
      planner: 'Silver City Weddings',
      venue: 'Mahanadi Lawns Cuttack',
      makeup: 'Aura Styling Studio',
    },
    seoKeywords: ['cuttack wedding photography', 'mahanadi riverfront wedding', 'silver city wedding films'],
    metaTitle: 'Cuttack Riverfront Wedding | Priyanka & Rahul | Deepak Photo Films',
    metaDescription: 'Explore the high-energy Cuttack wedding of Priyanka and Rahul documented by Deepak Photo Films.',
    isPublished: true,
    publishedAt: new Date('2025-02-05'),
  },
  {
    slug: 'odia-vedic-wedding-rituals-guide',
    titleEn: 'Sacred Steps: An Editorial Guide to Odia Wedding Traditions',
    titleOr: 'ପବିତ୍ର ପରମ୍ପରା: ଓଡ଼ିଆ ବିବାହ ରୀତିନୀତିର ଏକ ସମ୍ପୂର୍ଣ୍ଣ ଗାଇଡ୍',
    excerptEn: 'From Mangala Krutya and Hastaganthi to Saptapadi and tearful Vidaai: how each ceremony unfolds and how we document it.',
    excerptOr: 'ମଙ୍ଗଳକୃତ୍ୟ, ବରଯାତ୍ରୀ, ହସ୍ତଗଣ୍ଠି, ସପ୍ତପଦୀ ଓ କନ୍ୟା ବିଦାୟ ପର୍ଯ୍ୟନ୍ତ ସମସ୍ତ ବୈଦିକ ରୀତିନୀତିର ବିବରଣୀ।',
    contentEn: `Odia weddings are characterized by deep spiritual reverence, quiet dignity, and heartfelt familial bonds.

1. Mangala Krutya & Haldi: At dawn, family elders gather to anoint bride and groom with turmeric and sandalwood. We capture the gentle touch of grandmothers and the joyous banter of cousins.

2. Rajbhesha & Baraat: The groom wears regal dhoti and chadar, accompanied by traditional brass bands and percussion.

3. Hastaganthi & Saptapadi: The holy knot is tied with sacred kusha grass, followed by seven steps around the Vedic fire (Agni). Our team stays unobtrusive, using prime lenses without flashing in the priest’s eyes.

4. Vidaai: The tearful send-off at dawn. We preserve the quiet embraces, maternal tears, and warm blessings that make Odia weddings unforgettable.`,
    contentOr: `ଓଡ଼ିଆ ବିବାହ ଏହାର ଗଭୀର ଆଧ୍ୟାତ୍ମିକତା, ଶାନ୍ତ ପରିବେଶ ଓ ପାରିବାରିକ ସ୍ନେହ ପାଇଁ ଅତୁଳନୀୟ।

୧. ମଙ୍ଗଳକୃତ୍ୟ ଓ ହଳଦୀ: ସକାଳୁ ପରିବାରର ବଡ଼ମାନେ ହଳଦୀ ଓ ଚନ୍ଦନ ଲଗାଇ ବର ଓ କନ୍ୟାଙ୍କୁ ଆଶୀର୍ବାଦ କରନ୍ତି।

୨. ରାଜବେଶ ଓ ବରଯାତ୍ରୀ: ବର ପାରମ୍ପରିକ ରାଜବେଶ ପରିଧାନ କରି ବାଜା-ରୋଶଣୀ ସହ ମଣ୍ଡପକୁ ପ୍ରବେଶ କରନ୍ତି।

୩. ହସ୍ତଗଣ୍ଠି ଓ ସପ୍ତପଦୀ: କୁଶ ଘାସ ଓ ମନ୍ତ୍ରୋଚ୍ଚାରଣ ସହ ହସ୍ତଗଣ୍ଠି ବନ୍ଧାଯାଏ ଏବଂ ଅଗ୍ନି ଚାରିପାଖରେ ସପ୍ତପଦୀ ସମ୍ପନ୍ନ ହୁଏ।

୪. କନ୍ୟା ବିଦାୟ: ପାହାନ୍ତା ସମୟରେ ପରିବାର ଠାରୁ କନ୍ୟାର ଭାବବିହ୍ୱଳ ବିଦାୟ—ଏହି ଅସଲି ଭାବନାକୁ ଆମେ କ୍ୟାମେରାରେ ସାଇତି ରଖୁ।`,
    category: 'traditions_guide',
    city: 'Bhubaneswar & Cuttack',
    weddingDate: new Date('2025-01-10'),
    coverImage: '/assets/images/Landing.png',
    galleryImages: [
      {
        url: '/assets/images/Landing.png',
        captionEn: 'Vedic priest chanting sacred hymns before the sacred mandap Agni fire',
        captionOr: 'ବେଦୀରେ ପବିତ୍ର ଅଗ୍ନି ସମ୍ମୁଖରେ ବ୍ରାହ୍ମଣଙ୍କ ବୈଦିକ ମନ୍ତ୍ରୋଚ୍ଚାରଣ',
        aspect: 'landscape',
        filmStock: 'Available Mandap Light',
      },
    ],
    seoKeywords: ['odia wedding traditions guide', 'odia wedding rituals list', 'saptapadi hastaganthi odia wedding'],
    metaTitle: 'Odia Wedding Rituals Guide | Deepak Photo Films',
    metaDescription: 'A complete visual guide to authentic Odia wedding ceremonies from Mangala Krutya to sacred Vidaai.',
    isPublished: true,
    publishedAt: new Date('2025-01-15'),
  },
  {
    slug: 'konark-marine-drive-pre-wedding-journal',
    titleEn: 'Coastline Reverie: 35mm Pre-Wedding Film along Konark Marine Drive',
    titleOr: 'ଉପକୂଳ କାହାଣୀ: କୋଣାର୍କ ମେରାଇନ୍ ଡ୍ରାଇଭ୍‌ରେ ୩୫mm ପ୍ରି-ୱେଡିଂ ସୁଟ୍',
    excerptEn: 'Golden hour breezes, Casuarina groves, and timeless ocean silhouettes captured on analog film rolls.',
    excerptOr: 'ଝାଉଁ ବଣ, ସୁନେଲୀ ବେଳାଭୂମି ଓ ସମୁଦ୍ର ଢେଉ ସହ ୩୫mm ଆନାଲଗ୍ ଫିଲ୍ମରେ ପ୍ରି-ୱେଡିଂ କାହାଣୀ।',
    contentEn: `Along the picturesque stretch between Puri and Konark, Sneha and Aditya spent a relaxed winter afternoon capturing their pre-wedding moments.

We chose two distinct settings: the quiet Casuarina groves near Ramachandi where soft, filtered light created painterly portraits, followed by the sweeping sands of Chandrabhaga beach during golden hour.

Shooting primarily on Kodak Portra 400 with a manual 50mm prime, we focused on genuine laughter, spontaneous walks along the surf, and quiet conversations. The result is a timeless set of photographs and a 60-second 4K cinema reel that feels poetic and honest.`,
    contentOr: `ପୁରୀ ଓ କୋଣାର୍କ ମଝିରେ ଥିବା ମନୋରମ ମେରାଇନ୍ ଡ୍ରାଇଭ୍ ରାସ୍ତାରେ ସ୍ନେହା ଓ ଆଦିତ୍ୟଙ୍କ ଏକ ସୁନ୍ଦର ପ୍ରି-ୱେଡିଂ ସୁଟ୍ ସମ୍ପନ୍ନ ହୋଇଥିଲା।

ରାମଚଣ୍ଡୀ ପାଖ ଝାଉଁ ବଣ ଓ ଚନ୍ଦ୍ରଭାଗା ବେଳାଭୂମିର ସୂର୍ଯ୍ୟାସ୍ତ ସମୟରେ ଆମେ କୋଡାକ୍ ୩୫mm ଫିଲ୍ମ ଓ 4K ସିନେମା କ୍ୟାମେରା ବ୍ୟବହାର କରିଥିଲୁ। କୌଣସି ଅପ୍ରାକୃତିକ ପୋଜ୍ ନଦେଇ ସେମାନଙ୍କ ସ୍ୱାଭାବିକ ପ୍ରେମ ଓ ଆନନ୍ଦକୁ ଆମେ କ୍ୟାମେରାରେ ସାଇତି ରଖିଛୁ।`,
    category: 'film_journal',
    coupleNames: 'Sneha & Aditya',
    city: 'Konark & Puri',
    venueName: 'Chandrabhaga & Ramachandi Beach',
    weddingDate: new Date('2025-01-05'),
    coverImage: '/assets/images/Landing.png',
    galleryImages: [
      {
        url: '/assets/images/Landing.png',
        captionEn: 'Golden hour silhouette against the Bay of Bengal waves at Chandrabhaga',
        captionOr: 'ଚନ୍ଦ୍ରଭାଗା ସମୁଦ୍ରକୂଳରେ ସୂର୍ଯ୍ୟାସ୍ତର ସୁନ୍ଦର କପଲ୍ ସିଲୁଏଟ୍',
        aspect: 'landscape',
        filmStock: 'Kodak Portra 400',
      },
    ],
    seoKeywords: ['konark marine drive photoshoot', 'puri couple pre wedding', 'odia couple photography'],
    metaTitle: 'Konark Marine Drive Pre-Wedding Story | Deepak Photo Films',
    metaDescription: 'Relive Sneha & Aditya’s romantic coastal pre-wedding session along Konark Marine Drive and Chandrabhaga beach.',
    isPublished: true,
    publishedAt: new Date('2025-01-12'),
  },
];

export async function seedStories(disconnectOnFinish = true) {
  if (mongoose.connection.readyState === 0) {
    console.log('[Seed:Stories] Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
  }

  try {
    for (const story of initialBlogStories) {
      await BlogStory.findOneAndUpdate(
        { slug: story.slug },
        { $set: story },
        { upsert: true, new: true }
      );
      console.log(`[Seed:Stories] Upserted blog story: ${story.slug}`);
    }
    console.log('[Seed:Stories] Successfully seeded all blog stories with bilingual Odia/English data!');
  } finally {
    if (disconnectOnFinish) {
      await mongoose.disconnect();
      console.log('[Seed:Stories] Disconnected.');
    }
  }
}

if (require.main === module) {
  seedStories().catch((err) => {
    console.error('[Seed:Stories] Error:', err);
    process.exit(1);
  });
}
