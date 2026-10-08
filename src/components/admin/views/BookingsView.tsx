'use client';

import React, { useState, useEffect } from 'react';
import { adminClient } from '@/lib/api/admin-client';
import { AdminDataTable, ColumnDef } from '../AdminDataTable';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminStatusPicker } from '../AdminStatusPicker';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Phone, Mail, MessageSquare, MapPin, Calendar, Trash2 } from 'lucide-react';

interface BookingRecord extends Record<string, unknown> {
  _id: string;
  brideName: string;
  groomName?: string;
  contactName?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  weddingDate: string;
  city: string;
  venue?: string;
  services: string[];
  selectedPackage?: string;
  storyNotes?: string;
  status: string;
  createdAt: string;
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'date_available', label: 'Date Available' },
  { value: 'date_booked', label: 'Date Booked' },
  { value: 'archived', label: 'Archived' },
];

export function BookingsView() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (statusFilter !== 'all') params.status = statusFilter;

    adminClient.bookings.list(params).then((res) => {
      if (active) {
        if (res.success && Array.isArray(res.data)) {
          setBookings(res.data as BookingRecord[]);
        }
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [search, statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await adminClient.bookings.update(id, { status: newStatus });
    if (res.success) {
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
      if (selectedBooking && selectedBooking._id === id) {
        setSelectedBooking((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const res = await adminClient.bookings.delete(deleteId);
    if (res.success) {
      setBookings((prev) => prev.filter((b) => b._id !== deleteId));
      setDeleteId(null);
    }
    setIsDeleting(false);
  };

  const columns: ColumnDef<BookingRecord>[] = [
    {
      header: 'Couple / Client',
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-display text-sm text-[var(--color-highlight)] font-medium">
            {item.brideName} {item.groomName ? `& ${item.groomName}` : ''}
          </p>
          <p className="text-[11px] text-[var(--color-text-faint)]">
            {item.email} • {item.phone}
          </p>
        </div>
      ),
    },
    {
      header: 'Wedding Date',
      cell: (item) => (
        <span className="font-mono text-xs">
          {item.weddingDate ? new Date(item.weddingDate).toLocaleDateString() : '—'}
        </span>
      ),
    },
    {
      header: 'Location / Venue',
      cell: (item) => (
        <div>
          <span className="font-medium">{item.city}</span>
          {item.venue && (
            <p className="text-[11px] text-[var(--color-text-faint)] truncate max-w-[150px]">
              {item.venue}
            </p>
          )}
        </div>
      ),
    },
    {
      header: 'Services',
      cell: (item) => (
        <div className="flex flex-wrap gap-1 max-w-[180px]">
          {Array.isArray(item.services) &&
            item.services.map((s, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]"
              >
                {s}
              </span>
            ))}
        </div>
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
        title="Wedding Booking Requests"
        description="Review incoming wedding date reservations, venue details, and client requirements."
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by couple, city, email, phone..."
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
              <option value="all">All Requests</option>
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
        data={bookings}
        isLoading={loading}
        emptyTitle="No booking requests found"
        emptyDescription="No wedding reservation requests match your current search or filter."
        onView={(item) => setSelectedBooking(item)}
        onDelete={(item) => setDeleteId(item._id)}
      />

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBooking(null)}
          title={`Booking Request: ${selectedBooking.brideName} ${selectedBooking.groomName ? `& ${selectedBooking.groomName}` : ''}`}
          description={`Submitted on ${new Date(selectedBooking.createdAt).toLocaleString()}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDeleteId(selectedBooking._id);
                  setSelectedBooking(null);
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
                  onClick={() => setSelectedBooking(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-6 text-xs font-body">
            {/* Status Bar */}
            <div className="p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-muted)] uppercase tracking-wider">Current Status:</span>
                <AdminStatusPicker
                  currentStatus={selectedBooking.status}
                  options={statusOptions}
                  onStatusChange={(status) => handleStatusChange(selectedBooking._id, status)}
                />
              </div>

              {selectedBooking.whatsapp || selectedBooking.phone ? (
                <a
                  href={`https://wa.me/${(selectedBooking.whatsapp || selectedBooking.phone).replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white font-semibold uppercase tracking-wider text-[10px] hover:bg-emerald-700 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp Client</span>
                </a>
              ) : null}
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 border border-[var(--color-border)] bg-[var(--color-bg-primary)] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Wedding Date
                </span>
                <p className="text-sm font-medium text-[var(--color-highlight)]">
                  {selectedBooking.weddingDate ? new Date(selectedBooking.weddingDate).toDateString() : 'N/A'}
                </p>
              </div>

              <div className="p-3.5 border border-[var(--color-border)] bg-[var(--color-bg-primary)] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Location & Venue
                </span>
                <p className="text-sm font-medium text-[var(--color-highlight)]">
                  {selectedBooking.city} {selectedBooking.venue ? `(${selectedBooking.venue})` : ''}
                </p>
              </div>

              <div className="p-3.5 border border-[var(--color-border)] bg-[var(--color-bg-primary)] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-semibold flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Phone / WhatsApp
                </span>
                <p className="text-sm font-medium text-[var(--color-highlight)]">
                  <a href={`tel:${selectedBooking.phone}`} className="hover:text-[var(--color-accent)]">
                    {selectedBooking.phone}
                  </a>
                </p>
              </div>

              <div className="p-3.5 border border-[var(--color-border)] bg-[var(--color-bg-primary)] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-semibold flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email Address
                </span>
                <p className="text-sm font-medium text-[var(--color-highlight)]">
                  <a href={`mailto:${selectedBooking.email}`} className="hover:text-[var(--color-accent)]">
                    {selectedBooking.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Services Requested */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-faint)] block">
                Requested Services:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedBooking.services?.map((svc, i) => (
                  <Badge key={i} variant="gold">
                    {svc}
                  </Badge>
                ))}
                {selectedBooking.selectedPackage && (
                  <Badge variant="crimson">
                    Package: {selectedBooking.selectedPackage}
                  </Badge>
                )}
              </div>
            </div>

            {/* Notes / Story */}
            {selectedBooking.storyNotes && (
              <div className="space-y-1.5 pt-2 border-t border-[var(--color-border)]">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-faint)] block">
                  Couple Story & Ceremonies Notes:
                </span>
                <p className="p-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] leading-relaxed whitespace-pre-wrap">
                  {selectedBooking.storyNotes}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Booking Request"
        message="Are you sure you want to permanently delete this booking request? This action cannot be undone."
      />
    </div>
  );
}
