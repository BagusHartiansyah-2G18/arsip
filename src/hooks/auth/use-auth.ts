'use client';

import { useState, useCallback } from 'react';
import { useAuthStorage } from './use-auth-storage';
import { verifyToken, logout as apiLogout } from '@/lib/api/auth';
import { StoredUser } from './use-auth-storage';

export interface AuthState {
    user: StoredUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthActions {
    // eslint-disable-next-line no-unused-vars
    login: (token: string, user: StoredUser) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    refreshAuth: () => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    verifyToken: (token: string) => Promise<boolean>;
}

export function useAuth(): AuthState & AuthActions {
    const authStorage = useAuthStorage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Login function
    const handleLogin = useCallback(async (token: string, user: StoredUser) => {
        try {
            setIsLoading(true);
            setError(null);
            console.log({
                token
                , user
            });

            // Save auth data to storage
            authStorage.saveAuthData({
                token,
                user,
                refreshToken: '', // Add refresh token if available
            });
            const log = authStorage.getAuthData()
            console.log({ log });

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [authStorage]);


    // Logout function
    const handleLogout = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Call API logout if token exists
            if (authStorage.token) {
                await apiLogout(authStorage.token);
            }
        } catch (err) {
            // Continue with local logout even if API call fails
            console.warn('API logout failed, continuing with local logout:', err);
        } finally {
            // Clear local storage
            authStorage.clearAuthData();
            setIsLoading(false);

            // Use setTimeout to ensure state is cleared before navigation
            setTimeout(() => {
                window.location.href = '/login';
            }, 100);
        }
    }, [authStorage]);

    // Clear error function
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Refresh auth function (verify token and update user data)
    const refreshAuth = useCallback(async () => {
        if (!authStorage.token) {
            return;
        }

        try {
            setIsLoading(true);
            const isValid = await verifyToken(authStorage.token);

            if (!isValid) {
                // Token is invalid, clear auth data
                authStorage.clearAuthData();
            }
        } catch (err) {
            console.log('Token verification failed:', err);
            // Clear auth data on verification failure
            authStorage.clearAuthData();
        } finally {
            setIsLoading(false);
        }
    }, [authStorage]);

    // Verify token function
    const handleVerifyToken = useCallback(async (token: string): Promise<boolean> => {
        try {
            return await verifyToken(token);
        } catch (err) {
            console.log('Token verification failed:', err);
            return false;
        }
    }, []);

    return {
        // State
        user: authStorage.user,
        token: authStorage.token,
        isAuthenticated: authStorage.isAuthenticated,
        isLoading,
        error,

        // Actions
        login: handleLogin,
        logout: handleLogout,
        clearError,
        refreshAuth,
        verifyToken: handleVerifyToken,
    };
}

// Hook for checking authentication status
export function useAuthStatus() {
    const authStorage = useAuthStorage();

    return {
        isAuthenticated: authStorage.isAuthenticated,
        user: authStorage.user,
        token: authStorage.token,
    };
}

// Hook for getting current user
export function useCurrentUser() {
    const authStorage = useAuthStorage();

    return {
        user: authStorage.user,
        isAuthenticated: authStorage.isAuthenticated,
    };
}