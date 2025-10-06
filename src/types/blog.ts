export interface BlogMedia {
  id: number;
  country_id: number;
  model_type: string;
  model_id: number;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  size: number;
  manipulations: any[];
  custom_properties: {
    uuid: string;
    user_id: number;
    generated_conversions: {
      thumb: boolean;
      icon: boolean;
    };
  };
  url: string;
  thumb: string;
  icon: string;
  formated_size: string;
}

export interface Blog {
  id: number;
  country_id: number;
  title: string;
  body: string;
  userId: number;
  tags: string;
  slug: string;
  image: string | null;
  created_at: string;
  custom_fields: any[];
  has_media: boolean;
  media: BlogMedia[];
}

export interface BlogResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Blog[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  message: string;
}
