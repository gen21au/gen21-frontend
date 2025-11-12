// console.log('NEXT_PUBLIC_BASE_API_URL:', process.env.NEXT_PUBLIC_BASE_API_URL);
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'https://app.gen21.com.au/api';

export const API_ENDPOINTS = {
    //Auth
    LOGIN: '/login?version=2',
    REGISTER: '/register?version=2',
    FORGOT_PASSWORD: '/password-reset?version=2',
    RESET_PASSWORD: '/submit-password-reset?version=2',
    USER_PROFILE: '/user',
    LOGOUT: '/logout?version=2',

    //Home page APIs
    CATEGORIES: '/categories?version=2',
    FEATURE_SERVICES: '/feature_e_services?version=2',
    E_SERVICES: '/e_services',
    BLOGS: '/fetch-blogs?version=2',
    MEDIA_CENTERS: '/fetch-media-centres?version=2',
    ALL_CATEGORY_SERVICES: '/all-category-services?version=2',
    ADVANCED_SEARCH: '/advanced-search',
    ORDER_LIST: '/order-list',
    PROFILE_UPDATE: '/users',
    PARTNER_REQUESTS: '/partner_requests',
    FAQS: '/web-faqs?version=2',
    ADDRESS: '/addresses',
    BOOKING_REQUEST: '/booking-request',
    INITIATE_PAYMENT: '/sslcommerz_payment/initiate',
    PAYMENT_STATUS: '/sslcommerz_payment/status',
    SEND_REQUEST: '/send-request',
    CUSTOM_PAGE: '/custom_pages/slug',
}
