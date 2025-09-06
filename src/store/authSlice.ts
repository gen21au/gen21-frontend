import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenManager } from '@/utils/tokenManager';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

// Initialize state from localStorage if available
const getInitialState = async (): Promise<AuthState> => {
  if (typeof window !== 'undefined') {
    const user = TokenManager.getUser();
    const accessToken = TokenManager.getAccessToken();
    
    if (user && accessToken) {
      // Validate token asynchronously
      const isValid = await TokenManager.isAuthenticated();
      return {
        user,
        accessToken,
        isAuthenticated: isValid,
      };
    }
  }
  
  return {
    user: null,
    accessToken: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      
      // Store tokens in TokenManager
      if (action.payload.accessToken && action.payload.user) {
        TokenManager.setTokens(
          action.payload.accessToken,
          action.payload.user
        );
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      
      // Clear tokens from TokenManager
      TokenManager.clearTokens();
    },
    updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      
      // Update tokens in TokenManager
      if (state.user) {
        TokenManager.setTokens(
          action.payload.accessToken,
          state.user
        );
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      // Update user in TokenManager
      if (state.accessToken) {
        TokenManager.setTokens(
          state.accessToken,
          action.payload
        );
      }
    },
  },
});

export const { setCredentials, logout, updateTokens, updateUser } = authSlice.actions;
export default authSlice.reducer;
