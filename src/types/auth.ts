export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        id: number; 
        name: string; 
        email: string; 
        phone_number: string;
        api_token: string;
        role: {
            id: number;
            name: string;
            guard_name: string;
        };
    }
}
  
export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

  
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
  
export interface ForgotPasswordRequest {
  email: string;
}
  
export interface ResetPasswordRequest {
  token: string;
  password: string;
}