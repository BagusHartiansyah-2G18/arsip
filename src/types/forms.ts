// Form types based on Bruno API collection body data

// ================= AUTHENTICATION FORMS =================

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    email: string;
    password: string;
    username: string;
    name: string;
}

// ================= EVENT FORMS =================

export interface EventFormData {
    title: string;
    description: string;
    start_date: string; // Format: YYYY-MM-DD
    end_date: string; // Format: YYYY-MM-DD
    url_location: string;
    banner?: File; // File upload for banner image
}

// Event form data for FormData (multipart)
export interface EventFormDataMultipart {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    url_location: string;
    banner?: File;
}

// ================= SERVICE FORMS =================

export interface ServiceFormData {
    title: string;
    url: string;
    icon?: File; // File upload for icon image
}

// Service form data for FormData (multipart)
export interface ServiceFormDataMultipart {
    title: string;
    url: string;
    icon?: File;
}

// ================= ANNOUNCEMENT FORMS =================

export interface AnnouncementFormData {
    title: string;
    description: string;
    posted_at: string; // Format: YYYY-MM-DD
    url_location: string;
    document?: File; // File upload for document
    event_id: string; // UUID of related event
}

// Announcement form data for FormData (multipart)
export interface AnnouncementFormDataMultipart {
    title: string;
    description: string;
    posted_at: string;
    url_location: string;
    document?: File;
    event_id: string;
}

// ================= SETTING FORMS =================

export interface SettingFormData {
    email: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    x: string; // Twitter/X
    youtube: string;
    banner?: File; // File upload for banner image
}

// Setting form data for FormData (multipart)
export interface SettingFormDataMultipart {
    email: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    x: string;
    youtube: string;
    banner?: File;
}

// ================= FILE UPLOAD FORMS =================

export interface FileUploadFormData {
    file: File;
    folder?: string; // Optional folder name
}

// ================= QUERY PARAMETER TYPES =================

export interface EventQueryParams {
    id?: string;
    page?: number;
    limit?: number;
    all?: boolean;
}

export interface ServiceQueryParams {
    all?: boolean;
    page?: number;
    id?: string;
    limit?: number;
}

export interface AnnouncementQueryParams {
    id?: string;
    slug?: string;
    page?: number;
    limit?: number;
    all?: boolean;
}

export interface SettingQueryParams {
    id?: string;
    page?: number;
    limit?: number;
    all?: boolean;
}

export interface DashboardQueryParams {
    startDate?: string;
    endDate?: string;
    period?: 'day' | 'week' | 'month' | 'year';
}

// ================= RESPONSE TYPES =================

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success?: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface FileUploadResponse {
    url: string;
    filename: string;
    size?: number;
    type?: string;
}

// ================= ERROR TYPES =================

export interface ApiError {
    message: string;
    status: number;
    code?: string;
    details?: unknown;
}

// ================= UTILITY TYPES =================

// Convert form data to FormData for multipart requests
export type ToFormData<T> = {
    [K in keyof T]: T[K] extends File ? File : string;
};

// Note: Form validation is now handled by Zod schemas in individual form components
// This provides better type safety and integration with react-hook-form
