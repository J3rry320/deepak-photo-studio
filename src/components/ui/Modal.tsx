'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'xl',
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${widthClasses[maxWidth]} bg-[var(--color-bg-primary)] border border-[var(--color-border)] shadow-2xl flex flex-col my-8 z-10 animate-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-[var(--color-border)] flex items-start justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h2 className="font-display text-xl sm:text-2xl text-[var(--color-highlight)]">
                {title}
              </h2>
            )}
            {description && (
              <p className="font-body text-xs text-[var(--color-text-muted)] leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-highlight)] transition-colors cursor-pointer rounded-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 sm:px-8 py-6 flex-1 overflow-y-auto max-h-[75vh]">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="px-6 sm:px-8 py-4 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
