import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, rows = 4, ...props }, ref) => {
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

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`w-full bg-[var(--color-bg-primary)] border text-[var(--color-highlight)] text-xs sm:text-sm outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:ring-1 focus:ring-[var(--color-accent)] px-4 py-2.5 sm:py-3 resize-y ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'
          } ${className}`}
          {...props}
        />

        {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-[11px] text-[var(--color-text-faint)] leading-tight">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
