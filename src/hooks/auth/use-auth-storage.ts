import { useLocalStorage } from "@/hooks/utils";

// Auth storage keys
export const AUTH_STORAGE_KEYS = {
    TOKEN: 'auth_token',
    USER: 'auth_user',
    REFRESH_TOKEN: 'auth_refresh_token',
} as const;

// User interface for storage
export interface StoredUser {
    id: string;
    email: string;
    username: string;
    name: string;
    avatar?: string;
}

// Auth data interface
export interface AuthData {
    token: string;
    user: StoredUser;
    refreshToken?: string;
}

// Hook for managing authentication token
export function useAuthToken() {
    const [token, setToken, removeToken] = useLocalStorage<string | null>(
        AUTH_STORAGE_KEYS.TOKEN,
        null
    );

    return {
        token,
        setToken,
        removeToken,
        isAuthenticated: !!token,
    };
}

// Hook for managing user data
export function useAuthUser() {
    const [user, setUser, removeUser] = useLocalStorage<StoredUser | null>(
        AUTH_STORAGE_KEYS.USER,
        null
    );

    return {
        user,
        setUser,
        removeUser,
    };
}

// Hook for managing refresh token
export function useRefreshToken() {
    const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage<string | null>(
        AUTH_STORAGE_KEYS.REFRESH_TOKEN,
        null
    );

    return {
        refreshToken,
        setRefreshToken,
        removeRefreshToken,
    };
}

// Comprehensive auth management hook
export function useAuthStorage() {
    const tokenStorage = useAuthToken();
    const userStorage = useAuthUser();
    const refreshStorage = useRefreshToken();

    // Save complete auth data
    const saveAuthData = (authData: AuthData) => {
        tokenStorage.setToken(authData.token);
        userStorage.setUser(authData.user);
        if (authData.refreshToken) {
            refreshStorage.setRefreshToken(authData.refreshToken);
        }
    };

    // Clear all auth data
    const clearAuthData = () => {
        tokenStorage.removeToken();
        userStorage.removeUser();
        refreshStorage.removeRefreshToken();
    };

    // Get current auth data
    const getAuthData = (): AuthData | null => {
        if (!tokenStorage.token || !userStorage.user) {
            return null;
        }

        return {
            token: tokenStorage.token,
            user: userStorage.user,
            refreshToken: refreshStorage.refreshToken || undefined,
        };
    };

    return {
        // Token management
        token: tokenStorage.token,
        setToken: tokenStorage.setToken,
        removeToken: tokenStorage.removeToken,
        isAuthenticated: tokenStorage.isAuthenticated,

        // User management
        user: userStorage.user,
        setUser: userStorage.setUser,
        removeUser: userStorage.removeUser,

        // Refresh token management
        refreshToken: refreshStorage.refreshToken,
        setRefreshToken: refreshStorage.setRefreshToken,
        removeRefreshToken: refreshStorage.removeRefreshToken,

        // Combined operations
        saveAuthData,
        clearAuthData,
        getAuthData,
    };
}

// Utility functions for direct localStorage access (for server-side usage)
export const authStorageUtils = {
    // Get token from localStorage
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        const raw = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
        if (raw == null) return null;
        // useLocalStorage (usehooks-ts) serializes values with JSON.stringify,
        // so string tokens may be stored as quoted JSON strings.
        try {
            const parsed = JSON.parse(raw);
            return typeof parsed === 'string' ? parsed : raw;
        } catch {
            // Fallback: strip wrapping quotes if present
            return raw.replace(/^"|"$/g, '');
        }
    },

    // Set token in localStorage
    setToken: (token: string): void => {
        if (typeof window === 'undefined') return;
        // Store consistently as JSON string to match useLocalStorage behavior
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, JSON.stringify(token));
    },

    // Remove token from localStorage
    removeToken: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    },

    // Get user from localStorage
    getUser: (): StoredUser | null => {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
        return userStr ? JSON.parse(userStr) : null;
    },

    // Set user in localStorage
    setUser: (user: StoredUser): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
    },

    // Remove user from localStorage
    removeUser: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    },

    // Get refresh token from localStorage
    getRefreshToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    },

    // Set refresh token in localStorage
    setRefreshToken: (refreshToken: string): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    },

    // Remove refresh token from localStorage
    removeRefreshToken: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    },

    // Clear all auth data
    clearAll: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
        localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
        localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
    },
};
