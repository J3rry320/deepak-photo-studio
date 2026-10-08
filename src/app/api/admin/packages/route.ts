import { NextRequest, NextResponse } from 'next/server';
import { withAdminApi } from '@/lib/api/guard';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Package } from '@/models/Package';
import { cacheDelete } from '@/lib/redis/cache';
import fallbackPackages from '@/data/packages.json';

async function purgePackageCaches(slug?: string) {
  try {
    await cacheDelete('packages:all:en');
    await cacheDelete('packages:all:or');
    if (slug) {
      await cacheDelete(`package:${slug}:en`);
      await cacheDelete(`package:${slug}:or`);
    }
  } catch (e) {
    console.warn('[AdminPackages] Cache purge warning:', e);
  }
}

// GET: All packages with fallback seeding support
export const GET = withAdminApi(async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const search = req.nextUrl.searchParams.get('q')?.toLowerCase();

    let packages = await Package.find({}).sort({ displayOrder: 1 }).lean();

    if (!packages || packages.length === 0) {
      packages = fallbackPackages as unknown as typeof packages;
    }

    if (search) {
      packages = packages.filter(
        (p) =>
          p.titleEn?.toLowerCase().includes(search) ||
          p.titleOr?.includes(search) ||
          p.slug?.toLowerCase().includes(search) ||
          p.category?.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, data: packages, total: packages.length });
  } catch (error) {
    console.warn('[AdminPackages] Database read error, using seeded data:', error);
    return NextResponse.json({ success: true, data: fallbackPackages, total: fallbackPackages.length });
  }
});

// POST: Create or upsert package
export const POST = withAdminApi(async (req: NextRequest) => {
  const body = await req.json().catch(() => null);

  if (!body || !body.slug || !body.titleEn) {
    return NextResponse.json(
      { success: false, error: 'slug and titleEn are required fields.' },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const created = await Package.findOneAndUpdate(
      { slug: body.slug },
      { $set: body },
      { upsert: true, new: true, runValidators: true }
    );

    await purgePackageCaches(body.slug);

    return NextResponse.json({
      success: true,
      data: created,
      message: 'Package saved successfully.',
    });
  } catch (dbError) {
    console.error('[AdminPackages] Database write error:', dbError);
    return NextResponse.json(
      { success: false, error: 'Failed to save package in database.' },
      { status: 500 }
    );
  }
});

// PUT: Update package by ID or slug
export const PUT = withAdminApi(async (req: NextRequest) => {
  const body = await req.json().catch(() => null);
  const id = body?._id || req.nextUrl.searchParams.get('id');
  const slug = body?.slug;

  if (!id && !slug) {
    return NextResponse.json(
      { success: false, error: '_id or slug is required for update.' },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const updated = id
      ? await Package.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })
      : await Package.findOneAndUpdate({ slug }, { $set: body }, { new: true, runValidators: true });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Package not found.' }, { status: 404 });
    }

    await purgePackageCaches(updated.slug);

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Package updated successfully.',
    });
  } catch (error) {
    console.error('[AdminPackages] PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update package.' },
      { status: 500 }
    );
  }
});

// DELETE: Remove package by ID or slug
export const DELETE = withAdminApi(async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');
  const slug = req.nextUrl.searchParams.get('slug');

  if (!id && !slug) {
    return NextResponse.json(
      { success: false, error: 'id or slug parameter is required.' },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const deleted = id
      ? await Package.findByIdAndDelete(id)
      : await Package.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Package not found.' }, { status: 404 });
    }

    await purgePackageCaches(deleted.slug);

    return NextResponse.json({ success: true, message: 'Package deleted successfully.' });
  } catch (error) {
    console.error('[AdminPackages] DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete package.' },
      { status: 500 }
    );
  }
});
