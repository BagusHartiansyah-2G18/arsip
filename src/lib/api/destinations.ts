import { throwIfStatusError } from '@/lib/errors';
import { getApiToken } from './config';
import { Destination } from '@/types/api';
import { fetchData, createItem, updateItem, deleteItem } from '@/lib/actions';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Query parameters for destination filtering
export interface DestinationQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    ctg_destination_id?: string | number;
    kecamatan_id?: string | number;
    desa_id?: string | number;
    sort?: 'created_at' | 'updated_at' | 'title' | 'views';
    order?: 'asc' | 'desc';
}

// Response types
export interface DestinationsResponse {
    data: Destination[];
    total: number;
    page: number;
    limit: number;
}

// Get all destinations with optional filtering
export async function getDestinations(params?: DestinationQueryParams): Promise<Destination[]> {
    try {
        // Build query parameters object
        const queryParams: Record<string, string | number | boolean> = {};

        if (params) {
            if (params.page) queryParams.page = params.page;
            if (params.limit) queryParams.limit = params.limit;
            if (params.search) queryParams.search = params.search;
            if (params.ctg_destination_id) queryParams.ctg_destination_id = params.ctg_destination_id;
            if (params.kecamatan_id) queryParams.kecamatan_id = params.kecamatan_id;
            if (params.desa_id) queryParams.desa_id = params.desa_id;
            if (params.sort) queryParams.sort = params.sort;
            if (params.order) queryParams.order = params.order;
        }

        const endpoint = buildRouteWithQuery(API_ROUTES.DESTINATION, queryParams);

        const token = await getApiToken();
        console.log({ token });
        const resp = await fetchData<unknown>(endpoint, token) as DestinationsResponse | Destination[];

        throwIfStatusError(resp as unknown);

        return Array.isArray(resp) ? (resp as Destination[]) : ((resp as DestinationsResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Create a new destination
export async function createDestination(formData: FormData): Promise<Destination> {
    try {
        const endpoint = API_ROUTES.DESTINATION;
        const token = await getApiToken();
        const data = await createItem<Destination>(endpoint, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Update an existing destination
export async function updateDestination(id: string, formData: FormData): Promise<Destination> {
    try {
        const endpoint = API_ROUTES.DESTINATION;
        const token = await getApiToken();
        const data = await updateItem<Destination>(endpoint, id, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Delete a destination
export async function deleteDestination(id: string): Promise<void> {
    try {
        const endpoint = API_ROUTES.DESTINATION;
        const token = await getApiToken();
        await deleteItem(endpoint, id, token);
    } catch (error) {
        throw error;
    }
}

// Get destination by ID
export async function getDestinationById(id: string): Promise<Destination> {
    try {
        const endpoint = buildRouteWithQuery(API_ROUTES.DESTINATION, { id });
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as DestinationsResponse | Destination[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as DestinationsResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}
