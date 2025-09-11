import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, ForgotPasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest, User } from '@/types/auth';
import { CategoryType, FeatureServiceType } from '@/types/services';
import { API_ENDPOINTS, BASE_API_URL } from "@/utils/api_endpoints";
import { RootState } from '@/store/store';


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.accessToken;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // Feature Services endpoint
    getFeatureServices: builder.query<FeatureServiceType[], void>({
      query: () => API_ENDPOINTS.FEATURE_SERVICES,
      transformResponse: (response: { data: Array<{ 
        id: number
        name: { en: string }
        media: Array<{ url: string }>
        color: string;
        has_media: boolean;
        featured: boolean;
        price: number;
        discount_price: number;
      }> }) => response.data,
    }),
    getCategories: builder.query<CategoryType[], void>({
      query: () => API_ENDPOINTS.CATEGORIES,
      transformResponse: (response: { data: Array<{ 
        id: number
        name: { en: string }
        media: Array<{ url: string }>
        color: string;
        has_media: boolean;
        featured: boolean;
      }> }) => response.data,
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ENDPOINTS.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.REGISTER,
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.FORGOT_PASSWORD,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: ({ token, password }) => ({
        url: API_ENDPOINTS.RESET_PASSWORD,
        method: 'POST',
        body: { token, password },
      }),
    }),
    validateToken: builder.query<User, void>({
      query: () => '/',
    }),
    
  }),
});

export const { 
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateTokenQuery,
  useGetFeatureServicesQuery,
  useGetCategoriesQuery,
 } = apiSlice;
