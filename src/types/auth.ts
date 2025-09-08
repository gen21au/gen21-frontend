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

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
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
