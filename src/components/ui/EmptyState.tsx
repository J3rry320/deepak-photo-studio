import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`p-10 sm:p-14 border border-dashed border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 text-center flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {icon && (
        <div className="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shadow-xs">
          {icon}
        </div>
      )}

      <div className="space-y-1.5 max-w-sm">
        <h4 className="font-display text-lg sm:text-xl text-[var(--color-highlight)]">
          {title}
        </h4>
        {description && (
          <p className="font-body text-xs text-[var(--color-text-muted)] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <Button size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
