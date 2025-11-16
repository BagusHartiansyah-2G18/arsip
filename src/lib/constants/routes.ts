/**
 * API Routes Configuration
 * Based on Bruno API collection structure
 * 
 * This file contains all API endpoint routes to prevent typos
 * and ensure consistency across the application.
 */

// Main API Routes
export const API_ROUTES = {
    arsip:{
        pendataan:'pendataan',
        bidang:'bidang',
        pendataanEdit:'pendataan/edit',
        opsForm:'namaform',
        analisis:{
            sumber:"analisis/sumber",
            form:"analisis/form"
            // form:"analisis/form"
            // form:"analisis/form"
            // form:"analisis/form"
        }
    }, 
    
    // Dashboard
    DASHBOARD: 'dashboard',
    // [BTS DELETE]
    // Core Resources
    DESTINATION: 'destination',
    EVENT: 'events',
    ANNOUNCEMENT: 'announcements',
    SERVICE: 'services',
    SETTING: 'setting',
    USER: 'user',

    // Category & Flow Destinations
    CATEGORY_DESTINATION: 'ctg-destination',
    FLOW_DESTINATION: 'flow-destination',
    TAG_DESTINATION: 'tag-destination',
    GALLERY: 'gallery',

    // Wilayah (Geographic)
    KECAMATAN: 'kecamatan',
    DESA: 'desa',


    // Authentication
    AUTH: {
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        VERIFY: 'auth/verify',
        LOGOUT: 'auth/logout',
        REFRESH: 'auth/refresh',
    },

    // File Uploads
    UPLOADS: 'uploads',
} as const;

// Type for route keys
export type ApiRouteKey = keyof typeof API_ROUTES;

// Helper function to get route by key
export const getRoute = (key: ApiRouteKey): string => {
    return API_ROUTES[key] as string;
};

// Helper function to get auth route
export const getAuthRoute = (key: keyof typeof API_ROUTES.AUTH): string => {
    return API_ROUTES.AUTH[key];
};

// Route builders for common patterns
export const buildRouteWithId = (route: string, id: string | number): string => {
    return `${route}/${id}`;
};

export const buildRouteWithQuery = (route: string, params: Record<string, string | number | boolean>): string => {
    const queryString = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            queryString.append(key, String(value));
        }
    });

    return queryString.toString() ? `${route}?${queryString.toString()}` : route;
};

// Common query parameters
export const QUERY_PARAMS = {
    ALL: 'all',
    PAGE: 'page',
    LIMIT: 'limit',
    SEARCH: 'search',
    ID: 'id',
    SLUG: 'slug',
    SORT: 'sort',
    ORDER: 'order',
} as const;

// Default values
export const DEFAULT_VALUES = {
    PAGE: 1,
    LIMIT: 20,
    ORDER: 'desc' as const,
} as const;