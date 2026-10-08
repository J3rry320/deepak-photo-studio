import { createAdminCrudHandlers } from '@/lib/api/crud-factory';
import { Testimonial } from '@/models/Testimonial';

const handlers = createAdminCrudHandlers({
  model: Testimonial,
  entityName: 'Testimonial',
  searchFields: ['coupleNames', 'weddingLocation', 'quoteEn', 'quoteOr'],
  filterFields: ['featuredOnHome', 'weddingYear', 'rating'],
  cacheKeysToInvalidate: ['testimonials:all'],
  defaultSort: { sortOrder: 1, createdAt: -1 },
});

export const { GET, POST, PUT, DELETE } = handlers;
