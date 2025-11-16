export interface ApiResponse<T> {
    statusCode: number;
    statusError: boolean;
    statusMessage: string;
    statusText: string;
    data: T;
}

/**
 * Utility functions for API response handling
 */

/**
 * Check if an API response is successful
 */
export function isApiResponseSuccess<T>(response: ApiResponse<T>): boolean {
    return response.statusCode >= 200 && response.statusCode < 300 && !response.statusError;
}

/**
 * Extract data from API response with error handling
 */
export function extractApiData<T>(response: ApiResponse<T>): T {
    if (!isApiResponseSuccess(response)) {
        throw new Error(`API Error: ${response.statusMessage} - ${response.statusText}`);
    }
    return response.data;
}

/**
 * Create a standardized error response
 */
export function createApiErrorResponse(
    statusCode: number,
    message: string,
    details?: string
): ApiResponse<null> {
    return {
        statusCode,
        statusError: true,
        statusMessage: message || 'Terjadi Kesalahan',
        statusText: details ? `${message} - ${details}` : message,
        data: null,
    };
}

/**
 * Create a standardized success response
 */
export function createApiSuccessResponse<T>(
    data: T,
    message: string = 'Berhasil'
): ApiResponse<T> {
    return {
        statusCode: 200,
        statusError: false,
        statusMessage: message,
        statusText: 'Operation completed successfully',
        data,
    };
}

/**
 * Type guard to check if response is an API response
 */
export function isApiResponse<T>(response: unknown): response is ApiResponse<T> {
    return (
        typeof response === 'object' &&
        response !== null &&
        'statusCode' in response &&
        'statusError' in response &&
        'statusMessage' in response &&
        'statusText' in response &&
        'data' in response
    );
}

/**
 * Handle API response with proper error handling
 */
export async function handleApiResponse<T>(
    response: Response
): Promise<ApiResponse<T>> {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
