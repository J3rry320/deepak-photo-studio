import React, { Suspense } from 'react';
import { AdminConsoleShell } from '@/components/admin/AdminConsoleShell';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-40 w-full" />
        </div>
      }
    >
      <AdminConsoleShell />
    </Suspense>
  );
}
