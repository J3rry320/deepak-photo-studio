import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'muted' | 'accent';
}

export function Card({ children, className = '', variant = 'default', ...props }: CardProps) {
  const variantStyles = {
    default: 'bg-[var(--color-bg-primary)] border-[var(--color-border)]',
    muted: 'bg-[var(--color-bg-secondary)] border-[var(--color-border)]',
    accent: 'bg-[var(--color-bg-primary)] border-[var(--color-accent)]',
  };

  return (
    <div
      className={`border p-6 sm:p-7 flex flex-col justify-between ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`space-y-1.5 pb-4 border-b border-[var(--color-border)] ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`font-display text-xl sm:text-2xl text-[var(--color-highlight)] ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`pt-4 flex-1 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs ${className}`} {...props}>
      {children}
    </div>
  );
}
