import { createAdminCrudHandlers } from '@/lib/api/crud-factory';
import { BlogStory } from '@/models/BlogStory';

const handlers = createAdminCrudHandlers({
  model: BlogStory,
  entityName: 'BlogStory',
  searchFields: ['titleEn', 'titleOr', 'slug', 'coupleNames', 'city', 'excerptEn'],
  filterFields: ['category', 'isPublished', 'city'],
  cacheKeysToInvalidate: ['stories:all:en', 'stories:all:or'],
  defaultSort: { createdAt: -1 },
});

export const { GET, POST, PUT, DELETE } = handlers;
