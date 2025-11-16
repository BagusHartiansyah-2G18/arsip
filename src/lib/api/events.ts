import { Event, EventsResponse } from '@/types/api';
import { fetchData, createItem, deleteItem, updateItem } from '@/lib/actions';
import { EventQueryParams } from '@/types/forms';
import { getApiToken } from './config';
import { throwIfStatusError } from '@/lib/errors';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Get all events with optional query parameters
export async function getEvents(params?: EventQueryParams): Promise<Event[]> {
    try {
        // Build query parameters object
        const queryParams: Record<string, string | number | boolean> = {};

        if (params) {
            if (params.id) queryParams.id = params.id;
            if (params.page) queryParams.page = params.page;
            if (params.limit) queryParams.limit = params.limit;
            if (params.all) queryParams.all = true;
        }

        const endpoint = buildRouteWithQuery(API_ROUTES.EVENT, queryParams);

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as EventsResponse | Event[];
        throwIfStatusError(resp as unknown);
        return Array.isArray(resp) ? (resp as Event[]) : ((resp as EventsResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Create a new event
export async function createEvent(formData: FormData): Promise<Event> {
    try {
        const token = await getApiToken();
        const data = await createItem<Event>(API_ROUTES.EVENT, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Update an existing event
export async function updateEvent(id: string, formData: FormData): Promise<Event> {
    try {
        const token = await getApiToken();
        const data = await updateItem<Event>(API_ROUTES.EVENT, id, formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

// Delete an event
export async function deleteEvent(id: string): Promise<void> {
    try {

        const token = await getApiToken();
        await deleteItem(API_ROUTES.EVENT, id, token);
    } catch (error) {
        throw error;
    }
}

// Get a single event by ID
export async function getEventById(id: string): Promise<Event> {
    try {
        const endpoint = buildRouteWithQuery(API_ROUTES.EVENT, { id });
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as EventsResponse | Event[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as EventsResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}
