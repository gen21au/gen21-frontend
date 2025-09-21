export interface EService {
  id: number
  service_type: string
  service_name: string
  e_service_id: string
  name: string
  image_url: string
  price: string
  minimum_unit: string
  added_unit: string
  booking_at: string
}

export interface Address {
  address: string
  description: string | null
  latitude: number
  longitude: number
  default: boolean | null
  user_id: number
  id: number
  custom_fields: any[]
}

export interface CustomerRequest {
  id: number
  service_type: string
  user_id: number
  order_id: number
  e_provider_user_id: number | null
  accept_e_provider_user_id: number
  e_service_id: number
  quantity: number
  status: 'accept' | 'completed' | 'pending' // Assuming these are the possible statuses
  created_at: string
  updated_at: string
  customer_name: string
  e_service: {
    id: number
    country_id: number
    name: { en: string }
    price: number
    discount_price: number
    price_unit: string
    minimum_unit: number
    quantity_unit: { en: string | null }
    duration: string
    subtype_heading: string
    description: { en: string }
    faq: string | null
    featured: boolean
    enable_booking: boolean
    available: boolean
    e_provider_id: number
    custom_fields: any[]
    has_media: boolean
    total_reviews: number
    is_favorite: boolean
    rate: number
    min_price: number | null
    max_price: number | null
    has_sub_type: boolean
    e_provider: EProvider[]
  }
}

export interface EProvider {
  id: number
  country_id: number
  name: { en: string }
  e_provider_type_id: number
  description: { en: string | null }
  phone_number: string
  mobile_number: string
  availability_range: number
  available: boolean
  featured: boolean
  accepted: boolean
  photo_id_no: string | null
  photo_id_issue_date: string | null
  photo_id_expiry_date: string | null
  photo_id_country: string | null
  driving_license_front: string | null
  driving_license_back: string | null
  driving_license_no: string | null
  driving_license_issue_date: string | null
  driving_license_expiry_date: string | null
  driving_license_country: string | null
  work_permit: string | null
  visa_no: string | null
  visa_doc: string | null
  other_interested: string | null
  acknowledgement: string | null
  abn_number: string
  photo_id_front: string
  photo_id_back: string
  custom_fields: any[]
  has_media: boolean
  rate: number
  total_reviews: number
}

export interface Order {
  id: number
  country_id: number
  user_id: number
  e_service: EService[]
  coupon_id: boolean | null
  address: Address
  note: string | null
  created_at: string
  updated_at: string
  total_item: number
  total_accept_item: number
  total_price: number
  coupon: any | null
  price: number
  customer_request: CustomerRequest[]
}
