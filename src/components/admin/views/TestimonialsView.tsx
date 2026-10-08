'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { adminClient } from '@/lib/api/admin-client';
import { AdminDataTable, ColumnDef } from '../AdminDataTable';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminEntityModal } from '../AdminEntityModal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Plus, Star } from 'lucide-react';

interface TestimonialRecord extends Record<string, unknown> {
  _id?: string;
  coupleNames: string;
  weddingLocation: string;
  weddingYear: string;
  quoteEn: string;
  quoteOr: string;
  rating: number;
  featuredOnHome: boolean;
  sortOrder: number;
}

const emptyTestimonial: TestimonialRecord = {
  coupleNames: '',
  weddingLocation: 'Cuttack Wedding',
  weddingYear: '2025',
  quoteEn: '',
  quoteOr: '',
  rating: 5,
  featuredOnHome: true,
  sortOrder: 0,
};

export function TestimonialsView() {
  const [items, setItems] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialRecord>(emptyTestimonial);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    const params: Record<string, string> = {};
    if (search) params.q = search;

    const res = await adminClient.testimonials.list(params);
    if (res.success && Array.isArray(res.data)) {
      setItems(res.data as TestimonialRecord[]);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    let active = true;
    const params: Record<string, string> = {};
    if (search) params.q = search;

    adminClient.testimonials.list(params).then((res) => {
      if (active) {
        if (res.success && Array.isArray(res.data)) {
          setItems(res.data as TestimonialRecord[]);
        }
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [search]);

  const handleOpenCreate = () => {
    setEditingItem(emptyTestimonial);
    setModalError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialRecord) => {
    setEditingItem(item);
    setModalError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem.coupleNames || !editingItem.quoteEn) {
      setModalError('Couple Names and English Quote are required.');
      return;
    }

    setIsSaving(true);
    setModalError(null);

    const isUpdate = Boolean(editingItem._id);
    const res = isUpdate
      ? await adminClient.testimonials.update(String(editingItem._id), editingItem)
      : await adminClient.testimonials.create(editingItem);

    if (res.success) {
      setModalOpen(false);
      fetchItems();
    } else {
      setModalError(res.error || 'Failed to save testimonial.');
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const res = await adminClient.testimonials.delete(deleteId);
    if (res.success) {
      setItems((prev) => prev.filter((i) => i._id !== deleteId));
      setDeleteId(null);
    }
    setIsDeleting(false);
  };

  const columns: ColumnDef<TestimonialRecord>[] = [
    {
      header: 'Couple',
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-display text-sm text-[var(--color-highlight)] font-medium">
            {item.coupleNames}
          </p>
          <p className="text-[11px] text-[var(--color-text-faint)]">
            {item.weddingLocation} • {item.weddingYear}
          </p>
        </div>
      ),
    },
    {
      header: 'Rating',
      cell: (item) => (
        <div className="flex items-center gap-1 text-[var(--color-accent)]">
          {Array.from({ length: item.rating || 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-current" />
          ))}
        </div>
      ),
    },
    {
      header: 'Quote Preview',
      cell: (item) => (
        <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 max-w-sm italic">
          &ldquo;{item.quoteEn}&rdquo;
        </p>
      ),
    },
    {
      header: 'Home Spotlight',
      cell: (item) => (
        <Badge variant={item.featuredOnHome ? 'forest' : 'slate'}>
          {item.featuredOnHome ? 'Active on Home' : 'Archive Only'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Client Reviews & Testimonials"
        description="Manage verified words from real couples and feature them across the live website."
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by couple name or location..."
        actions={
          <Button size="sm" onClick={handleOpenCreate} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            New Review
          </Button>
        }
      />

      <AdminDataTable
        columns={columns}
        data={items}
        isLoading={loading}
        emptyTitle="No testimonials found"
        emptyDescription="Add reviews and quotes from married couples."
        onEdit={(item) => handleOpenEdit(item)}
        onDelete={(item) => item._id && setDeleteId(item._id)}
      />

      {/* Testimonial Form Modal */}
      <AdminEntityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        isSaving={isSaving}
        error={modalError}
        title={editingItem._id ? `Edit Review: ${editingItem.coupleNames}` : 'New Couple Review'}
        description="Enter couple details, review quote, and rating."
        maxWidth="xl"
      >
        <div className="space-y-4 text-xs font-body">
          <Input
            label="Couple Names"
            required
            value={editingItem.coupleNames}
            onChange={(e) => setEditingItem({ ...editingItem, coupleNames: e.target.value })}
            placeholder="Ananya & Siddharth"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Wedding Location"
              value={editingItem.weddingLocation}
              onChange={(e) => setEditingItem({ ...editingItem, weddingLocation: e.target.value })}
              placeholder="Puri Wedding"
            />

            <Input
              label="Wedding Year"
              value={editingItem.weddingYear}
              onChange={(e) => setEditingItem({ ...editingItem, weddingYear: e.target.value })}
              placeholder="2025"
            />
          </div>

          <Textarea
            label="Quote (English)"
            required
            rows={3}
            value={editingItem.quoteEn}
            onChange={(e) => setEditingItem({ ...editingItem, quoteEn: e.target.value })}
            placeholder="When our wedding video arrived, our entire family sat together and cried happy tears..."
          />

          <Textarea
            label="Quote (Odia)"
            rows={3}
            value={editingItem.quoteOr}
            onChange={(e) => setEditingItem({ ...editingItem, quoteOr: e.target.value })}
            placeholder="ଆମ ବିବାହ ଭିଡିଓ ଦେଖି ସମସ୍ତ ପରିବାର ଭାବବିହ୍ୱଳ ହୋଇପଡ଼ିଥିଲେ..."
          />

          <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingItem.featuredOnHome}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, featuredOnHome: e.target.checked })
                }
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              <span className="text-xs text-[var(--color-highlight)] font-medium">
                Spotlight on Public Home Page
              </span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
                Star Rating:
              </span>
              <select
                value={editingItem.rating}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, rating: Number(e.target.value) || 5 })
                }
                className="px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-center"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
                <option value={3}>3 Stars ★★★☆☆</option>
              </select>
            </div>
          </div>
        </div>
      </AdminEntityModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Testimonial"
        message="Are you sure you want to delete this couple review?"
      />
    </div>
  );
}
