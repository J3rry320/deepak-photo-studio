'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Edit2, Trash2, Eye } from 'lucide-react';

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T, index: number) => React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface AdminDataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor?: (item: T) => string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  actionsRenderer?: (item: T) => React.ReactNode;
}

export function AdminDataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor = (item) => String(item._id || item.id || item.slug || Math.random()),
  isLoading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items to display matching your criteria.',
  onEdit,
  onDelete,
  onView,
  actionsRenderer,
}: AdminDataTableProps<T>) {
  const hasActions = Boolean(onEdit || onDelete || onView || actionsRenderer);

  if (isLoading) {
    return (
      <div className="border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] overflow-x-auto shadow-xs">
      <table className="w-full text-left border-collapse text-xs font-body">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-faint)] uppercase tracking-[0.16em] text-[10px]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3.5 px-4 font-semibold ${
                  col.align === 'right'
                    ? 'text-right'
                    : col.align === 'center'
                    ? 'text-center'
                    : 'text-left'
                } ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
            {hasActions && (
              <th className="py-3.5 px-4 text-right font-semibold">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-highlight)]">
          {data.map((item, rowIdx) => {
            const key = keyExtractor(item);
            return (
              <tr
                key={key}
                className="hover:bg-[var(--color-bg-secondary)]/50 transition-colors"
              >
                {columns.map((col, colIdx) => {
                  let content: React.ReactNode;
                  if (col.cell) {
                    content = col.cell(item, rowIdx);
                  } else if (col.accessorKey) {
                    const val = item[col.accessorKey];
                    content = val !== undefined && val !== null ? String(val) : '—';
                  } else {
                    content = '—';
                  }

                  return (
                    <td
                      key={colIdx}
                      className={`py-3.5 px-4 leading-relaxed ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      } ${col.className || ''}`}
                    >
                      {content}
                    </td>
                  );
                })}

                {hasActions && (
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      {actionsRenderer && actionsRenderer(item)}

                      {onView && (
                        <button
                          type="button"
                          onClick={() => onView(item)}
                          className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-highlight)] transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(item)}
                          className="p-1.5 text-[var(--color-text-muted)] hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
