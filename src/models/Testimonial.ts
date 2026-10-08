import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  coupleNames: string;
  weddingLocation: string;
  weddingYear: string;
  quoteEn: string;
  quoteOr: string;
  rating: number;
  featuredOnHome: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    coupleNames: { type: String, required: true, trim: true },
    weddingLocation: { type: String, required: true, trim: true },
    weddingYear: { type: String, default: '2025' },
    quoteEn: { type: String, required: true },
    quoteOr: { type: String, required: true },
    rating: { type: Number, default: 5 },
    featuredOnHome: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
