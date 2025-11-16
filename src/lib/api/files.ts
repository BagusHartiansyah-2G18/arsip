import { getApiBaseUrl, getApiToken } from './config';
import { throwIfStatusError } from '@/lib/errors';
import { API_ROUTES } from '@/lib/constants';

// Get file from uploads directory
export async function getFile(folderName: string, fileName: string): Promise<Blob> {
    try {

        const response = await fetch(`${getApiBaseUrl()}/uploads/${folderName}/${fileName}`, {
            method: 'GET',
            cache: 'no-store',
        });

        throwIfStatusError(response as unknown);

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.log(`[FILES API] Error fetching file ${folderName}/${fileName}:`, error);
        throw error;
    }
}

// Get file URL (for direct access in img tags, etc.)
export function getFileUrl(folderName: string, fileName: string): string {
    return `${getApiBaseUrl()}/uploads/${folderName}/${fileName}`;
}

// Upload file (if the API supports file uploads)
export async function uploadFile(file: File, folderName?: string): Promise<{ url: string; filename: string }> {
    try {

        const formData = new FormData();
        formData.append('file', file);
        if (folderName) {
            formData.append('folder', folderName);
        }

        const token = await getApiToken();
        const headers: HeadersInit = token ? {
            'Authorization': `Bearer ${token}`,
        } : {};

        const response = await fetch(`${getApiBaseUrl()}/${API_ROUTES.UPLOADS}`, {
            method: 'POST',
            headers,
            body: formData,
        });

        throwIfStatusError(response as unknown);

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`[FILES API] Error uploading file ${file.name}:`, error);
        throw error;
    }
}

// Delete file (if the API supports file deletion)
export async function deleteFile(folderName: string, fileName: string): Promise<void> {
    try {

        const token = await getApiToken();
        const headers: HeadersInit = token ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        } : {};

        const response = await fetch(`${getApiBaseUrl()}/uploads/${folderName}/${fileName}`, {
            method: 'DELETE',
            headers,
        });

        throwIfStatusError(response as unknown);

    } catch (error) {
        console.log(`[FILES API] Error deleting file ${folderName}/${fileName}:`, error);
        throw error;
    }
}

// List files in a folder (if the API supports directory listing)
export async function listFiles(folderName: string): Promise<string[]> {
    try {

        const token = await getApiToken();
        const headers: HeadersInit = token ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        } : {};

        const response = await fetch(`${getApiBaseUrl()}/uploads/${folderName}`, {
            method: 'GET',
            headers,
            cache: 'no-store',
        });

        throwIfStatusError(response as unknown);

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`[FILES API] Error listing files in folder ${folderName}:`, error);
        throw error;
    }
}

// Get file info/metadata (if the API supports it)
export async function getFileInfo(folderName: string, fileName: string): Promise<{
    name: string;
    size: number;
    type: string;
    lastModified: string;
    url: string;
}> {
    try {

        const token = await getApiToken();
        const headers: HeadersInit = token ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        } : {};

        const response = await fetch(`${getApiBaseUrl()}/uploads/${folderName}/${fileName}/info`, {
            method: 'GET',
            headers,
            cache: 'no-store',
        });

        throwIfStatusError(response as unknown);

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`[FILES API] Error getting file info ${folderName}/${fileName}:`, error);
        throw error;
    }
}
