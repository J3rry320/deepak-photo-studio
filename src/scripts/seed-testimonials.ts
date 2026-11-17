/**
 * Deepak Photo Films - Standalone Testimonials Seeder
 * ======================================================
 * Populates MongoDB with verified couple reviews, heritage ratings,
 * and bilingual Odia/English quotes.
 */

import mongoose from 'mongoose';
import { Testimonial, ITestimonial } from '../models/Testimonial';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deepak_photo_films';

export const initialTestimonials: Partial<ITestimonial>[] = [
  {
    coupleNames: 'Ananya & Siddharth',
    weddingLocation: 'Puri Heritage Beach Resort',
    weddingYear: '2025',
    quoteEn:
      'When our wedding video arrived, our entire family sat together and cried happy tears. Deepak and his team didn’t just take pictures—they captured how joyful and emotional that day truly was.',
    quoteOr:
      'ଯେତେବେଳେ ଆମ ବିବାହ ଭିଡିଓ ଆସିଲା, ଆମ ପୂରା ପରିବାର ଏକାଠି ବସି ଖୁସିରେ କାନ୍ଦିପକାଇଲେ। ଦୀପକ ଓ ତାଙ୍କ ଟିମ୍ କେବଳ ଫଟୋ ଉଠାଇ ନାହାନ୍ତି, ସେହି ଦିନର ପ୍ରକୃତ ଭାବନାକୁ ଜୀବନ୍ତ କରିଦେଇଛନ୍ତି।',
    rating: 5,
    featuredOnHome: true,
    sortOrder: 1,
  },
  {
    coupleNames: 'Priyanka & Rahul',
    weddingLocation: 'Bhubaneswar Mandap',
    weddingYear: '2025',
    quoteEn:
      'Our parents were so pleased with how polite and respectful the photographers were during the Mandap rituals. They never blocked the sacred fire or asked us to freeze for fake smiles.',
    quoteOr:
      'ବେଦୀ କର୍ମ ସମୟରେ ଫଟୋଗ୍ରାଫରମାନଙ୍କ ଭଦ୍ର ବ୍ୟବହାର ଓ ସମ୍ମାନ ଦେଖି ଆମ ବାପା-ମାଆ ବହୁତ ଖୁସି ହୋଇଥିଲେ। ସେମାନେ କେବେ ବି ମନ୍ତ୍ରୋଚ୍ଚାରଣରେ ବାଧା ସୃଷ୍ଟି କରିନଥିଲେ।',
    rating: 5,
    featuredOnHome: true,
    sortOrder: 2,
  },
  {
    coupleNames: 'Sneha & Aditya',
    weddingLocation: 'Cuttack Heritage Palace',
    weddingYear: '2024',
    quoteEn:
      'The printed album is breathtaking. The 250 GSM Fuji paper and wooden box feel like a royal heirloom our children will admire decades from now.',
    quoteOr:
      'ପ୍ରିଣ୍ଟ୍ ଆଲବମ୍ ଅତ୍ୟନ୍ତ ସୁନ୍ଦର ହୋଇଛି। କାଠ ବକ୍ସ ଓ ପ୍ରିମିୟମ୍ ପେପର୍ ଆଗାମୀ ପିଢ଼ି ପାଇଁ ଏକ ଅମୂଲ୍ୟ ସମ୍ପତ୍ତି ଭଳି ଲାଗୁଛି।',
    rating: 5,
    featuredOnHome: true,
    sortOrder: 3,
  },
  {
    coupleNames: 'Subhashree & Debashis',
    weddingLocation: 'Mayfair Lagoon, Bhubaneswar',
    weddingYear: '2025',
    quoteEn:
      'From our misty morning pre-wedding by the Mahanadi river to the late-night Vedic Sindoor Daan, the team worked tirelessly without losing their warm smile. Truly the best wedding cinematographers in Odisha.',
    quoteOr:
      'ମହାନଦୀ କୂଳରେ ସକାଳର ପ୍ରି-ୱେଡିଂ ସୁଟ୍ ଠାରୁ ଆରମ୍ଭ କରି ବେଦୀରେ ରାତି ଅଧର ସିନ୍ଦୂର ଦାନ ପର୍ଯ୍ୟନ୍ତ, ଟିମ୍ ବିନା କ୍ଳାନ୍ତିରେ ଅତି ଆନ୍ତରିକତାର ସହ କାମ କରିଥିଲେ। ପ୍ରକୃତରେ ଓଡ଼ିଶାର ଶ୍ରେଷ୍ଠ ୱେଡିଂ ସିନେମାଟୋଗ୍ରାଫର୍।',
    rating: 5,
    featuredOnHome: true,
    sortOrder: 4,
  },
  {
    coupleNames: 'Itishree & Manas',
    weddingLocation: 'Puri Blue Flag Beach Mandap',
    weddingYear: '2024',
    quoteEn:
      'The teaser reel had over 100k views within 48 hours! But beyond the viral aesthetics, the full documentary film brought back every prayer whispered by my grandmother. Priceless heirloom memories.',
    quoteOr:
      'ଆମ ୱେଡିଂ ଟିଜର୍ ରିଲ୍ ୪୮ ଘଣ୍ଟା ମଧ୍ୟରେ ୧ ଲକ୍ଷରୁ ଅଧିକ ଲୋକ ଦେଖିଥିଲେ! କିନ୍ତୁ କେବଳ ସୋସିଆଲ୍ ମିଡିଆ ନୁହେଁ, ସମ୍ପୂର୍ଣ୍ଣ ଡକ୍ୟୁମେଣ୍ଟାରୀ ଫିଲ୍ମରେ ଜେଜେମାଆଙ୍କ ପ୍ରାର୍ଥନା ସାଇତା ହୋଇ ରହିଛି। ଅମୂଲ୍ୟ ଉପହାର।',
    rating: 5,
    featuredOnHome: true,
    sortOrder: 5,
  },
];

export async function seedTestimonials(disconnectOnFinish = true) {
  if (mongoose.connection.readyState === 0) {
    console.log('[Seed:Testimonials] Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
  }

  try {
    for (const test of initialTestimonials) {
      await Testimonial.findOneAndUpdate(
        { coupleNames: test.coupleNames },
        { $set: test },
        { upsert: true, new: true }
      );
      console.log(`[Seed:Testimonials] Upserted review for couple: ${test.coupleNames}`);
    }
    console.log('[Seed:Testimonials] Successfully seeded all testimonials with bilingual Odia/English data!');
  } finally {
    if (disconnectOnFinish) {
      await mongoose.disconnect();
      console.log('[Seed:Testimonials] Disconnected.');
    }
  }
}

if (require.main === module) {
  seedTestimonials().catch((err) => {
    console.error('[Seed:Testimonials] Error:', err);
    process.exit(1);
  });
}
