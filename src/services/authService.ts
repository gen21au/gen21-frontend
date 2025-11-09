import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from '@/store/store';
import { setCredentials, logout, updateUser } from '@/store/authSlice';
import { TokenManager } from '@/utils/tokenManager';
import { TokenValidation } from '@/utils/tokenValidation';
import { API_ENDPOINTS, BASE_API_URL } from '@/utils/api_endpoints';

// Create API slice
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_API_URL,
  prepareHeaders: (headers) => {
    const token = store.getState().auth.accessToken;
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`);
    // }
    return headers;
  }
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.LOGIN,
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: API_ENDPOINTS.REGISTER,
        method: 'POST',
        body: userData
      })
    })
  })
});

// Export hooks for usage in components
export const { useLoginMutation, useRegisterMutation } = authApi;

export class AuthService {
  // Login user
  static async login(email: string, password: string) {
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
      
      // Store tokens and user data
      store.dispatch(setCredentials({
        user: data.user,
        accessToken: data.accessToken,
        isAuthenticated: true,
      }));

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  static async logout() {
    try {
      const response = await fetch(`${BASE_API_URL}${API_ENDPOINTS.LOGOUT}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      store.dispatch(logout());
    } catch (error) {
      throw error;
    }
  }

  // Check if user is authenticated (async)
  static async isAuthenticated(): Promise<boolean> {
    const state = store.getState();
    if (!state.auth.isAuthenticated) return false;
    
    const token = state.auth.accessToken;
    if (!token) return false;
    
    return await TokenValidation.isTokenValid(token);
  }

  // Get current user
  static getCurrentUser() {
    const state = store.getState();
    return state.auth.user;
  }

  // Get access token
  static getAccessToken(): string | null {
    const state = store.getState();
    return state.auth.accessToken;
  }

  // Validate token (async)
  static async validateToken(): Promise<boolean> {
    const token = this.getAccessToken();
    return token ? await TokenValidation.isTokenValid(token) : false;
  }

  // Get user from token (async)
  static async getUserFromToken(): Promise<{id: string; avatarUrl: string} | null> {
    const token = this.getAccessToken();
    if (!token) return null;

    const user = await TokenValidation.getUserFromToken(token);
    return user ? {
      id: user.id.toString(),
      avatarUrl: user.avatarUrl || 'images/avatar.png'
    } : null;
  }

  // Initialize auth state from storage (async)
  static async initializeAuth(): Promise<boolean> {
    const user = TokenManager.getUser();
    const accessToken = TokenManager.getAccessToken();
    
    if (user && accessToken) {
      const isValid = await TokenValidation.isTokenValid(accessToken);
      if (isValid) {
        store.dispatch(setCredentials({
          user: {
            ...user,
            avatarUrl: user.avatarUrl ?? 'images/avatar.png', // Provide a default if undefined
          },
          accessToken,
          isAuthenticated: true,
        }));
        return true;
      }
    }
    
    return false;
  }

  // Clear all auth data
  static clearAuth() {
    TokenManager.clearTokens();
    store.dispatch(logout());
  }

  // Handle token expiration
  static handleTokenExpiration() {
    this.clearAuth();
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login?expired=true';
    }
  }

  // Validate and update user (async)
  static async validateAndUpdateUser(): Promise<boolean> {
    const token = this.getAccessToken();
    if (!token) return false;

    const validationResult = await TokenValidation.validateToken(token);
    if (validationResult.isValid && validationResult.data) {
      // Convert id from string to number to match the expected User type
      const userWithNumberId = {
        ...validationResult.data,
        id: typeof validationResult.data.id === 'string' ? parseInt(validationResult.data.id, 10) : validationResult.data.id,
        avatarUrl: validationResult.data.avatarUrl ?? 'images/avatar.png' // Default avatar image
      };
      store.dispatch(updateUser(userWithNumberId));
      return true;
    }

    return false;
  }
}
