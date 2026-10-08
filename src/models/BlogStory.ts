import mongoose, { Schema, Document, Model } from 'mongoose';

export type StoryCategory = 'real_wedding' | 'editorial' | 'traditions_guide' | 'film_journal';

export interface IGalleryImage {
  url: string;
  captionEn?: string;
  captionOr?: string;
  aspect?: 'portrait' | 'landscape' | 'square';
  filmStock?: string;
}

export interface IVendorCredits {
  planner?: string;
  venue?: string;
  outfits?: string;
  makeup?: string;
  decor?: string;
}

export interface IBlogStory extends Document {
  slug: string;
  titleEn: string;
  titleOr: string;
  excerptEn: string;
  excerptOr: string;
  contentEn: string;
  contentOr: string;
  category: StoryCategory;
  coupleNames?: string;
  city: string;
  venueName?: string;
  weddingDate?: Date;
  coverImage: string;
  galleryImages: IGalleryImage[];
  filmUrl?: string; // YouTube or Vimeo embed
  vendorCredits?: IVendorCredits;
  seoKeywords: string[]; // Organic keywords e.g. ["heritage wedding puri", "odia wedding rituals"]
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    captionEn: { type: String },
    captionOr: { type: String },
    aspect: { type: String, enum: ['portrait', 'landscape', 'square'], default: 'portrait' },
    filmStock: { type: String },
  },
  { _id: false }
);

const BlogStorySchema = new Schema<IBlogStory>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    titleOr: { type: String, required: true, trim: true },
    excerptEn: { type: String, required: true },
    excerptOr: { type: String, required: true },
    contentEn: { type: String, required: true },
    contentOr: { type: String, required: true },
    category: {
      type: String,
      enum: ['real_wedding', 'editorial', 'traditions_guide', 'film_journal'],
      default: 'real_wedding',
    },
    coupleNames: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    venueName: { type: String, trim: true },
    weddingDate: { type: Date },
    coverImage: { type: String, required: true },
    galleryImages: { type: [GalleryImageSchema], default: [] },
    filmUrl: { type: String, trim: true },
    vendorCredits: {
      planner: { type: String },
      venue: { type: String },
      outfits: { type: String },
      makeup: { type: String },
      decor: { type: String },
    },
    seoKeywords: { type: [String], default: [] },
    metaTitle: { type: String },
    metaDescription: { type: String },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const BlogStory: Model<IBlogStory> =
  mongoose.models.BlogStory || mongoose.model<IBlogStory>('BlogStory', BlogStorySchema);
