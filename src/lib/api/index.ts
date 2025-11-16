// Export all API functions from their respective modules
export * from './auth';
export * from './dashboard';
// export * from './events';
// export * from './services';
// export * from './announcements';
// export * from './settings';
export * from './files';
export * from './config';
// export * from './destinations';
// export * from './flow-destinations';
export * from './pendaftaran';
// export * from './wilayah';
// export * from './tag-destinations';
// export * from './galleries';

// Re-export types for convenience
export type { AuthResponse } from './auth';
export type {
    DashboardData,
    DashboardStatistics,
    DashboardAnalytics,
    LegacyDashboardData
} from './dashboard';

// Re-export types from their new locations
export type {
    LoginFormData,
    RegisterFormData,
    EventFormData,
    ServiceFormData,
    AnnouncementFormData,
    SettingFormData,
    EventFormDataMultipart,
    ServiceFormDataMultipart,
    AnnouncementFormDataMultipart,
    SettingFormDataMultipart,
    EventQueryParams,
    ServiceQueryParams,
    AnnouncementQueryParams,
    SettingQueryParams,
    DashboardQueryParams,
    PaginatedResponse,
    FileUploadResponse,
    ApiError
} from '@/types/forms';

export type { StoredUser } from '@/hooks/auth';
