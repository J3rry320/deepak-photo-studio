import { createAdminCrudHandlers } from '@/lib/api/crud-factory';
import { Package } from '@/models/Package';

const handlers = createAdminCrudHandlers({
  model: Package,
  entityName: 'Package',
  searchFields: ['titleEn', 'titleOr', 'slug', 'category', 'taglineEn'],
  filterFields: ['category', 'isActive', 'isPopular'],
  defaultSort: { displayOrder: 1 },
});

export const { GET, POST, PUT, DELETE } = handlers;
