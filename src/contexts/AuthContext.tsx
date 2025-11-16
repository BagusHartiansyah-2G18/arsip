'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStorage } from '@/hooks/auth';
import { StoredUser } from '@/hooks/auth';

interface AuthContextType {
    user: StoredUser | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    // eslint-disable-next-line no-unused-vars
    login: (token: string, user: StoredUser) => Promise<void>;
    logout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { token: storedToken, user: storedUser, setToken, setUser, removeToken, removeUser, getAuthData, isAuthenticated: storageIsAuthenticated } = useAuthStorage();

    const [user, setUserState] = useState<StoredUser | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const authData = getAuthData();

                if (authData && authData.token && authData.user) {
                    setTokenState(authData.token);
                    setUserState(authData.user);
                }
            } catch (error) {
                console.log('Error initializing auth:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [getAuthData]);

    // Sync with storage changes
    useEffect(() => {
        if (storedToken && storedUser) {
            setTokenState(storedToken);
            setUserState(storedUser);
        } else {
            setTokenState(null);
            setUserState(null);
        }
    }, [storedToken, storedUser, storageIsAuthenticated]);

    const login = async (newToken: string, newUser: StoredUser) => {
        try {
            // Save to storage first
            setToken(newToken);
            setUser(newUser);

            // Update local state immediately
            setTokenState(newToken);
            setUserState(newUser);

            console.log('AuthContext login successful:', { newToken, newUser });
        } catch (error) {
            console.log('Error during login:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            removeToken();
            removeUser();
            setTokenState(null);
            setUserState(null);

            // Use setTimeout to ensure state is cleared before navigation
            setTimeout(() => {
                window.location.href = '/login';
            }, 100);
        } catch (error) {
            console.log('Error during logout:', error);
            throw error;
        }
    };

    const refreshAuth = async () => {
        try {
            // const storedToken = await getToken();
            // const storedUser = await getUser();

            if (storedToken && storedUser) {
                setTokenState(storedToken);
                setUserState(storedUser);
            } else {
                setTokenState(null);
                setUserState(null);
            }
        } catch (error) {
            console.log('Error refreshing auth:', error);
            setTokenState(null);
            setUserState(null);
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        logout,
        refreshAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
