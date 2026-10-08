/**
 * Admin API Client SDK
 * Encapsulates all communication with the protected /api/admin endpoints.
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  stats?: Record<string, unknown>;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
  message?: string;
}

export interface QueryParams {
  q?: string;
  status?: string;
  category?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(endpoint, {
      ...options,
      headers,
      credentials: 'same-origin',
    });

    const data = (await res.json().catch(() => ({}))) as ApiResponse<T>;

    if (!res.ok && !data.error) {
      data.error = `HTTP Error ${res.status}: ${res.statusText}`;
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network request failed',
    };
  }
}

function buildQuery(params?: QueryParams): string {
  if (!params) return '';
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

function createEntityMethods<T>(basePath: string) {
  return {
    list: (params?: QueryParams) =>
      request<T[]>(`${basePath}${buildQuery(params)}`),
    create: (data: Partial<T>) =>
      request<T>(basePath, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<T>) =>
      request<T>(`${basePath}?id=${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<null>(`${basePath}?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }),
  };
}

export const adminClient = {
  stats: {
    get: () => request<{
      bookings: { pending: number; total: number };
      enquiries: { unread: number; total: number };
      packages: { active: number };
      stories: { published: number; total: number };
      portfolio: { total: number };
      testimonials: { total: number };
    }>('/api/admin/stats'),
  },
  bookings: createEntityMethods<Record<string, unknown>>('/api/admin/bookings'),
  enquiries: createEntityMethods<Record<string, unknown>>('/api/admin/enquiries'),
  packages: createEntityMethods<Record<string, unknown>>('/api/admin/packages'),
  stories: createEntityMethods<Record<string, unknown>>('/api/admin/stories'),
  portfolio: createEntityMethods<Record<string, unknown>>('/api/admin/portfolio'),
  testimonials: createEntityMethods<Record<string, unknown>>('/api/admin/testimonials'),
};
