import { throwIfStatusError } from '@/lib/errors';
import { getApiToken } from './config';
import { Iarsip } from '@/types/api';
import { fetchData, createItem, updateItem, deleteItem } from '@/lib/actions';
import { API_ROUTES, buildRouteWithQuery } from '@/lib/constants';

// Query parameters for category destination filtering
export interface queryParams {
    page?: number;
    limit?: number;
    search?: string;
    sort?: 'created_at' | 'updated_at' | 'title';
    order?: 'asc' | 'desc';
}

// Response types
export interface response {
    data: Iarsip[];
    total: number;
    page: number;
    limit: number;
}


export async function createPendataan(formData: FormData): Promise<Iarsip> {
    try {
        const endpoint = API_ROUTES.arsip.pendataan;
        const token = await getApiToken();
        // console.log(token);
        
        const data = await createItem<Iarsip>(endpoint, formData, token); 
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}
export async function updNamaForm(id: string, formData: FormData): Promise<Iarsip> {
    try {
        const endpoint = API_ROUTES.arsip.pendataan;
        const token = await getApiToken();
        const data = await updateItem<Iarsip>(endpoint, id,formData, token);
        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function updPendataan(id: string,formData: FormData): Promise<Iarsip> {
    try {
        const endpoint = API_ROUTES.arsip.pendataanEdit;
        const token = await getApiToken(); 
        const data = await updateItem<Iarsip>(endpoint, id,formData, token);

        throwIfStatusError(data as unknown);
        return data;
    } catch (error) {
        throw error;
    }
}


export async function delPendataan(id: string): Promise<void>  {
    try {
        const endpoint = API_ROUTES.arsip.pendataan;
        const token = await getApiToken(); 
        await deleteItem(endpoint, id, token); 
    } catch (error) {
        throw error;
    }
}  