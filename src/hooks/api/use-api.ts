'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { fetchData, createItem, updateItem, deleteItem,fetchDataWithCookies  } from '@/lib/actions/api';
import { getApiToken } from '@/lib/api';
import { throwIfStatusError } from '@/lib/errors';
import { useLocalStorage } from "@/hooks/utils";


interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
 
// Utility function to safely get array data from API response
export const getSafeArrayData = <T>(data: T[] | unknown): T[] => {
  // Handle API response structure: { data: T[], ... }
  if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as any).data)) {
    return (data as any).data as T[];
  }
  // Handle direct array response
  return Array.isArray(data) ? data as T[] : [];
};

// Client-side hook for data fetching (still needed for reactive updates)
export function useApi<T>(endpoint: string): ApiResponse<T[]> {
  const [rawData, setRawData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataClient = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getApiToken();
           

        
      const result = await fetchData<unknown>(endpoint, token); 
      

      const typedResult = result as { error?: string };

      if (typedResult.error === 'Unauthorized') {
        setError('token expired');
      } 
      console.log('📊 [USE API] Raw result:', result);

      // Check if result is null, undefined, or empty object
      if (!result) {
        console.warn('⚠️ [USE API] Empty result:', { endpoint, result });
        setRawData(null);
        return;
      }

      // Check if result contains server error
      if (result && typeof result === 'object' && 'statusError' in result && (result as any).statusError) {
        const errorResponse = result as any;
        const errorMessage = errorResponse.statusMessage || errorResponse.statusText || errorResponse.message || 'Server error occurred';
        const statusCode = errorResponse.statusCode || errorResponse.status || 'Unknown';

        console.log('🚨 [USE API] Server Error:', {
          endpoint,
          statusCode,
          statusMessage: errorMessage,
          fullResponse: result
        });
        setError(errorMessage);
        return;
      }

      // Check if result is an empty object (common error case)
      if (result && typeof result === 'object' && Object.keys(result).length === 0) {
        console.warn('⚠️ [USE API] Empty object response:', { endpoint });
        setError('Server returned empty response');
        return;
      }

      throwIfStatusError(result);

      // Store the raw result
      console.log('📊 [USE API] Setting raw data:', result);
      setRawData(result);


    } catch (err) {
      console.log('❌ [USE API] Error:', {
        endpoint,
        error: err instanceof Error ? err.message : err
      });

      // If it's a server error response, extract the message
      if (err && typeof err === 'object' && 'statusError' in err && (err as any).statusError) {
        const errorResponse = err as any;
        const errorMessage = errorResponse.statusText || errorResponse.statusMessage || errorResponse.message || 'Server error occurred';
        setError(errorMessage);
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchDataClient();
  }, [endpoint, fetchDataClient]);

  // Debug: Log data changes
  useEffect(() => {
    console.log('📊 [USE API] Data state changed:', { endpoint, rawData, loading, error });
  }, [rawData, endpoint, loading, error]);

  // Extract data from raw response
  console.log('📊 [USE API] Resp Data:', getSafeArrayData<T>(rawData));
  const data = getSafeArrayData<T>(rawData);

  return {
    data,
    loading,
    error,
    refetch: fetchDataClient
  };
}

// Re-export server actions for direct use in components
export { createItem, updateItem, deleteItem };
