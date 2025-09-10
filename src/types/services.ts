export interface FeatureService {
  id: number;
  name: {
    en: string;
  };
  price: number;
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
}