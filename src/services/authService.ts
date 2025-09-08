import { setCredentials, logout, updateTokens, updateUser } from '@/store/authSlice';
import { TokenManager } from '@/utils/tokenManager';
import { TokenValidation } from '@/utils/tokenValidation';
import { API_ENDPOINTS, BASE_API_URL } from '@/utils/api_endpoints';
// The apiSlice import is no longer needed here as authApi is removed.

export class AuthService {
  // Login user - This method is now redundant if RTK Query's useLoginMutation is used.
  // It should be removed or refactored to use the RTK Query mutation.
  static async login(email: string, password: string) {
    console.warn("AuthService.login is a direct fetch call and might be redundant with RTK Query's useLoginMutation. Consider refactoring.");
    try {
      const response = await fetch(`${BASE_API_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Logout user - This method needs access to the store to get the token and dispatch logout.
  // It will be refactored to accept dispatch and getState or use a custom hook.
  static async logout() {
    console.warn("AuthService.logout needs refactoring to access store without circular dependency.");
    // Placeholder for refactoring:
    // const token = getStore().getState().auth.accessToken;
    // try {
    //   const response = await fetch(`${BASE_API_URL}${API_ENDPOINTS.LOGOUT}&api_token=${token}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error('Logout failed');
    //   }
    //   getStore().dispatch(logout());
    // } catch (error) {
    //   throw error;
    // }
  }

  // Check if user is authenticated (async)
  static async isAuthenticated(): Promise<boolean> {
    console.warn("AuthService.isAuthenticated needs refactoring to access store without circular dependency.");
    return false; // Placeholder
  }

  // Get current user
  static getCurrentUser() {
    console.warn("AuthService.getCurrentUser needs refactoring to access store without circular dependency.");
    return null; // Placeholder
  }

  // Get access token
  static getAccessToken(): string | null {
    console.warn("AuthService.getAccessToken needs refactoring to access store without circular dependency.");
    return null; // Placeholder
  }

  // Validate token (async)
  static async validateToken(): Promise<boolean> {
    const token = this.getAccessToken();
    return token ? await TokenValidation.isTokenValid(token) : false;
  }

  // Get user from token (async)
  static async getUserFromToken(): Promise<any> {
    const token = this.getAccessToken();
    return token ? await TokenValidation.getUserFromToken(token) : null;
  }

  // Initialize auth state from storage (async)
  static async initializeAuth(): Promise<boolean> {
    const user = TokenManager.getUser();
    const accessToken = TokenManager.getAccessToken();

    if (user && accessToken) {
      const isValid = await TokenValidation.isTokenValid(accessToken);
      if (isValid) {
        console.warn("AuthService.initializeAuth needs refactoring to dispatch setCredentials.");
        // Placeholder for refactoring:
        // getStore().dispatch(setCredentials({ user, accessToken, isAuthenticated: true }));
        return true;
      }
    }
    return false;
  }

  // Clear all auth data
  static clearAuth() {
    TokenManager.clearTokens();
    console.warn("AuthService.clearAuth needs refactoring to dispatch logout.");
    // Placeholder for refactoring:
    // getStore().dispatch(logout());
  }

  // Handle token expiration
  static handleTokenExpiration() {
    this.clearAuth();
    if (typeof window !== 'undefined') {
      window.location.href = '/login?expired=true';
    }
  }

  // Validate and update user (async)
  static async validateAndUpdateUser(): Promise<boolean> {
    const token = this.getAccessToken();
    if (!token) return false;

    const validationResult = await TokenValidation.validateToken(token);
    if (validationResult.isValid && validationResult.user) {
      const userWithNumberId = {
        ...validationResult.user,
        id: parseInt(validationResult.user.id, 10),
        avatarUrl: validationResult.user.avatarUrl || 'avater.png'
      };
      console.warn("AuthService.validateAndUpdateUser needs refactoring to dispatch updateUser.");
      // Placeholder for refactoring:
      // getStore().dispatch(updateUser(userWithNumberId));
      return true;
    }
    return false;
  }
}
