export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        id: number; 
        name: string; 
        email: string; 
        phone_number: string;
        api_token: string;
        roles: [{
            id: number;
            name: string;
            guard_name: string;
        }];
    }
}
  
export interface LoginRequest {
    email: string;
    password: string;
}

import { MediaItem } from '@/helper/media.helper';

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number?: string; // Added phone_number
  address?: string; // Added address
  bio?: string; // Added bio
  role: string;
  avatarUrl?: string; // Make avatarUrl optional as it might not always be present
  media?: MediaItem[]; // Added media property
  has_media?: boolean; // Added has_media property
  [key: string]: unknown; // Added index signature
  custom_fields?: { [key: string]: { value: string; view: string; name: string } } // Changed to an object for easier access
}

  
export interface RegisterRequest {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}
  
export interface ForgotPasswordRequest {
  email: string;
}
  
export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface LogoutResponse {
  success: boolean;
  data: string;
  message: string;
}

export interface UserRequest {
  api_token: string;
}

export interface ValidateTokenResponse {
  success: boolean;
  data: User;
  message: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  password?: string;
  password_confirmation?: string;
  avatar?: File | null; // Make avatar optional and allow null
  api_token: string;
}

export interface TokenValidationResult {
  isValid: boolean;
  error?: string;
  data?: User;
}