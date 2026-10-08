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
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Plus, ArrowUpRight, Sparkles } from 'lucide-react';

interface PackageRecord extends Record<string, unknown> {
  _id?: string;
  slug: string;
  titleEn: string;
  titleOr: string;
  taglineEn?: string;
  taglineOr?: string;
  startingPrice: number;
  formattedPriceEn: string;
  formattedPriceOr: string;
  category: 'wedding' | 'pre-wedding' | 'event' | 'portrait' | 'analog';
  baseLocationEn?: string;
  teamCrewEn?: string;
  durationEn?: string;
  isPopular: boolean;
  isActive: boolean;
  displayOrder: number;
}

const emptyPackage: PackageRecord = {
  slug: '',
  titleEn: '',
  titleOr: '',
  taglineEn: '',
  taglineOr: '',
  startingPrice: 50000,
  formattedPriceEn: '₹50,000',
  formattedPriceOr: '₹୫୦,୦୦୦',
  category: 'wedding',
  baseLocationEn: 'Cuttack, Odisha',
  teamCrewEn: '3 Dedicated Artists',
  durationEn: 'Full Day Coverage',
  isPopular: false,
  isActive: true,
  displayOrder: 0,
};

const categoryOptions = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'pre-wedding', label: 'Pre-Wedding' },
  { value: 'event', label: 'Event' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'analog', label: 'Analog 35mm' },
];

