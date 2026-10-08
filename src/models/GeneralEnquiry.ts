import mongoose, { Schema, Document, Model } from 'mongoose';

export type EnquiryStatus = 'new' | 'in_progress' | 'resolved' | 'spam';

export interface IGeneralEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const GeneralEnquirySchema = new Schema<IGeneralEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved', 'spam'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const GeneralEnquiry: Model<IGeneralEnquiry> =
  mongoose.models.GeneralEnquiry || mongoose.model<IGeneralEnquiry>('GeneralEnquiry', GeneralEnquirySchema);
