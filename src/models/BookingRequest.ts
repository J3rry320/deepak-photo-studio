import mongoose, { Schema, Document, Model } from 'mongoose';

export type BookingStatus = 'pending' | 'reviewed' | 'date_available' | 'date_booked' | 'archived';

export interface IBookingRequest extends Document {
  brideName: string;
  groomName?: string;
  contactName?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  weddingDate: Date;
  weddingEndDate?: Date;
  city: string;
  venue?: string;
  estimatedGuests?: number;
  services: string[]; // e.g., ['photography', 'cinematography', 'pre_wedding', 'analog_35mm']
  selectedPackage?: string;
  budgetRange?: string;
  storyNotes?: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BookingRequestSchema = new Schema<IBookingRequest>(
  {
    brideName: { type: String, required: true, trim: true },
    groomName: { type: String, trim: true },
    contactName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true },
    weddingDate: { type: Date, required: true },
    weddingEndDate: { type: Date },
    city: { type: String, required: true, trim: true },
    venue: { type: String, trim: true },
    estimatedGuests: { type: Number },
    services: { type: [String], default: [] },
    selectedPackage: { type: String, trim: true },
    budgetRange: { type: String, trim: true },
    storyNotes: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'date_available', 'date_booked', 'archived'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const BookingRequest: Model<IBookingRequest> =
  mongoose.models.BookingRequest || mongoose.model<IBookingRequest>('BookingRequest', BookingRequestSchema);