export function PackagesView() {
  const [packages, setPackages] = useState<PackageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageRecord>(emptyPackage);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPackages = useCallback(async () => {
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (categoryFilter !== 'all') params.category = categoryFilter;

    const res = await adminClient.packages.list(params);
    if (res.success && Array.isArray(res.data)) {
      setPackages(res.data as PackageRecord[]);
    }
    setLoading(false);
  }, [search, categoryFilter]);

  useEffect(() => {
    let active = true;
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (categoryFilter !== 'all') params.category = categoryFilter;

    adminClient.packages.list(params).then((res) => {
      if (active) {
        if (res.success && Array.isArray(res.data)) {
          setPackages(res.data as PackageRecord[]);
        }
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [search, categoryFilter]);

  const handleOpenCreate = () => {
    setEditingPackage(emptyPackage);
    setModalError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (pkg: PackageRecord) => {
    setEditingPackage(pkg);
    setModalError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingPackage.slug || !editingPackage.titleEn) {
      setModalError('Slug and English Title are required fields.');
      return;
    }

    setIsSaving(true);
    setModalError(null);

    const isUpdate = Boolean(editingPackage._id);
    const res = isUpdate
      ? await adminClient.packages.update(String(editingPackage._id), editingPackage)
      : await adminClient.packages.create(editingPackage);

    if (res.success) {
      setModalOpen(false);
      fetchPackages();
    } else {
      setModalError(res.error || 'Failed to save package.');
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteSlug) return;
    setIsDeleting(true);
    const res = await adminClient.packages.delete(deleteSlug);
    if (res.success) {
      setPackages((prev) => prev.filter((p) => p.slug !== deleteSlug));
      setDeleteSlug(null);
    }
    setIsDeleting(false);
  };

  const columns: ColumnDef<PackageRecord>[] = [
    {
      header: 'Collection Title',
      cell: (item) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm text-[var(--color-highlight)] font-medium">
              {item.titleEn}
            </span>
            {item.isPopular && (
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[var(--color-accent)] font-semibold px-1.5 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-accent)]/30">
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
          </div>
          <p className="text-[11px] text-[var(--color-text-faint)] font-mono">
            {item.slug} • {item.titleOr}
          </p>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (item) => (
        <Badge variant="neutral">{item.category}</Badge>
      ),
    },
    {
      header: 'Starting Price',
      cell: (item) => (
        <span className="font-display text-sm text-[var(--color-highlight)] font-medium">
          {item.formattedPriceEn}
        </span>
      ),
    },
    {
      header: 'Crew & Duration',
      cell: (item) => (
        <div className="text-[11px] text-[var(--color-text-muted)] space-y-0.5">
          <p>{item.teamCrewEn || '3 Artists'}</p>
          <p className="text-[var(--color-text-faint)]">{item.durationEn || 'Full Day'}</p>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (item) => (
        <Badge variant={item.isActive ? 'forest' : 'slate'}>
          {item.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Wedding Photography & Cinema Packages"
        description="Configure studio collections, starting investment rates, deliverables, and popular featured collections."
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search packages by title or slug..."
        actions={
          <Button size="sm" onClick={handleOpenCreate} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            New Package
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
        data={packages}
        isLoading={loading}
        emptyTitle="No packages found"
        emptyDescription="No studio package pricing collections match your current filter."
        onEdit={(item) => handleOpenEdit(item)}
        onDelete={(item) => setDeleteSlug(item.slug)}
        actionsRenderer={(item) => (
          <a
            href={`/services/${item.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            title="View Live Page"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      />

      {/* Package Form Modal */}
      <AdminEntityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        isSaving={isSaving}
        error={modalError}
        title={editingPackage._id ? `Edit Package: ${editingPackage.titleEn}` : 'Create New Studio Package'}
        description="Configure pricing, category, and descriptive copy in English and Odia."
        maxWidth="2xl"
      >
        <div className="space-y-5 text-xs font-body">
          {/* Slug & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Package Slug"
              required
              value={editingPackage.slug}
              onChange={(e) =>
                setEditingPackage({
                  ...editingPackage,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                })
              }
              placeholder="e.g. bride-side-wedding"
              helperText="Unique URL identifier for the live service page"
            />

            <Select
              label="Category"
              value={editingPackage.category}
              onChange={(e) =>
                setEditingPackage({
                  ...editingPackage,
                  category: e.target.value as PackageRecord['category'],
                })
              }
              options={categoryOptions}
            />
          </div>

          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Title (English)"
              required
              value={editingPackage.titleEn}
              onChange={(e) =>
                setEditingPackage({ ...editingPackage, titleEn: e.target.value })
              }
              placeholder="Bride Side Wedding Photography"
            />

            <Input
              label="Title (Odia)"
              value={editingPackage.titleOr}
              onChange={(e) =>
                setEditingPackage({ ...editingPackage, titleOr: e.target.value })
              }
              placeholder="କନ୍ୟା ପକ୍ଷ ବିବାହ ଫଟୋଗ୍ରାଫି"
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Starting Price (Numeric ₹)"
              type="number"
              value={editingPackage.startingPrice}
              onChange={(e) =>
                setEditingPackage({
                  ...editingPackage,
                  startingPrice: Number(e.target.value) || 0,
                  formattedPriceEn: `₹${(Number(e.target.value) || 0).toLocaleString('en-IN')}`,
                })
              }
            />

            <Input
              label="Formatted Display (EN)"
              value={editingPackage.formattedPriceEn}
              onChange={(e) =>
                setEditingPackage({ ...editingPackage, formattedPriceEn: e.target.value })
              }
              placeholder="₹50,000"
            />

            <Input
              label="Formatted Display (Odia)"
              value={editingPackage.formattedPriceOr}
              onChange={(e) =>
                setEditingPackage({ ...editingPackage, formattedPriceOr: e.target.value })
              }
              placeholder="₹୫୦,୦୦୦"
            />
          </div>

          {/* Tagline EN */}
          <Textarea
            label="Tagline / Lead (English)"
            rows={2}
            value={editingPackage.taglineEn || ''}
            onChange={(e) =>
              setEditingPackage({ ...editingPackage, taglineEn: e.target.value })
            }
            placeholder="Capturing tender glances and sacred Vedic rituals..."
          />

          {/* Team Crew & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Team Crew"
              value={editingPackage.teamCrewEn || ''}
              onChange={(e) =>
                setEditingPackage({ ...editingPackage, teamCrewEn: e.target.value })
              }
              placeholder="Dedicated 3-Artist Crew"
            />

            <Input
              label="Duration"
              value={editingPackage.durationEn || ''}
              onChange={(e) =>
                setEditingPackage({ ...editingPackage, durationEn: e.target.value })
              }
              placeholder="Full Day Coverage (8-10 Hours)"
            />
          </div>

          {/* Toggles */}
          <div className="pt-2 border-t border-[var(--color-border)] flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingPackage.isPopular}
                onChange={(e) =>
                  setEditingPackage({ ...editingPackage, isPopular: e.target.checked })
                }
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              <span className="text-xs text-[var(--color-highlight)] font-medium">
                Featured / Popular Collection
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingPackage.isActive}
                onChange={(e) =>
                  setEditingPackage({ ...editingPackage, isActive: e.target.checked })
                }
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              <span className="text-xs text-[var(--color-highlight)] font-medium">
                Active on Live Site
              </span>
            </label>
          </div>
        </div>
      </AdminEntityModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteSlug)}
        onClose={() => setDeleteSlug(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Package Collection"
        message={`Are you sure you want to delete package "${deleteSlug}"? This will invalidate live public pricing caches.`}
      />
    </div>
  );
}
