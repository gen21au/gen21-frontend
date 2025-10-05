import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, ForgotPasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest, User, UserRequest, ValidateTokenResponse } from '@/types/auth';
import { CategoryType, FeatureServiceType, EServiceType, AllCategoryServicesResponse, CategoryWithServices, AdvancedSearchResponse } from '@/types/services';
import { Order } from '@/types/orders'; // Import Order type
import { API_ENDPOINTS, BASE_API_URL } from "@/utils/api_endpoints";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth?.accessToken;
    //   if (token) headers.set('Authorization', `Bearer ${token}`);
    //   return headers;
    // }
  }),
  tagTypes: ['User', 'Order'], // Define tag types
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
    validateToken: builder.query<User, UserRequest>({
      query: ({ api_token }) => `${API_ENDPOINTS.USER_PROFILE}?api_token=${api_token}`,
      transformResponse: (response: ValidateTokenResponse) => response.data,
      providesTags: ['User'], // Provide 'User' tag
    }),
    // Service Details endpoint
    getServiceDetails: builder.query<EServiceType, number>({
      query: (id) => `/e_services/${id}?version=2`,
      transformResponse: (response: { success: boolean; data: EServiceType; message: string }) => response.data,
    }),
    // All Category Services endpoint
    getAllCategoryServices: builder.query<CategoryWithServices[], void>({
      query: () => API_ENDPOINTS.ALL_CATEGORY_SERVICES,
      transformResponse: (response: AllCategoryServicesResponse) => response.data,
    }),
    // Single Category endpoint
    getCategoryById: builder.query<CategoryType, number>({
      query: (id) => `/categories/${id}?version=2`,
      transformResponse: (response: { success: boolean; data: CategoryType; message: string }) => response.data,
    }),
    // Advanced Search endpoint
    getAdvancedSearch: builder.query<AdvancedSearchResponse['data'], string>({
      query: (keyword) => `${API_ENDPOINTS.ADVANCED_SEARCH}?version=2&keyword=${encodeURIComponent(keyword)}`,
      transformResponse: (response: AdvancedSearchResponse) => response.data,
    }),
    // Orders endpoint
    getOrders: builder.query<Order[], string>({
      query: (token) => `${API_ENDPOINTS.ORDER_LIST}?api_token=${token}`,
      transformResponse: (response: { success: boolean; data: Order[]; message: string }) => response.data,
      providesTags: ['Order'], // Provide 'Order' tag
    }),
    updateProfile: builder.mutation<User, { id: number; data: Partial<User> | FormData; token: string }>({
      query: ({ id, data, token }) => {
        const isFormData = data instanceof FormData;
        return {
          url: `${API_ENDPOINTS.PROFILE_UPDATE}/${id}?api_token=${token}`,
          method: 'POST',
          body: data,
          // If it's FormData, set content-type to undefined so browser sets it to multipart/form-data
          headers: isFormData ? { 'Content-Type': 'undefined' } : undefined,
        };
      },
      invalidatesTags: ['User'], // Invalidate 'User' tag on update
    }),
    // Partner Request endpoint
    submitPartnerRequest: builder.mutation<{ message: string }, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.PARTNER_REQUESTS,
        method: 'POST',
        body: formData,
        // FormData will automatically set the correct content-type
      }),
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
  useGetServiceDetailsQuery,
  useGetAllCategoryServicesQuery,
  useGetCategoryByIdQuery,
  useGetAdvancedSearchQuery,
  useGetOrdersQuery,
  useUpdateProfileMutation,
  useSubmitPartnerRequestMutation,
 } = apiSlice;
