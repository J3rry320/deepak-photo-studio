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
import { Plus } from 'lucide-react';

interface StoryRecord extends Record<string, unknown> {
  _id?: string;
  slug: string;
  titleEn: string;
  titleOr: string;
  excerptEn: string;
  excerptOr: string;
  contentEn: string;
  contentOr: string;
  category: 'real_wedding' | 'editorial' | 'traditions_guide' | 'film_journal';
  coupleNames?: string;
  city: string;
  coverImage: string;
  filmUrl?: string;
  isPublished: boolean;
  createdAt?: string;
}

const emptyStory: StoryRecord = {
  slug: '',
  titleEn: '',
  titleOr: '',
  excerptEn: '',
  excerptOr: '',
  contentEn: '',
  contentOr: '',
  category: 'real_wedding',
  coupleNames: '',
  city: 'Cuttack',
  coverImage: '',
  filmUrl: '',
  isPublished: false,
};

const categoryOptions = [
  { value: 'real_wedding', label: 'Real Wedding' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'traditions_guide', label: 'Traditions Guide' },
  { value: 'film_journal', label: 'Film Journal' },
];

export function StoriesView() {
  const [stories, setStories] = useState<StoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<StoryRecord>(emptyStory);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchStories = useCallback(async () => {
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (categoryFilter !== 'all') params.category = categoryFilter;

    const res = await adminClient.stories.list(params);
    if (res.success && Array.isArray(res.data)) {
      setStories(res.data as StoryRecord[]);
    }
    setLoading(false);
  }, [search, categoryFilter]);

  useEffect(() => {
    let active = true;
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (categoryFilter !== 'all') params.category = categoryFilter;

    adminClient.stories.list(params).then((res) => {
      if (active) {
        if (res.success && Array.isArray(res.data)) {
          setStories(res.data as StoryRecord[]);
        }
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [search, categoryFilter]);

  const handleOpenCreate = () => {
    setEditingStory(emptyStory);
    setModalError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (story: StoryRecord) => {
    setEditingStory(story);
    setModalError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingStory.slug || !editingStory.titleEn || !editingStory.coverImage) {
      setModalError('Slug, Title, and Cover Image URL are required.');
      return;
    }

    setIsSaving(true);
    setModalError(null);

    const isUpdate = Boolean(editingStory._id);
    const res = isUpdate
      ? await adminClient.stories.update(String(editingStory._id), editingStory)
      : await adminClient.stories.create(editingStory);

    if (res.success) {
      setModalOpen(false);
      fetchStories();
    } else {
      setModalError(res.error || 'Failed to save story.');
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const res = await adminClient.stories.delete(deleteId);
    if (res.success) {
      setStories((prev) => prev.filter((s) => s._id !== deleteId));
      setDeleteId(null);
    }
    setIsDeleting(false);
  };

  const columns: ColumnDef<StoryRecord>[] = [
    {
      header: 'Story Title',
      cell: (item) => (
        <div className="space-y-0.5 max-w-[280px]">
          <p className="font-display text-sm text-[var(--color-highlight)] font-medium truncate">
            {item.titleEn}
          </p>
          <p className="text-[11px] text-[var(--color-text-faint)] font-mono">
            {item.slug}
          </p>
        </div>
      ),
    },
    {
      header: 'Couple / City',
      cell: (item) => (
        <div className="text-xs">
          <p className="font-medium text-[var(--color-highlight)]">
            {item.coupleNames || 'Editorial Feature'}
          </p>
          <p className="text-[11px] text-[var(--color-text-faint)]">{item.city}</p>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (item) => <Badge variant="neutral">{item.category}</Badge>,
    },
    {
      header: 'Published',
      cell: (item) => (
        <Badge variant={item.isPublished ? 'forest' : 'slate'}>
          {item.isPublished ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Real Wedding Stories & Journal"
        description="Publish editorial features, candid wedding photojournalism articles, and ritual tradition guides."
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search stories by title, slug, or couple names..."
        actions={
          <Button size="sm" onClick={handleOpenCreate} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            New Story
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
        data={stories}
        isLoading={loading}
        emptyTitle="No stories found"
        emptyDescription="Create your first wedding journal feature or guide."
        onEdit={(item) => handleOpenEdit(item)}
        onDelete={(item) => item._id && setDeleteId(item._id)}
      />

      {/* Story Form Modal */}
      <AdminEntityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        isSaving={isSaving}
        error={modalError}
        title={editingStory._id ? `Edit Story: ${editingStory.titleEn}` : 'Create Real Wedding Story'}
        description="Write story copy, upload cover image, and link film reel embed."
        maxWidth="2xl"
      >
        <div className="space-y-4 text-xs font-body">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Story Slug"
              required
              value={editingStory.slug}
              onChange={(e) =>
                setEditingStory({
                  ...editingStory,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                })
              }
              placeholder="e.g. ananya-siddharth-puri-wedding"
            />

            <Select
              label="Category"
              value={editingStory.category}
              onChange={(e) =>
                setEditingStory({
                  ...editingStory,
                  category: e.target.value as StoryRecord['category'],
                })
              }
              options={categoryOptions}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Title (English)"
              required
              value={editingStory.titleEn}
              onChange={(e) => setEditingStory({ ...editingStory, titleEn: e.target.value })}
              placeholder="Sacred Mandap Moments in Puri"
            />

            <Input
              label="Title (Odia)"
              value={editingStory.titleOr}
              onChange={(e) => setEditingStory({ ...editingStory, titleOr: e.target.value })}
              placeholder="ପୁରୀରେ ବୈଦିକ ବେଦୀର ସ୍ମୃତି"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Couple Names"
              value={editingStory.coupleNames || ''}
              onChange={(e) => setEditingStory({ ...editingStory, coupleNames: e.target.value })}
              placeholder="Ananya & Siddharth"
            />

            <Input
              label="City / Venue"
              required
              value={editingStory.city}
              onChange={(e) => setEditingStory({ ...editingStory, city: e.target.value })}
              placeholder="Puri, Odisha"
            />
          </div>

          <Input
            label="Cover Image URL"
            required
            value={editingStory.coverImage}
            onChange={(e) => setEditingStory({ ...editingStory, coverImage: e.target.value })}
            placeholder="https://images.unsplash.com/... or /images/..."
          />

          <Input
            label="Film Reel URL (Vimeo / YouTube)"
            value={editingStory.filmUrl || ''}
            onChange={(e) => setEditingStory({ ...editingStory, filmUrl: e.target.value })}
            placeholder="https://youtube.com/watch?v=..."
          />

          <Textarea
            label="Story Excerpt (English)"
            rows={3}
            value={editingStory.excerptEn}
            onChange={(e) => setEditingStory({ ...editingStory, excerptEn: e.target.value })}
            placeholder="A short teaser summary of the wedding celebration..."
          />

          <div className="pt-2 border-t border-[var(--color-border)]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingStory.isPublished}
                onChange={(e) =>
                  setEditingStory({ ...editingStory, isPublished: e.target.checked })
                }
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              <span className="text-xs text-[var(--color-highlight)] font-medium">
                Publish Story to Journal Archive
              </span>
            </label>
          </div>
        </div>
      </AdminEntityModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Story"
        message="Are you sure you want to permanently delete this story from the journal?"
      />
    </div>
  );
}
