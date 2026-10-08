import mongoose, { Schema, Document, Model } from 'mongoose';

export type PortfolioCategory =
  | 'mandap_rituals'
  | 'candid_portraiture'
  | 'twilight_celebration'
  | 'analog_stills'
  | 'cinematic_reels';

export interface IPortfolioItem extends Document {
  titleEn: string;
  titleOr: string;
  category: PortfolioCategory;
  aspect: 'portrait' | 'landscape' | 'square';
  src: string;
  filmStock?: string; // e.g. "35mm Kodak Portra 400"
  location?: string;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioItemSchema = new Schema<IPortfolioItem>(
  {
    titleEn: { type: String, required: true, trim: true },
    titleOr: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['mandap_rituals', 'candid_portraiture', 'twilight_celebration', 'analog_stills', 'cinematic_reels'],
      required: true,
    },
    aspect: {
      type: String,
      enum: ['portrait', 'landscape', 'square'],
      default: 'portrait',
    },
    src: { type: String, required: true },
    filmStock: { type: String, trim: true },
    location: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const PortfolioItem: Model<IPortfolioItem> =
  mongoose.models.PortfolioItem || mongoose.model<IPortfolioItem>('PortfolioItem', PortfolioItemSchema);
