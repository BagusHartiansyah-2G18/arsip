import { Service, ServicesResponse } from '@/types/api';
import { fetchData, createItem, deleteItem, updateItem } from '@/lib/actions';
import { ServiceQueryParams } from '@/types/forms';
import { getApiToken } from './config';
import { throwIfStatusError } from '@/lib/errors';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Get all services with optional query parameters
export async function getServices(params?: ServiceQueryParams): Promise<Service[]> {
    try {
        // Build query parameters object
        const queryParams: Record<string, string | number | boolean> = {};

        if (params) {
            if (params.id) queryParams.id = params.id;
            if (params.page) queryParams.page = params.page;
            if (params.limit) queryParams.limit = params.limit;
            if (params.all) queryParams.all = true;
        }

        const endpoint = buildRouteWithQuery(API_ROUTES.SERVICE, queryParams);

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as ServicesResponse | Service[];
        throwIfStatusError(resp as unknown);
        return Array.isArray(resp) ? (resp as Service[]) : ((resp as ServicesResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Create a new service
export async function createService(formData: FormData): Promise<Service> {
    try {
        const token = await getApiToken();
        const data = await createItem<Service>(API_ROUTES.SERVICE, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Update an existing service
export async function updateService(id: string, formData: FormData): Promise<Service> {
    try {
        const token = await getApiToken();
        const data = await updateItem<Service>(API_ROUTES.SERVICE, id, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Delete a service
export async function deleteService(id: string): Promise<void> {
    try {
        const token = await getApiToken();
        await deleteItem(API_ROUTES.SERVICE, id, token);
    } catch (error) {
        throw error;
    }
}

// Get a single service by ID
export async function getServiceById(id: string): Promise<Service> {
    try {
        const endpoint = buildRouteWithQuery(API_ROUTES.SERVICE, { id });
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as ServicesResponse | Service[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as ServicesResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}
