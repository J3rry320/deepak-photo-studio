import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, children, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 font-body">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] font-medium"
          >
            {label}
            {props.required && <span className="text-[var(--color-accent)] ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={`w-full bg-[var(--color-bg-primary)] border text-[var(--color-highlight)] text-xs sm:text-sm outline-none transition-colors appearance-none pr-10 pl-4 py-2.5 sm:py-3 cursor-pointer focus:ring-1 focus:ring-[var(--color-accent)] ${
              error
                ? 'border-red-500 focus:border-red-600'
                : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'
            } ${className}`}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[var(--color-bg-primary)]">
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute right-3.5 pointer-events-none text-[var(--color-text-faint)] shrink-0">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-[11px] text-[var(--color-text-faint)] leading-tight">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
