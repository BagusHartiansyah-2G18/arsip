import { Announcement, AnnouncementsResponse } from '@/types/api';
import { fetchData, createItem, deleteItem, updateItem } from '@/lib/actions';
import { AnnouncementQueryParams } from '@/types/forms';
import { getApiToken } from './config';
import { throwIfStatusError } from '@/lib/errors';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Get all announcements with optional query parameters
export async function getAnnouncements(params?: AnnouncementQueryParams): Promise<Announcement[]> {
    try {
        // Build query parameters object
        const queryParams: Record<string, string | number | boolean> = {};

        if (params) {
            if (params.id) queryParams.id = params.id;
            if (params.slug) queryParams.slug = params.slug;
            if (params.page) queryParams.page = params.page;
            if (params.limit) queryParams.limit = params.limit;
            if (params.all) queryParams.all = true;
        }

        const endpoint = buildRouteWithQuery(API_ROUTES.ANNOUNCEMENT, queryParams);

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as AnnouncementsResponse | Announcement[];
        throwIfStatusError(resp as unknown);
        return Array.isArray(resp) ? (resp as Announcement[]) : ((resp as AnnouncementsResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Create a new announcement
export async function createAnnouncement(formData: FormData): Promise<Announcement> {
    try {
        const token = await getApiToken();
        const data = await createItem<Announcement>(API_ROUTES.ANNOUNCEMENT, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Update an existing announcement
export async function updateAnnouncement(id: string, formData: FormData): Promise<Announcement> {
    try {
        const token = await getApiToken();
        const data = await updateItem<Announcement>(API_ROUTES.ANNOUNCEMENT, id, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Delete an announcement
export async function deleteAnnouncement(id: string): Promise<void> {
    try {
        const token = await getApiToken();
        await deleteItem(API_ROUTES.ANNOUNCEMENT, id, token);
    } catch (error) {
        throw error;
    }
}

// Get a single announcement by ID
export async function getAnnouncementById(id: string): Promise<Announcement> {
    try {
        const endpoint = buildRouteWithQuery(API_ROUTES.ANNOUNCEMENT, { id });
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as AnnouncementsResponse | Announcement[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as AnnouncementsResponse).data;
        return list[0];
    } catch (error) {
        throw error;
    }
}

// Get announcements by slug
export async function getAnnouncementBySlug(slug: string): Promise<Announcement> {
    try {
        const endpoint = buildRouteWithQuery(API_ROUTES.ANNOUNCEMENT, { slug });
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as AnnouncementsResponse | Announcement[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as AnnouncementsResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}
