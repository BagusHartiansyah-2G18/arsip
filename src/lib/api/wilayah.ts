import { throwIfStatusError } from '@/lib/errors';
import { getApiToken } from './config';
import { Kecamatan, Desa } from '@/types/api';
import { fetchData } from '@/lib/actions';
import { API_ROUTES } from '@/lib/constants';

// Query parameters for kecamatan filtering
export interface KecamatanQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sort?: 'created_at' | 'updated_at' | 'name';
    order?: 'asc' | 'desc';
}

// Query parameters for desa filtering
export interface DesaQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    kecamatan_id?: string | number;
    sort?: 'created_at' | 'updated_at' | 'name';
    order?: 'asc' | 'desc';
}

// Response types
export interface KecamatansResponse {
    data: Kecamatan[];
    total: number;
    page: number;
    limit: number;
}

export interface DesasResponse {
    data: Desa[];
    total: number;
    page: number;
    limit: number;
}

// Extended Kecamatan with Desa data
export interface KecamatanWithDesa extends Kecamatan {
    desa?: Desa[];
}

export interface KecamatansWithDesaResponse {
    data: KecamatanWithDesa[];
    total: number;
    page: number;
    limit: number;
}

// ================= KECAMATAN API =================

// Get all kecamatans with optional filtering
export async function getKecamatans(params?: KecamatanQueryParams): Promise<Kecamatan[]> {
    try {
        let endpoint = API_ROUTES.KECAMATAN;
        const queryParams = new URLSearchParams();

        if (params) {
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.sort) queryParams.append('sort', params.sort);
            if (params.order) queryParams.append('order', params.order);
        }

        if (queryParams.toString()) {
            endpoint += `?${queryParams.toString()}`;
        }

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as KecamatansResponse | Kecamatan[];
        throwIfStatusError(resp as unknown);

        return Array.isArray(resp) ? (resp as Kecamatan[]) : ((resp as KecamatansResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Get kecamatan by ID
export async function getKecamatanById(id: string | number): Promise<Kecamatan> {
    try {
        const endpoint = `${API_ROUTES.KECAMATAN}/${id}`;
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as KecamatansResponse | Kecamatan[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as KecamatansResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}

// Get all kecamatans with their desa data
export async function getKecamatansWithDesa(params?: KecamatanQueryParams): Promise<KecamatanWithDesa[]> {
    try {
        let endpoint = `${API_ROUTES.KECAMATAN}/desa`;
        const queryParams = new URLSearchParams();

        if (params) {
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.sort) queryParams.append('sort', params.sort);
            if (params.order) queryParams.append('order', params.order);
        }

        if (queryParams.toString()) {
            endpoint += `?${queryParams.toString()}`;
        }

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as KecamatansWithDesaResponse | KecamatanWithDesa[];
        throwIfStatusError(resp as unknown);

        return Array.isArray(resp) ? (resp as KecamatanWithDesa[]) : ((resp as KecamatansWithDesaResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// ================= DESA API =================

// Get all desas with optional filtering
export async function getDesas(params?: DesaQueryParams): Promise<Desa[]> {
    try {
        let endpoint = API_ROUTES.DESA;
        const queryParams = new URLSearchParams();

        if (params) {
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.kecamatan_id) queryParams.append('kecamatan_id', params.kecamatan_id.toString());
            if (params.sort) queryParams.append('sort', params.sort);
            if (params.order) queryParams.append('order', params.order);
        }

        if (queryParams.toString()) {
            endpoint += `?${queryParams.toString()}`;
        }

        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as DesasResponse | Desa[];
        throwIfStatusError(resp as unknown);

        return Array.isArray(resp) ? (resp as Desa[]) : ((resp as DesasResponse).data ?? []);
    } catch (error) {
        throw error;
    }
}

// Get desa by ID
export async function getDesaById(id: string | number): Promise<Desa> {
    try {
        const endpoint = `${API_ROUTES.DESA}/${id}`;
        const token = await getApiToken();
        const resp = await fetchData<unknown>(endpoint, token) as DesasResponse | Desa[];
        throwIfStatusError(resp as unknown);
        const list = Array.isArray(resp) ? resp : (resp as DesasResponse).data;
        return list[0]; // Return first item, let API handle empty cases
    } catch (error) {
        throw error;
    }
}
