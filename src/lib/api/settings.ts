import { Setting, SettingsResponse } from '@/types/api';
import { fetchData, createItem, deleteItem, updateItem } from '@/lib/actions';
import { SettingQueryParams } from '@/types/forms';
import { getApiToken } from './config';
import { throwIfStatusError } from '@/lib/errors';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Get all settings with optional query parameters
export async function getSettings(params?: SettingQueryParams): Promise<Setting[]> {
    try {
        // Build query parameters object
        const queryParams: Record<string, string | number | boolean> = {};

        if (params) {
            if (params.id) queryParams.id = params.id;
            if (params.page) queryParams.page = params.page;
            if (params.limit) queryParams.limit = params.limit;
            if (params.all) queryParams.all = true;
        }

        const endpoint = buildRouteWithQuery(API_ROUTES.SETTING, queryParams);

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as SettingsResponse | Setting[];
        throwIfStatusError(resp as unknown);
        return Array.isArray(resp) ? (resp as Setting[]) : ((resp as SettingsResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Create a new setting
export async function createSetting(formData: FormData): Promise<Setting> {
    try {
        const token = await getApiToken();
        const data = await createItem<Setting>(API_ROUTES.SETTING, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Update an existing setting
export async function updateSetting(id: string, formData: FormData): Promise<Setting> {
    try {
        const token = await getApiToken();
        const data = await updateItem<Setting>(API_ROUTES.SETTING, id, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Delete a setting
export async function deleteSetting(id: string): Promise<void> {
    try {
        const token = await getApiToken();
        await deleteItem(API_ROUTES.SETTING, id, token);
    } catch (error) {
        throw error;
    }
}

// Get a single setting by ID
export async function getSettingById(id: string): Promise<Setting> {
    try {
        const endpoint = buildRouteWithQuery(API_ROUTES.SETTING, { id });
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as SettingsResponse | Setting[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as SettingsResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}

// Get the first/current setting (commonly used for site settings)
export async function getCurrentSetting(): Promise<Setting | null> {
    try {
        const response = await getSettings({ all: true });
        return response.length > 0 ? response[0] : null;
    } catch (error) {
        throw error;
    }
}
