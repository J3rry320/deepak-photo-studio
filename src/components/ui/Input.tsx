import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 font-body">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] font-medium"
          >
            {label}
            {props.required && <span className="text-[var(--color-accent)] ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-[var(--color-text-faint)] shrink-0">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-[var(--color-bg-primary)] border text-[var(--color-highlight)] text-xs sm:text-sm outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:ring-1 focus:ring-[var(--color-accent)] ${
              leftIcon ? 'pl-10' : 'pl-4'
            } ${rightIcon ? 'pr-10' : 'pr-4'} py-2.5 sm:py-3 ${
              error
                ? 'border-red-500 focus:border-red-600'
                : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 pointer-events-none text-[var(--color-text-faint)] shrink-0">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-[11px] text-[var(--color-text-faint)] leading-tight">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
