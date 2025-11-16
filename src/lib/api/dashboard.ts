import { Announcement, Destination, Event } from '@/types';
import { fetchData } from '@/lib/actions';
import { DashboardQueryParams } from '@/types/forms';
import { getApiToken } from './config';
import { throwIfStatusError } from '@/lib/errors';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Dashboard data structure from actual API response
export interface DashboardData {
    events: number;
    announcements: number;
    services: number;
    total: number;
}

// Dashboard statistics (for potential future use)
export interface DashboardStatistics {
    eventsThisMonth?: number;
    announcementsThisMonth?: number;
    totalViews?: number;
    popularDestinations?: Destination[];
}

// Dashboard analytics (for potential future use)
export interface DashboardAnalytics {
    period?: string;
    startDate?: string;
    endDate?: string;
    analytics?: {
        events: number;
        announcements: number;
        views: number;
    };
}

// Legacy interface for backward compatibility
export interface LegacyDashboardData {
    totalEvents?: number;
    totalAnnouncements?: number;
    totalServices?: number;
    totalUsers?: number;
    totalDestinations?: number;
    recentEvents?: Event[];
    recentAnnouncements?: Announcement[];
    statistics?: DashboardStatistics;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow for additional dynamic properties
}

// Get dashboard data
export async function getDashboardData(): Promise<DashboardData> {
    try {
        const endpoint = API_ROUTES.DASHBOARD;
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as DashboardData[];
        throwIfStatusError(resp as unknown);
        return resp[0]; // Return first item since dashboard data is typically a single object
    } catch (error) {
        throw error;
    }
}

// Get dashboard statistics (if separate endpoint exists)
export async function getDashboardStats(): Promise<DashboardStatistics> {
    try {
        const endpoint = `${API_ROUTES.DASHBOARD}/stats`;
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as DashboardStatistics[];
        throwIfStatusError(resp as unknown);
        return resp[0]; // Return first item since stats is typically a single object
    } catch (error) {
        throw error;
    }
}

// Get dashboard analytics (if separate endpoint exists)
export async function getDashboardAnalytics(params?: DashboardQueryParams): Promise<DashboardAnalytics> {
    try {
        // Build query parameters object
        const queryParams: Record<string, string | number | boolean> = {};

        if (params) {
            if (params.startDate) queryParams.start_date = params.startDate;
            if (params.endDate) queryParams.end_date = params.endDate;
            if (params.period) queryParams.period = params.period;
        }

        const endpoint = buildRouteWithQuery(`${API_ROUTES.DASHBOARD}/analytics`, queryParams);

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as DashboardAnalytics[];
        throwIfStatusError(resp as unknown);
        return resp[0];
    } catch (error) {
        throw error;
    }
}
