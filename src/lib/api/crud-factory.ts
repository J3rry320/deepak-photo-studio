import { NextRequest, NextResponse } from 'next/server';
import { Model, Document } from 'mongoose';
import { withAdminApi } from './guard';
import { connectToDatabase } from '@/lib/db/mongodb';
import { cacheDelete } from '@/lib/redis/cache';

export interface CrudFactoryOptions<T extends Document> {
  model: Model<T>;
  entityName: string;
  searchFields?: (keyof T | string)[];
  filterFields?: (keyof T | string)[];
  cacheKeysToInvalidate?: string[] | ((doc: Record<string, unknown>) => string[]);
  defaultSort?: Record<string, 1 | -1>;
}

export function createAdminCrudHandlers<T extends Document>(
  options: CrudFactoryOptions<T>
) {
  const {
    model,
    entityName,
    searchFields = [],
    filterFields = ['status', 'category', 'isPopular', 'isPublished', 'isActive'],
    cacheKeysToInvalidate = [],
    defaultSort = { createdAt: -1 },
  } = options;

  async function purgeCaches(doc?: Record<string, unknown>) {
    try {
      if (Array.isArray(cacheKeysToInvalidate)) {
        for (const key of cacheKeysToInvalidate) {
          await cacheDelete(key);
        }
      } else if (typeof cacheKeysToInvalidate === 'function' && doc) {
        const keys = cacheKeysToInvalidate(doc);
        for (const key of keys) {
          await cacheDelete(key);
        }
      }
    } catch (e) {
      console.warn(`[AdminCrud:${entityName}] Cache purge warning:`, e);
    }
  }

  // GET: List with search, filtering, and pagination
  const GET = withAdminApi(async (req: NextRequest) => {
    try {
      await connectToDatabase();

      const searchParams = req.nextUrl.searchParams;
      const q = searchParams.get('q')?.trim();
      const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
      const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
      const skip = (page - 1) * limit;

      const queryFilter: Record<string, unknown> = {};

      // 1. Text Search across designated fields
      if (q && searchFields.length > 0) {
        queryFilter.$or = searchFields.map((field) => ({
          [field]: { $regex: q, $options: 'i' },
        }));
      }

      // 2. Exact match filters
      filterFields.forEach((field) => {
        const value = searchParams.get(String(field));
        if (value !== null && value !== undefined && value !== '') {
          if (value === 'true') {
            (queryFilter as Record<string, unknown>)[String(field)] = true;
          } else if (value === 'false') {
            (queryFilter as Record<string, unknown>)[String(field)] = false;
          } else {
            (queryFilter as Record<string, unknown>)[String(field)] = value;
          }
        }
      });

      const [items, total] = await Promise.all([
        model.find(queryFilter).sort(defaultSort).skip(skip).limit(limit).lean(),
        model.countDocuments(queryFilter),
      ]);

      return NextResponse.json({
        success: true,
        data: items,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error(`[AdminCrud:${entityName}] GET Error:`, error);
      return NextResponse.json(
        { success: false, error: `Failed to fetch ${entityName} records.` },
        { status: 500 }
      );
    }
  });

  // POST: Create document
  const POST = withAdminApi(async (req: NextRequest) => {
    try {
      await connectToDatabase();

      const body = await req.json().catch(() => null);
      if (!body) {
        return NextResponse.json(
          { success: false, error: 'Invalid JSON request payload.' },
          { status: 400 }
        );
      }

      const created = await model.create(body);
      await purgeCaches(body);

      return NextResponse.json({
        success: true,
        data: created,
        message: `${entityName} created successfully.`,
      });
    } catch (error) {
      console.error(`[AdminCrud:${entityName}] POST Error:`, error);
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : `Failed to create ${entityName}.`,
        },
        { status: 500 }
      );
    }
  });

  // PUT: Update document by ID
  const PUT = withAdminApi(async (req: NextRequest) => {
    try {
      await connectToDatabase();

      const body = await req.json().catch(() => null);
      const id = body?._id || body?.id || req.nextUrl.searchParams.get('id');

      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Record ID is required for update.' },
          { status: 400 }
        );
      }

      const updated = await model.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return NextResponse.json(
          { success: false, error: `${entityName} record not found.` },
          { status: 404 }
        );
      }

      await purgeCaches(body);

      return NextResponse.json({
        success: true,
        data: updated,
        message: `${entityName} updated successfully.`,
      });
    } catch (error) {
      console.error(`[AdminCrud:${entityName}] PUT Error:`, error);
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : `Failed to update ${entityName}.`,
        },
        { status: 500 }
      );
    }
  });

  // DELETE: Remove document by ID
  const DELETE = withAdminApi(async (req: NextRequest) => {
    try {
      await connectToDatabase();

      const id = req.nextUrl.searchParams.get('id');
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Record ID is required for deletion.' },
          { status: 400 }
        );
      }

      const deleted = await model.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json(
          { success: false, error: `${entityName} record not found.` },
          { status: 404 }
        );
      }

      await purgeCaches(deleted as unknown as Record<string, unknown>);

      return NextResponse.json({
        success: true,
        message: `${entityName} deleted successfully.`,
      });
    } catch (error) {
      console.error(`[AdminCrud:${entityName}] DELETE Error:`, error);
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : `Failed to delete ${entityName}.`,
        },
        { status: 500 }
      );
    }
  });

  return { GET, POST, PUT, DELETE };
}
