import { createAdminCrudHandlers } from '@/lib/api/crud-factory';
import { BookingRequest } from '@/models/BookingRequest';

const handlers = createAdminCrudHandlers({
  model: BookingRequest,
  entityName: 'BookingRequest',
  searchFields: ['brideName', 'groomName', 'email', 'phone', 'city', 'venue'],
  filterFields: ['status', 'city', 'selectedPackage'],
  defaultSort: { createdAt: -1 },
});

export const { GET, POST, PUT, DELETE } = handlers;
