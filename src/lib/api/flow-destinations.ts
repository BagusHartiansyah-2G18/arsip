import { throwIfStatusError } from '@/lib/errors';
import { getApiToken } from './config';
import { DestinationPath } from '@/types/api';
import { fetchData, createItem, updateItem, deleteItem } from '@/lib/actions';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Query parameters for flow destination filtering
export interface FlowDestinationQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    destination_id?: string | number;
    sort?: 'created_at' | 'updated_at' | 'title';
    order?: 'asc' | 'desc';
}

// Response types
export interface FlowDestinationsResponse {
    data: DestinationPath[];
    total: number;
    page: number;
    limit: number;
}

// Get all flow destinations with optional filtering
export async function getFlowDestinations(params?: FlowDestinationQueryParams): Promise<DestinationPath[]> {
    try {
        // Build query parameters object
        const queryParams: Record<string, string | number | boolean> = {};

        if (params) {
            if (params.page) queryParams.page = params.page;
            if (params.limit) queryParams.limit = params.limit;
            if (params.search) queryParams.search = params.search;
            if (params.destination_id) queryParams.destination_id = params.destination_id;
            if (params.sort) queryParams.sort = params.sort;
            if (params.order) queryParams.order = params.order;
        }

        const endpoint = buildRouteWithQuery(API_ROUTES.FLOW_DESTINATION, queryParams);

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as FlowDestinationsResponse | DestinationPath[];
        throwIfStatusError(resp as unknown);

        return Array.isArray(resp) ? (resp as DestinationPath[]) : ((resp as FlowDestinationsResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Create a new flow destination
export async function createFlowDestination(formData: FormData): Promise<DestinationPath> {
    try {
        const endpoint = API_ROUTES.FLOW_DESTINATION;
        const token = await getApiToken();
        const data = await createItem<DestinationPath>(endpoint, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Update an existing flow destination
export async function updateFlowDestination(id: string, formData: FormData): Promise<DestinationPath> {
    try {
        const endpoint = API_ROUTES.FLOW_DESTINATION;
        const token = await getApiToken();
        const data = await updateItem<DestinationPath>(endpoint, id, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Delete a flow destination
export async function deleteFlowDestination(id: string): Promise<void> {
    try {
        const endpoint = API_ROUTES.FLOW_DESTINATION;
        const token = await getApiToken();
        await deleteItem(endpoint, id, token);
    } catch (error) {
        throw error;
    }
}

// Get flow destination by ID
export async function getFlowDestinationById(id: string): Promise<DestinationPath> {
    try {
        const endpoint = `${API_ROUTES.FLOW_DESTINATION}/${id}`;
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as FlowDestinationsResponse | DestinationPath[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as FlowDestinationsResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}
