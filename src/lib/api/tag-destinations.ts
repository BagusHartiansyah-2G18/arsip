'use client'

import { TagDestination, TagDestinationResponse } from '@/types/api';
import { fetchData, createItem, deleteItem, updateItem } from '@/lib/actions';
import { getApiToken } from './config';
import { throwIfStatusError } from '@/lib/errors';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Get all tag destinations with optional query parameters
export async function getTagDestinations(params?: { id?: string; page?: number; limit?: number; all?: boolean }): Promise<TagDestination[]> {
    try {
        // Build query parameters object
        const queryParams: Record<string, string | number | boolean> = {};

        if (params) {
            if (params.id) queryParams.id = params.id;
            if (params.page) queryParams.page = params.page;
            if (params.limit) queryParams.limit = params.limit;
            if (params.all) queryParams.all = true;
        }

        const endpoint = buildRouteWithQuery(API_ROUTES.TAG_DESTINATION, queryParams);

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as TagDestinationResponse | TagDestination[];
        throwIfStatusError(resp as unknown);
        return Array.isArray(resp) ? (resp as TagDestination[]) : ((resp as TagDestinationResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Create a new tag destination
export async function createTagDestination(formData: FormData): Promise<TagDestination> {
    try {
        const token = await getApiToken();
        const data = await createItem<TagDestination>(API_ROUTES.TAG_DESTINATION, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Update an existing tag destination
export async function updateTagDestination(id: string, formData: FormData): Promise<TagDestination> {
    try {
        const token = await getApiToken();
        const data = await updateItem<TagDestination>(API_ROUTES.TAG_DESTINATION, id, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Delete a tag destination
export async function deleteTagDestination(id: string): Promise<void> {
    try {
        const token = await getApiToken();
        await deleteItem(API_ROUTES.TAG_DESTINATION, id, token);
    } catch (error) {
        throw error;
    }
}

// Get a single tag destination by ID
export async function getTagDestinationById(id: string): Promise<TagDestination> {
    try {
        const endpoint = buildRouteWithQuery(API_ROUTES.TAG_DESTINATION, { id });
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as TagDestinationResponse | TagDestination[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as TagDestinationResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}
