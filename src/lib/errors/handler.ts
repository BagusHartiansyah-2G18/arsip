import { authStorageUtils } from '@/hooks/auth';

export function throwIfStatusError(response: unknown): void {
    if (!response || typeof response !== 'object') return;
    const r = response as {
        statusError?: boolean;
        statusCode?: number;
        statusText?: string;
        statusMessage?: string;
    };
    if (!r.statusError) return;

    const code = r.statusCode;
    const message = r.statusMessage || r.statusText || 'Unknown error';
    const isAuthError = code === 401 || code === 403;

    // Log server error details
    console.log('🚨 [SERVER ERROR] Details:', {
        statusCode: code,
        statusError: r.statusError,
        statusMessage: message,
        statusText: r.statusText,
        isAuthError,
        timestamp: new Date().toISOString(),
        fullResponse: response
    });

    if (isAuthError) {
        console.warn('🔐 [AUTH ERROR] Clearing authentication data and redirecting to login');
        try { authStorageUtils.clearAll(); } catch { }
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }

    throw response;
}

