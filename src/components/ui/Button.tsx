import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-body uppercase tracking-[0.16em] font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-hidden';

    const sizeClasses: Record<ButtonSize, string> = {
      xs: 'text-[10px] px-2.5 py-1.5 gap-1.5',
      sm: 'text-xs px-3.5 py-2 gap-2',
      md: 'text-xs px-5 py-2.5 gap-2.5',
      lg: 'text-sm px-7 py-3.5 gap-3',
    };

    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#ffffff] shadow-xs hover:shadow-sm active:translate-y-px',
      secondary:
        'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-primary)] text-[var(--color-highlight)] border border-[var(--color-border)] hover:border-[var(--color-accent)]',
      outline:
        'border border-[var(--color-accent)] text-[var(--color-highlight)] hover:bg-[var(--color-accent)] hover:text-[#ffffff]',
      ghost:
        'text-[var(--color-text-muted)] hover:text-[var(--color-highlight)] hover:bg-[var(--color-bg-secondary)]',
      danger:
        'bg-red-700 hover:bg-red-800 text-[#ffffff] shadow-xs hover:shadow-sm active:translate-y-px',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
