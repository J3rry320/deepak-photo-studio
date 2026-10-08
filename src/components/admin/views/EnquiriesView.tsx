'use client';

import React, { useState, useEffect } from 'react';
import { adminClient } from '@/lib/api/admin-client';
import { AdminDataTable, ColumnDef } from '../AdminDataTable';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminStatusPicker } from '../AdminStatusPicker';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Mail, MessageSquare, Trash2 } from 'lucide-react';

interface EnquiryRecord extends Record<string, unknown> {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  createdAt: string;
}

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'spam', label: 'Spam' },
];

export function EnquiriesView() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (statusFilter !== 'all') params.status = statusFilter;

    adminClient.enquiries.list(params).then((res) => {
      if (active) {
        if (res.success && Array.isArray(res.data)) {
          setEnquiries(res.data as EnquiryRecord[]);
        }
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [search, statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await adminClient.enquiries.update(id, { status: newStatus });
    if (res.success) {
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const res = await adminClient.enquiries.delete(deleteId);
    if (res.success) {
      setEnquiries((prev) => prev.filter((e) => e._id !== deleteId));
      setDeleteId(null);
    }
    setIsDeleting(false);
  };

  const columns: ColumnDef<EnquiryRecord>[] = [
    {
      header: 'Sender Details',
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-display text-sm text-[var(--color-highlight)] font-medium">
            {item.name}
          </p>
          <p className="text-[11px] text-[var(--color-text-faint)]">
            {item.email} {item.phone ? `• ${item.phone}` : ''}
          </p>
        </div>
      ),
    },
    {
      header: 'Subject & Preview',
      cell: (item) => (
        <div className="max-w-[280px] space-y-0.5">
          <p className="font-medium text-xs text-[var(--color-highlight)] truncate">
            {item.subject || 'General Inquiry'}
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1">
            {item.message}
          </p>
        </div>
      ),
    },
    {
      header: 'Date',
      cell: (item) => (
        <span className="font-mono text-xs text-[var(--color-text-faint)]">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (item) => (
        <AdminStatusPicker
          currentStatus={item.status}
          options={statusOptions}
          onStatusChange={(status) => handleStatusChange(item._id, status)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Client & General Inquiries"
        description="Review messages, press queries, and questions submitted from the studio contact touchpoints."
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, email, subject, message..."
        filters={
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-highlight)] outline-none"
            >
              <option value="all">All Inquiries</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        }
      />

      <AdminDataTable
        columns={columns}
        data={enquiries}
        isLoading={loading}
        emptyTitle="No inquiries found"
        emptyDescription="There are no incoming client enquiries matching your search filter."
        onView={(item) => setSelectedEnquiry(item)}
        onDelete={(item) => setDeleteId(item._id)}
      />

      {/* Message Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedEnquiry(null)}
          title={selectedEnquiry.subject || 'General Inquiry'}
          description={`From ${selectedEnquiry.name} • ${new Date(selectedEnquiry.createdAt).toLocaleString()}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDeleteId(selectedEnquiry._id);
                  setSelectedEnquiry(null);
                }}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                <span>Delete</span>
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-6 text-xs font-body">
            {/* Sender & Contact Row */}
            <div className="p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-muted)] uppercase tracking-wider">Status:</span>
                <AdminStatusPicker
                  currentStatus={selectedEnquiry.status}
                  options={statusOptions}
                  onStatusChange={(status) => handleStatusChange(selectedEnquiry._id, status)}
                />
              </div>

              <div className="flex items-center gap-2">
                {selectedEnquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white font-semibold uppercase tracking-wider text-[10px] hover:bg-emerald-700 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                )}
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(selectedEnquiry.subject || 'Wedding Inquiry')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-accent)] text-[var(--color-highlight)] font-semibold uppercase tracking-wider text-[10px] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>

            {/* Sender Meta */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-semibold block">
                  Sender Name
                </span>
                <p className="text-sm font-medium text-[var(--color-highlight)] mt-1">
                  {selectedEnquiry.name}
                </p>
              </div>

              <div className="p-3 border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-semibold block">
                  Email
                </span>
                <p className="text-sm font-medium text-[var(--color-highlight)] mt-1">
                  {selectedEnquiry.email}
                </p>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-faint)] block">
                Message Content:
              </span>
              <div className="p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Inquiry"
        message="Are you sure you want to delete this enquiry? This action cannot be undone."
      />
    </div>
  );
}
