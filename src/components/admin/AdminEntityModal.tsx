'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export interface AdminEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void | Promise<void>;
  title: string;
  description?: string;
  isSaving?: boolean;
  error?: string | null;
  saveLabel?: string;
  cancelLabel?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export function AdminEntityModal({
  isOpen,
  onClose,
  onSave,
  title,
  description,
  isSaving = false,
  error,
  saveLabel = 'Save Changes',
  cancelLabel = 'Cancel',
  children,
  maxWidth = 'xl',
}: AdminEntityModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={isSaving ? () => {} : onClose}
      title={title}
      description={description}
      maxWidth={maxWidth}
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={isSaving}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onSave}
            isLoading={isSaving}
          >
            {saveLabel}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-500/40 text-red-600 dark:text-red-300 text-xs font-body">
            {error}
          </div>
        )}
        {children}
      </div>
    </Modal>
  );
}
