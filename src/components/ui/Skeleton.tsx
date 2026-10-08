import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[var(--color-border)]/60 rounded-xs ${className}`}
      aria-hidden="true"
    />
  );
}
