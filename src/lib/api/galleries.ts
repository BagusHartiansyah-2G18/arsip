'use client'

import { Gallery, GalleryResponse } from '@/types/api';
import { fetchData, createItem, deleteItem, updateItem } from '@/lib/actions';
import { getApiToken } from './config';
import { throwIfStatusError } from '@/lib/errors';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Get all galleries with optional query parameters
export async function getGalleries(params?: { id?: string; page?: number; limit?: number; all?: boolean }): Promise<Gallery[]> {
    try {
        // Build query parameters object
        const queryParams: Record<string, string | number | boolean> = {};

        if (params) {
            if (params.id) queryParams.id = params.id;
            if (params.page) queryParams.page = params.page;
            if (params.limit) queryParams.limit = params.limit;
            if (params.all) queryParams.all = true;
        }

        const endpoint = buildRouteWithQuery(API_ROUTES.GALLERY, queryParams);

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as GalleryResponse | Gallery[];
        throwIfStatusError(resp as unknown);
        return Array.isArray(resp) ? (resp as Gallery[]) : ((resp as GalleryResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Create a new gallery
export async function createGallery(formData: FormData): Promise<Gallery> {
    try {
        const token = await getApiToken();
        const data = await createItem<Gallery>(API_ROUTES.GALLERY, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Update an existing gallery
export async function updateGallery(id: string, formData: FormData): Promise<Gallery> {
    try {
        const token = await getApiToken();
        const data = await updateItem<Gallery>(API_ROUTES.GALLERY, id, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Delete a gallery
export async function deleteGallery(id: string): Promise<void> {
    try {
        const token = await getApiToken();
        await deleteItem(API_ROUTES.GALLERY, id, token);
    } catch (error) {
        throw error;
    }
}

// Get a single gallery by ID
export async function getGalleryById(id: string): Promise<Gallery> {
    try {
        const endpoint = buildRouteWithQuery(API_ROUTES.GALLERY, { id });
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as GalleryResponse | Gallery[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as GalleryResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}
