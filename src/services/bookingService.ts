import { API_ENDPOINTS, BASE_API_URL } from '@/utils/api_endpoints';

export interface BookingAddress {
  id: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  default: boolean;
  user_id: string;
}

export interface BookingService {
  id: null;
  service_type: string;
  service_name: string;
  e_service_id: string;
  name: string;
  image_url: string;
  price: number;
  minimum_unit: string;
  added_unit: string;
  booking_at: string;
}

export interface BookingRequestPayload {
  coupon_code?: string;
  note?: string;
  address: BookingAddress;
  service: BookingService[];
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data?: {
    tran_id: string;
    GatewayPageURL: string;
  };
}

export interface PaymentStatusResponse {
  success: boolean;
  data?: {
    booking_id: string;
    tran_id: string;
    status: string;
    amount: string;
    currency: string;
    type: string;
  };
  message?: string;
}

export class BookingServiceAPI {
  static async createBookingRequest(
    payload: BookingRequestPayload,
    token: string
  ): Promise<BookingResponse> {
    const url = `${BASE_API_URL}${API_ENDPOINTS.BOOKING_REQUEST}?api_token=${token}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async getPaymentStatus(
    bookingId: string,
    token: string
  ): Promise<PaymentStatusResponse> {
    const url = `${BASE_API_URL}/sslcommerz_payment/status/${bookingId}?api_token=${token}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}
