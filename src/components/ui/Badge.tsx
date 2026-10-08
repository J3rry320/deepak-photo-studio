import React from 'react';

export type BadgeVariant =
  | 'crimson'
  | 'gold'
  | 'forest'
  | 'amber'
  | 'slate'
  | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  ...props
}: BadgeProps) {
  const sizeClasses =
    size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]';

  const variantClasses: Record<BadgeVariant, string> = {
    crimson:
      'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/60',
    gold:
      'bg-amber-50 text-[var(--color-accent)] border border-[var(--color-accent)]/30',
    forest:
      'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60',
    amber:
      'bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60',
    slate:
      'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    neutral:
      'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-body uppercase tracking-[0.16em] font-semibold select-none ${sizeClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Helper to map arbitrary model status strings to semantic Badge variants
 */
export function getStatusBadgeVariant(status: string): BadgeVariant {
  switch (status.toLowerCase()) {
    case 'date_booked':
    case 'resolved':
    case 'published':
    case 'active':
      return 'forest';

    case 'pending':
    case 'new':
      return 'crimson';

    case 'reviewed':
    case 'in_progress':
    case 'date_available':
      return 'gold';

    case 'archived':
    case 'spam':
    case 'draft':
      return 'slate';

    default:
      return 'neutral';
  }
}
