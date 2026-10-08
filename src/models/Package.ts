import mongoose, { Schema, Document, Model } from 'mongoose';

export type PackageCategory = 'wedding' | 'pre-wedding' | 'event' | 'portrait' | 'analog';

export interface IPackageTier {
  nameEn: string;
  nameOr: string;
  taglineEn: string;
  taglineOr: string;
  priceDisplayEn: string;
  priceDisplayOr: string;
  isPopular?: boolean;
  deliverablesEn: string[];
  deliverablesOr: string[];
}

export interface IPackageAddOn {
  nameEn: string;
  nameOr: string;
  priceEn: string;
  priceOr: string;
  descriptionEn: string;
  descriptionOr: string;
}

export interface IPackageFaq {
  questionEn: string;
  questionOr: string;
  answerEn: string;
  answerOr: string;
}

export interface IPackagePrintSupport {
  titleEn: string;
  titleOr: string;
  descriptionEn: string;
  descriptionOr: string;
  itemsEn: string[];
  itemsOr: string[];
}

export interface IPackageSeo {
  metaTitleEn: string;
  metaTitleOr: string;
  metaDescriptionEn: string;
  metaDescriptionOr: string;
  keywords: string[];
}

export interface IPackageMedia {
  src?: string;
  aspectRatio: string;
  labelEn: string;
  labelOr: string;
  descriptorEn: string;
  descriptorOr: string;
}

export interface IPackage extends Document {
  slug: string;
  titleEn: string;
  titleOr: string;
  taglineEn?: string;
  taglineOr?: string;
  startingPrice: number;
  currency: string;
  formattedPriceEn: string;
  formattedPriceOr: string;
  startingPriceNoteEn?: string;
  startingPriceNoteOr?: string;
  category: PackageCategory;
  baseLocationEn?: string;
  baseLocationOr?: string;
  teamCrewEn?: string;
  teamCrewOr?: string;
  travelNoteEn?: string;
  travelNoteOr?: string;
  durationEn?: string;
  durationOr?: string;
  featuresEn: string[];
  featuresOr: string[];
  deliverablesEn: string[];
  deliverablesOr: string[];
  tiers: IPackageTier[];
  ritualsCoveredEn: string[];
  ritualsCoveredOr: string[];
  addOns: IPackageAddOn[];
  printAndDeliverySupport: IPackagePrintSupport;
  faqs: IPackageFaq[];
  seo: IPackageSeo;
  media: IPackageMedia;
  isPopular: boolean;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PackageTierSchema = new Schema<IPackageTier>(
  {
    nameEn: { type: String, required: true },
    nameOr: { type: String, required: true },
    taglineEn: { type: String, required: true },
    taglineOr: { type: String, required: true },
    priceDisplayEn: { type: String, required: true },
    priceDisplayOr: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    deliverablesEn: { type: [String], default: [] },
    deliverablesOr: { type: [String], default: [] },
  },
  { _id: false }
);

const PackageAddOnSchema = new Schema<IPackageAddOn>(
  {
    nameEn: { type: String, required: true },
    nameOr: { type: String, required: true },
    priceEn: { type: String, required: true },
    priceOr: { type: String, required: true },
    descriptionEn: { type: String, required: true },
    descriptionOr: { type: String, required: true },
  },
  { _id: false }
);

const PackageFaqSchema = new Schema<IPackageFaq>(
  {
    questionEn: { type: String, required: true },
    questionOr: { type: String, required: true },
    answerEn: { type: String, required: true },
    answerOr: { type: String, required: true },
  },
  { _id: false }
);

const PackagePrintSupportSchema = new Schema<IPackagePrintSupport>(
  {
    titleEn: { type: String, default: '' },
    titleOr: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    descriptionOr: { type: String, default: '' },
    itemsEn: { type: [String], default: [] },
    itemsOr: { type: [String], default: [] },
  },
  { _id: false }
);

const PackageSeoSchema = new Schema<IPackageSeo>(
  {
    metaTitleEn: { type: String, default: '' },
    metaTitleOr: { type: String, default: '' },
    metaDescriptionEn: { type: String, default: '' },
    metaDescriptionOr: { type: String, default: '' },
    keywords: { type: [String], default: [] },
  },
  { _id: false }
);

const PackageMediaSchema = new Schema<IPackageMedia>(
  {
    src: { type: String },
    aspectRatio: { type: String, default: '16/9' },
    labelEn: { type: String, default: '' },
    labelOr: { type: String, default: '' },
    descriptorEn: { type: String, default: '' },
    descriptorOr: { type: String, default: '' },
  },
  { _id: false }
);

const PackageSchema = new Schema<IPackage>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    titleOr: { type: String, required: true, trim: true },
    taglineEn: { type: String, trim: true },
    taglineOr: { type: String, trim: true },
    startingPrice: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    formattedPriceEn: { type: String, required: true },
    formattedPriceOr: { type: String, required: true },
    startingPriceNoteEn: { type: String, trim: true },
    startingPriceNoteOr: { type: String, trim: true },
    category: {
      type: String,
      enum: ['wedding', 'pre-wedding', 'event', 'portrait', 'analog'],
      required: true,
    },
    baseLocationEn: { type: String, default: 'Cuttack Studio Base' },
    baseLocationOr: { type: String, default: 'କଟକ ଷ୍ଟୁଡିଓ ମୁଖ୍ୟାଳୟ' },
    teamCrewEn: { type: String, default: '3 Dedicated Artists' },
    teamCrewOr: { type: String, default: '୩ ଜଣିଆ ବିଶେଷଜ୍ଞ ଟିମ୍' },
    travelNoteEn: { type: String, default: 'Travel across all 30 districts of Odisha' },
    travelNoteOr: { type: String, default: 'ସମଗ୍ର ଓଡ଼ିଶାର ୩୦ଟି ଜିଲ୍ଲାରେ ଯାତ୍ରା' },
    durationEn: { type: String },
    durationOr: { type: String },
    featuresEn: { type: [String], default: [] },
    featuresOr: { type: [String], default: [] },
    deliverablesEn: { type: [String], default: [] },
    deliverablesOr: { type: [String], default: [] },
    tiers: { type: [PackageTierSchema], default: [] },
    ritualsCoveredEn: { type: [String], default: [] },
    ritualsCoveredOr: { type: [String], default: [] },
    addOns: { type: [PackageAddOnSchema], default: [] },
    printAndDeliverySupport: { type: PackagePrintSupportSchema, default: () => ({}) },
    faqs: { type: [PackageFaqSchema], default: [] },
    seo: { type: PackageSeoSchema, default: () => ({}) },
    media: { type: PackageMediaSchema, default: () => ({}) },
    isPopular: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Package: Model<IPackage> =
  mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);
