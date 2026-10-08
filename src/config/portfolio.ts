export type PortfolioTab = 'all' | 'ceremony' | 'portraits' | 'cinema';

export interface PortfolioWorkItem {
  id: string;
  titleKey: string;
  descKey: string;
  category: 'ceremony' | 'portraits' | 'cinema';
  aspectRatio: '16/9' | '4/3' | '3/2' | '1/1' | '4/5';
  imageSrc?: string;
  mediaDescriptor: string;
  filmStock: string;
  location: string;
  isCinematicVideo?: boolean;
  videoDuration?: string;
}

export const portfolioConfig: {
  sectionTitleKey: string;
  sectionLeadKey: string;
  items: PortfolioWorkItem[];
} = {
  sectionTitleKey: 'works.title',
  sectionLeadKey: 'works.lead',
  items: [
    {
      id: 'work-1',
      titleKey: 'works.plate1Title',
      descKey: 'works.plate1Desc',
      category: 'ceremony',
      aspectRatio: '4/5',
      mediaDescriptor: 'Candid portrait of bride & groom during Sindoor Daan with sacred Vedic fire illumination in Puri.',
      filmStock: '35mm Kodak Portra 400',
      location: 'Puri, Odisha',
    },
    {
      id: 'work-2',
      titleKey: 'works.plate2Title',
      descKey: 'works.plate2Desc',
      category: 'cinema',
      aspectRatio: '16/9',
      mediaDescriptor: 'High-energy night Baraat procession with brass music band, fireworks, and groom entry in Cuttack.',
      filmStock: 'Kodak Vision3 500T • 4K Cinema',
      location: 'Cuttack, Odisha',
      isCinematicVideo: true,
      videoDuration: '04:12',
    },
    {
      id: 'work-3',
      titleKey: 'works.plate3Title',
      descKey: 'works.plate3Desc',
      category: 'portraits',
      aspectRatio: '1/1',
      mediaDescriptor: 'Playful Haldi moment with turmeric smiles, marigold flowers, and traditional Odia Khandua Pata silk.',
      filmStock: 'Leica 35mm • Natural Light',
      location: 'Bhubaneswar, Odisha',
    },
    {
      id: 'work-4',
      titleKey: 'works.plate4Title',
      descKey: 'works.plate4Desc',
      category: 'ceremony',
      aspectRatio: '16/9',
      mediaDescriptor: 'Sunset pre-wedding couple silhouette along the tranquil Puri-Konark marine drive sea coastline.',
      filmStock: '35mm Analog • Golden Hour Film',
      location: 'Puri Coastline, Odisha',
    },
  ],
};
