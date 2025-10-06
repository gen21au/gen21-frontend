export interface FaqItem {
  id: number;
  country_id: number;
  question: {
    en: string;
  };
  answer: {
    en: string;
  };
  faq_category_id: number;
}

export interface FaqCategory {
  id: number;
  country_id: number;
  name: {
    en: string;
  };
  faqs: FaqItem[];
}

export interface FaqResponse {
  success: boolean;
  data: FaqCategory[];
  message: string;
}
