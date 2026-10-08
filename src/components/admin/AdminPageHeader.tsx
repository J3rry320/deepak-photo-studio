import React from 'react';
import { Search } from 'lucide-react';

export interface AdminPageHeaderProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  searchPlaceholder = 'Search records...',
  searchValue,
  onSearchChange,
  actions,
  filters,
}: AdminPageHeaderProps) {
  return (
    <div className="space-y-6 pb-6 border-b border-[var(--color-border)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl sm:text-3xl text-[var(--color-highlight)] tracking-wide">
            {title}
          </h1>
          {description && (
            <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>

      {(onSearchChange || filters) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {onSearchChange && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)] pointer-events-none" />
              <input
                type="text"
                value={searchValue || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs font-body text-[var(--color-highlight)] placeholder:text-[var(--color-text-faint)] outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>
          )}

          {filters && <div className="flex items-center gap-2 flex-wrap">{filters}</div>}
        </div>
      )}
    </div>
  );
}
