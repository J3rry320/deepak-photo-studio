export interface TestimonialItem {
  id: string;
  quoteKey: string;
  coupleKey: string;
  locationKey: string;
}

export const testimonialsConfig: {
  sectionTitleKey: string;
  sectionLeadKey: string;
  items: TestimonialItem[];
} = {
  sectionTitleKey: 'testimonials.title',
  sectionLeadKey: 'testimonials.lead',
  items: [
    {
      id: 'testimonial-1',
      quoteKey: 'testimonials.quote1',
      coupleKey: 'testimonials.couple1',
      locationKey: 'testimonials.location1',
    },
    {
      id: 'testimonial-2',
      quoteKey: 'testimonials.quote2',
      coupleKey: 'testimonials.couple2',
      locationKey: 'testimonials.location2',
    },
  ],
};
