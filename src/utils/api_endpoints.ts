// console.log('NEXT_PUBLIC_BASE_API_URL:', process.env.NEXT_PUBLIC_BASE_API_URL);
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'https://app.gen21.com.au/api';

export const API_ENDPOINTS = {
    //Auth
    LOGIN: '/login?version=2',
    REGISTER: '/register?version=2',
    FORGOT_PASSWORD: '/forgot-password?version=2',
    RESET_PASSWORD: '/send_reset_link_email?version=2',
    USER_PROFILE: '/user',
    LOGOUT: '/logout?version=2',

    //Home page APIs
    CATEGORIES: '/categories?version=2',
    FEATURE_SERVICES: '/feature_e_services?version=2',
    E_SERVICES: '/e_services',
    BLOGS: '/blogs?version=2',
    FAQS: '/faqs?version=2',
    ALL_CATEGORY_SERVICES: '/all-category-services?version=2',
    ADVANCED_SEARCH: '/advanced-search',
    ORDER_LIST: '/order-list',
    PROFILE_UPDATE: '/users',
}
