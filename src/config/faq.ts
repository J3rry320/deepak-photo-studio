export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export const faqConfig: {
  sectionTitleKey: string;
  sectionLeadKey: string;
  items: FaqItem[];
} = {
  sectionTitleKey: 'faq.title',
  sectionLeadKey: 'faq.lead',
  items: [
    {
      id: 'faq-1',
      questionKey: 'faq.q1',
      answerKey: 'faq.a1',
    },
    {
      id: 'faq-2',
      questionKey: 'faq.q2',
      answerKey: 'faq.a2',
    },
    {
      id: 'faq-3',
      questionKey: 'faq.q3',
      answerKey: 'faq.a3',
    },
    {
      id: 'faq-4',
      questionKey: 'faq.q4',
      answerKey: 'faq.a4',
    },
    {
      id: 'faq-5',
      questionKey: 'faq.q5',
      answerKey: 'faq.a5',
    },
  ],
};
