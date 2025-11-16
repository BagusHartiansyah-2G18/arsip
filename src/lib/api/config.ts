import { authStorageUtils } from "@/hooks";
import { getSession } from "next-auth/react";

// API Configuration
export const API_BASE_URL = 'http://localhost:3000';
export const API_ENDPOINT = `${API_BASE_URL}/api`;

// Environment-based configuration (optional)
export const getApiBaseUrl = (): string => {
    // You can add environment-based logic here
    return process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL;
};

// Get file URL for uploads (renamed to avoid conflict with files.ts)
export const getUploadedFile = (folder: string, file: string) => {
    return `${API_BASE_URL}/uploads/${folder}/${file}`
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

// API Token configuration - Client-side only
export const getApiToken = async (): Promise<string> => {
    // Only works on client-side
    if (typeof window === 'undefined') {
        console.warn('getApiToken should only be called on client-side');
        return '';
    }

    try {
        const token = authStorageUtils.getToken(); 
        if(!token) {
            const session = await getSession();
           
            return session?.accessToken || '';
        }
        return token || '';
    } catch (error) {
        console.warn('Could not get token from auth storage:', error);
        return '';
    }
};

// Default headers for API requests - Server-side only
export const getDefaultHeaders = async (includeAuth: boolean = true): Promise<HeadersInit> => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = await getApiToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

// Headers for multipart form data (file uploads) - Server-side only
export const getMultipartHeaders = async (includeAuth: boolean = true): Promise<HeadersInit> => {
    const headers: HeadersInit = {};

    if (includeAuth) {
        const token = await getApiToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};


// Create headers with token (for client-side usage)
export const createHeadersWithToken = (token: string, isMultipart: boolean = false): HeadersInit => {
    const headers: HeadersInit = {};

    if (!isMultipart) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};
