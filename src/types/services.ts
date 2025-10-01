export interface FeatureServiceType {
  id: number;
  name: {
    en: string;
  };
  price: number;
  discount_price: number;
  media: Array<{ url: string }>;
  color: string;
  has_media: boolean;
  featured: boolean;
}

export interface CategoryType {
  id: number;
  name: {
    en: string;
  };
  media: Array<{ url: string }>;
  color: string;
  has_media: boolean;
  featured: boolean;
  description?: {
    en: string;
  };
  faq?: string;
}

export interface EServiceReviewType {
  id: number;
  review: string;
  rate: number;
  user_id: number;
  e_service_id: number;
  created_at: Date | null;
  updated_at: Date | null;
  // custom_fields: any[];
  user: {
    name: string;
    email: string;
    has_media: boolean,
    media: [
      {
          url: string;
          thumb: string;
          icon: string;
      }
    ]
  }
};


export interface EServiceType {
  id: number;
  country_id: number;
  name: {
    en: string;
  };
  price: number;
  discount_price: number;
  price_unit: string;
  minimum_unit: number | null;
  quantity_unit: {
    en: string | null;
  };
  duration: string;
  subtype_heading: string;
  description: {
    en: string;
  };
  faq: string | null; // Can be null or array
  featured: boolean;
  enable_booking: boolean;
  available: boolean;
  e_provider_id: number;
  // custom_fields: any[];
  has_media: boolean;
  rate: number;
  total_reviews: number;
  is_favorite: boolean;
  min_price: number | null;
  max_price: number | null;
  has_sub_type: boolean;
  e_service_reviews: Array<EServiceReviewType>;
  categories: Array<{
    id: number;
    name: {
      en: string;
    };
  }>;
  media: Array<{ url: string }>;
}

export interface ServiceItem {
  id: number;
  title: string;
  price: number;
  description: string;
  total_reviews: number;
  total_rate: number;
  image: string;
}

export interface ServiceType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  faqs: { question: string; answer: string }[];
  features?: string[];
  availability?: string;
  duration?: string;
  rate: number;
  total_reviews: number;
  warranty?: string;
  category: string;
  category_id: number;
}

export interface CategoryWithServices {
  id: number;
  name: string;
  image: string;
  total_service_count: number;
  services: ServiceItem[];
}

export interface AllCategoryServicesResponse {
  success: boolean;
  data: CategoryWithServices[];
  message: string;
}

export interface AdvancedSearchResponse {
  success: boolean;
  data: {
    categories: CategoryType[];
    e_services: EServiceType[];
  };
  message: string;
}
