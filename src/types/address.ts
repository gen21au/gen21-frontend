export interface Address {
  id: number;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateAddressRequest {
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface UpdateAddressRequest {
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressResponse {
  success: boolean;
  data: Address | Address[];
  message: string;
}
