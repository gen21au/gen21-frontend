import { User } from "@/types/auth";
import { API_ENDPOINTS, BASE_API_URL } from "./api_endpoints";
import { TokenManager } from "./tokenManager";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   avatarUrl: string;
//   api_token: string;
//   [key: string]: any;

// }

interface TokenValidationResult {
  isValid: boolean;
  error?: string;
  data?: User;
}

export class TokenValidation {
  static async checkAuth(): Promise<boolean> {
    // In a real implementation, this would check the actual token
    // For now, we'll return true to allow development
    // This should be replaced with actual token validation logic
    if (typeof window !== 'undefined') {
      const token = TokenManager.getAccessToken();
      console.log('checkAuth:: ', token);
      
      return !!token;
    }
    return false;
  }
  static async validateToken(token: string): Promise<TokenValidationResult> {
    if (!token) {
      return { isValid: false, error: 'No token provided' };
    }

    try {
      const response = await fetch(`${BASE_API_URL}${API_ENDPOINTS.USER_PROFILE}?api_token=${token}`, {
        method: 'GET',
        // headers: {
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json',
        // },
      });

      if (response.ok) {
        const user = await response.json();

        return { isValid: true, data: user?.data };
      } else {
        return { isValid: false, error: 'Token validation failed' };
      }
    } catch (error) {
      return { isValid: false, error: 'Network error' };
    }
  }

  static async isTokenValid(token: string): Promise<boolean> {
    const result = await this.validateToken(token);
    return result.isValid;
  }

  static async getUserFromToken(token: string): Promise<User | null> {
    const result = await this.validateToken(token);
    return result.data || null;
  }
}
