/**
 * Deepak Photo Films - Master Database Seeder Orchestrator
 * ======================================================
 * Sequentially orchestrates modular seeders:
 *   1. Packages & Pricing Tiers (seed-packages.ts)
 *   2. Editorial Blog Stories (seed-stories.ts)
 *   3. Client Testimonials & Reviews (seed-testimonials.ts)
 *
 * NOTE: Portfolio visual media is compiled statically at build-time
 * from `src/config/landing-media.ts` (Option A Architecture), leaving
 * zero runtime database dependencies for wedding imagery.
 */

import mongoose from 'mongoose';
import { seedPackages } from './seed-packages';
import { seedStories } from './seed-stories';
import { seedTestimonials } from './seed-testimonials';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deepak_photo_films';

export async function runMasterSeed() {
  console.log('======================================================');
  console.log('📸 DEEPAK PHOTO FILMS — MASTER DATABASE SEEDER');
  console.log('======================================================');
  console.log(`[Master Seeder] Target URI: ${MONGODB_URI}`);

  try {
    if (mongoose.connection.readyState === 0) {
      console.log('[Master Seeder] Establishing MongoDB connection...');
      await mongoose.connect(MONGODB_URI);
      console.log('[Master Seeder] Connected to MongoDB successfully.\n');
    }

    // 1. Packages
    console.log('--- Step 1: Seeding Studio Wedding Packages ---');
    await seedPackages(false);
    console.log('✓ Packages & Tiers populated successfully.\n');

    // 2. Editorial Stories
    console.log('--- Step 2: Seeding Editorial Blog Stories ---');
    await seedStories(false);
    console.log('✓ Blog Stories populated successfully.\n');

    // 3. Testimonials
    console.log('--- Step 3: Seeding Client Testimonials ---');
    await seedTestimonials(false);
    console.log('✓ Testimonials populated successfully.\n');

    console.log('======================================================');
    console.log('🎉 MASTER SEED COMPLETED SUCCESSFULLY');
    console.log('All packages, blogs, and testimonials are synchronized with');
    console.log('authentic Odia (ଓଡ଼ିଆ) and English bilingual metadata.');
    console.log('======================================================');
  } catch (error) {
    console.error('❌ [Master Seeder] Fatal seeding error:', error);
    throw error;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('[Master Seeder] MongoDB connection closed cleanly.');
    }
  }
}

if (require.main === module) {
  runMasterSeed().catch((err) => {
    console.error('[Master Seeder] Process failed:', err);
    process.exit(1);
  });
}
