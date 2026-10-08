'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { adminClient } from '@/lib/api/admin-client';
import { AdminDataTable, ColumnDef } from '../AdminDataTable';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminEntityModal } from '../AdminEntityModal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Plus, Sparkles, Image as ImageIcon } from 'lucide-react';

interface PortfolioRecord extends Record<string, unknown> {
  _id?: string;
  titleEn: string;
  titleOr: string;
  category: 'mandap_rituals' | 'candid_portraiture' | 'twilight_celebration' | 'analog_stills' | 'cinematic_reels';
  aspect: 'portrait' | 'landscape' | 'square';
  src: string;
  filmStock?: string;
  location?: string;
  isFeatured: boolean;
  sortOrder: number;
}

const emptyPortfolio: PortfolioRecord = {
  titleEn: '',
  titleOr: '',
  category: 'mandap_rituals',
  aspect: 'portrait',
  src: '',
  filmStock: '35mm Kodak Portra 400',
  location: 'Cuttack, Odisha',
  isFeatured: false,
  sortOrder: 0,
};

const categoryOptions = [
  { value: 'mandap_rituals', label: 'Mandap Rituals' },
  { value: 'candid_portraiture', label: 'Candid Portraiture' },
  { value: 'twilight_celebration', label: 'Twilight Celebration' },
  { value: 'analog_stills', label: 'Analog 35mm Stills' },
  { value: 'cinematic_reels', label: 'Cinematic Reels' },
];

const aspectOptions = [
  { value: 'portrait', label: 'Portrait (4:5 / 2:3)' },
  { value: 'landscape', label: 'Landscape (16:9)' },
  { value: 'square', label: 'Square (1:1)' },
];

export function PortfolioView() {
  const [items, setItems] = useState<PortfolioRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioRecord>(emptyPortfolio);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (categoryFilter !== 'all') params.category = categoryFilter;

    const res = await adminClient.portfolio.list(params);
    if (res.success && Array.isArray(res.data)) {
      setItems(res.data as PortfolioRecord[]);
    }
    setLoading(false);
  }, [search, categoryFilter]);

  useEffect(() => {
    let active = true;
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (categoryFilter !== 'all') params.category = categoryFilter;

    adminClient.portfolio.list(params).then((res) => {
      if (active) {
        if (res.success && Array.isArray(res.data)) {
          setItems(res.data as PortfolioRecord[]);
        }
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [search, categoryFilter]);

  const handleOpenCreate = () => {
    setEditingItem(emptyPortfolio);
    setModalError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: PortfolioRecord) => {
    setEditingItem(item);
    setModalError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem.titleEn || !editingItem.src) {
      setModalError('Title and Image URL are required.');
      return;
    }

    setIsSaving(true);
    setModalError(null);

    const isUpdate = Boolean(editingItem._id);
    const res = isUpdate
      ? await adminClient.portfolio.update(String(editingItem._id), editingItem)
      : await adminClient.portfolio.create(editingItem);

    if (res.success) {
      setModalOpen(false);
      fetchItems();
    } else {
      setModalError(res.error || 'Failed to save portfolio item.');
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const res = await adminClient.portfolio.delete(deleteId);
    if (res.success) {
      setItems((prev) => prev.filter((i) => i._id !== deleteId));
      setDeleteId(null);
    }
    setIsDeleting(false);
  };

  const columns: ColumnDef<PortfolioRecord>[] = [
    {
      header: 'Preview',
      cell: (item) => (
        <div className="w-10 h-10 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center shrink-0">
          {item.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.src} alt={item.titleEn} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-4 h-4 text-[var(--color-text-faint)]" />
          )}
        </div>
      ),
    },
    {
      header: 'Title & Meta',
      cell: (item) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm text-[var(--color-highlight)] font-medium">
              {item.titleEn}
            </span>
            {item.isFeatured && (
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[var(--color-accent)] font-semibold px-1.5 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-accent)]/30">
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
          </div>
          <p className="text-[11px] text-[var(--color-text-faint)]">
            {item.filmStock} • {item.location}
          </p>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (item) => <Badge variant="neutral">{item.category}</Badge>,
    },
    {
      header: 'Aspect Ratio',
      cell: (item) => (
        <span className="font-mono text-xs uppercase text-[var(--color-text-muted)]">
          {item.aspect}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Portfolio Works & Film Stills"
        description="Curate photography plates, analog 35mm film captures, and cinema reel showcases."
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by title, location, or film stock..."
        actions={
          <Button size="sm" onClick={handleOpenCreate} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            New Media Item
          </Button>
        }
        filters={
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-highlight)] outline-none"
            >
              <option value="all">All Categories</option>
              {categoryOptions.map((opt) => (
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
        data={items}
        isLoading={loading}
        emptyTitle="No portfolio items found"
        emptyDescription="Add your first photography still or film reel to the portfolio."
        onEdit={(item) => handleOpenEdit(item)}
        onDelete={(item) => item._id && setDeleteId(item._id)}
      />

      {/* Portfolio Item Modal */}
      <AdminEntityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        isSaving={isSaving}
        error={modalError}
        title={editingItem._id ? `Edit Item: ${editingItem.titleEn}` : 'New Portfolio Item'}
        description="Provide image URL, aspect ratio, film stock details, and category."
        maxWidth="xl"
      >
        <div className="space-y-4 text-xs font-body">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Title (English)"
              required
              value={editingItem.titleEn}
              onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value })}
              placeholder="Sindoor Daan Sacred Agni"
            />

            <Input
              label="Title (Odia)"
              value={editingItem.titleOr}
              onChange={(e) => setEditingItem({ ...editingItem, titleOr: e.target.value })}
              placeholder="ସିନ୍ଦୂର ଦାନ ମୁହୂର୍ତ୍ତ"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              value={editingItem.category}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  category: e.target.value as PortfolioRecord['category'],
                })
              }
              options={categoryOptions}
            />

            <Select
              label="Aspect Ratio"
              value={editingItem.aspect}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  aspect: e.target.value as PortfolioRecord['aspect'],
                })
              }
              options={aspectOptions}
            />
          </div>

          <Input
            label="Image / Video Source URL"
            required
            value={editingItem.src}
            onChange={(e) => setEditingItem({ ...editingItem, src: e.target.value })}
            placeholder="https://images.unsplash.com/... or /images/..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Film Stock / Camera Tag"
              value={editingItem.filmStock || ''}
              onChange={(e) => setEditingItem({ ...editingItem, filmStock: e.target.value })}
              placeholder="35mm Kodak Portra 400"
            />

            <Input
              label="Location"
              value={editingItem.location || ''}
              onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
              placeholder="Puri, Odisha"
            />
          </div>

          <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingItem.isFeatured}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, isFeatured: e.target.checked })
                }
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              <span className="text-xs text-[var(--color-highlight)] font-medium">
                Spotlight on Public Home Gallery
              </span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-faint)]">
                Sort Order:
              </span>
              <input
                type="number"
                value={editingItem.sortOrder}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, sortOrder: Number(e.target.value) || 0 })
                }
                className="w-16 px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-center"
              />
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
        title="Delete Portfolio Item"
        message="Are you sure you want to remove this media plate from the studio portfolio?"
      />
    </div>
  );
}
