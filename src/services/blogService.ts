import { apiSlice } from '@/store/apiSlice';
import { BlogResponse } from '@/types/blog';

export const blogService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get blogs with pagination
    getBlogs: builder.query({
      query: (page = 1) => `/fetch-blogs?version=2&page=${page}`,
      transformResponse: (response: BlogResponse) => response.data,
    }),
    // Get single blog by slug
    getBlogBySlug: builder.query({
      query: (slug: string) => `/fetch-blogs?version=2&slug=${slug}`,
      transformResponse: (response: BlogResponse) => response.data.data[0],
    }),
  }),
});

export const {
  useGetBlogsQuery: useGetBlogsServiceQuery,
  useGetBlogBySlugQuery: useGetBlogBySlugServiceQuery,
} = blogService;
