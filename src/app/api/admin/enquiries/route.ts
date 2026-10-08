import { createAdminCrudHandlers } from '@/lib/api/crud-factory';
import { GeneralEnquiry } from '@/models/GeneralEnquiry';

const handlers = createAdminCrudHandlers({
  model: GeneralEnquiry,
  entityName: 'GeneralEnquiry',
  searchFields: ['name', 'email', 'phone', 'subject', 'message'],
  filterFields: ['status'],
  defaultSort: { createdAt: -1 },
});

export const { GET, POST, PUT, DELETE } = handlers;
