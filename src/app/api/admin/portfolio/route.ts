import { createAdminCrudHandlers } from '@/lib/api/crud-factory';
import { PortfolioItem } from '@/models/PortfolioItem';

const handlers = createAdminCrudHandlers({
  model: PortfolioItem,
  entityName: 'PortfolioItem',
  searchFields: ['titleEn', 'titleOr', 'location', 'filmStock'],
  filterFields: ['category', 'aspect', 'isFeatured'],
  cacheKeysToInvalidate: ['portfolio:all:en', 'portfolio:all:or'],
  defaultSort: { sortOrder: 1, createdAt: -1 },
});

export const { GET, POST, PUT, DELETE } = handlers;
