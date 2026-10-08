'use client';

import React from 'react';
import { Badge, getStatusBadgeVariant } from '@/components/ui/Badge';

export interface StatusOption {
  value: string;
  label: string;
}

export interface AdminStatusPickerProps {
  currentStatus: string;
  options: StatusOption[];
  onStatusChange: (newStatus: string) => void | Promise<void>;
  disabled?: boolean;
}

export function AdminStatusPicker({
  currentStatus,
  options,
  onStatusChange,
  disabled = false,
}: AdminStatusPickerProps) {
  const currentOption = options.find((o) => o.value === currentStatus) || {
    value: currentStatus,
    label: currentStatus,
  };

  return (
    <div className="relative inline-flex items-center">
      <Badge variant={getStatusBadgeVariant(currentStatus)}>
        {currentOption.label}
      </Badge>

      <select
        value={currentStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        disabled={disabled}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer disabled:cursor-not-allowed"
        aria-label="Change status"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
