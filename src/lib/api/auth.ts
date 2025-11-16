import { LoginFormData, RegisterFormData } from '@/types/forms';
import { StoredUser } from '@/hooks/auth';
import { authLogin, authRegister, authVerifyToken, authLogout, authRefreshToken } from '@/lib/actions';
import { throwIfStatusError } from '@/lib/errors';
import { signIn } from 'next-auth/react';
import { getCsrfToken } from "next-auth/react";
import { getSession } from "next-auth/react";

// API Response interfaces
export interface ApiResponse<T = unknown> {
    statusCode: number;
    statusError: boolean;
    statusMessage: string;
    statusText: string;
    data: T;
}

export interface LoginApiResponse extends ApiResponse<string> {
    data: string; // JWT token
}

export interface RegisterApiResponse extends ApiResponse<{
    id: string;
    username: string;
}> {
    data: {
        id: string;
        username: string;
    };
}

export interface AuthResponse {
    token: string;
    user?: StoredUser;
    refreshToken?: string;
    message?: string;
}

// Login user
export async function login(credentials: LoginFormData): Promise<AuthResponse> {
    
     try {
        const formData = new FormData();
        formData.append('email', credentials.email);
        formData.append('password', credentials.password); 
        
        const apiResponse = await authLogin(formData);
            throwIfStatusError(apiResponse as unknown);
         
        
        // Handle the actual API response format
        if (apiResponse.statusCode === 200 && !apiResponse.statusError && apiResponse.data) {
            return {
                token: apiResponse.data, // JWT token
                user: {
                    id: 'user-123',
                    email: credentials.email,
                    username: 'admin',
                    name: 'Administrator',
                },
                message: apiResponse.statusText
            };
        }

        throw new Error(apiResponse.statusText || 'Login failed');
    } catch (error) { 
        throw error;
    }
}

// Register new user
export async function register(userData: RegisterFormData): Promise<AuthResponse> {
    try {
        const formData = new FormData();
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('username', userData.username);
        formData.append('name', userData.name);

        const apiResponse = await authRegister(formData);
        throwIfStatusError(apiResponse as unknown);

        // Handle the actual API response format
        if (apiResponse.statusCode === 200 && !apiResponse.statusError && apiResponse.data) {
            return {
                token: '', // Register doesn't return token, user needs to login
                user: {
                    id: apiResponse.data.id,
                    email: userData.email,
                    username: apiResponse.data.username,
                    name: userData.name,
                },
                message: apiResponse.statusText
            };
        }

        throw new Error(apiResponse.statusText || apiResponse.statusMessage || 'Registration failed');
    } catch (error) {
        throw error;
    }
}

// Verify token (optional - for checking if token is still valid)
export async function verifyToken(token: string): Promise<boolean> {
    try {
        return await authVerifyToken(token);
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Logout (client-side operation, but can be used to clear server-side sessions if needed)
export async function logout(token: string): Promise<void> {
    try {
        await authLogout(token);
        // Logout request completed (success or failure doesn't matter for client-side cleanup)
    } catch (error) {
        // Don't throw error for logout as it's not critical
        console.log(error);
    }
}

// Refresh token (if the API supports it)
export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
        const formData = new FormData();
        formData.append('refresh_token', refreshToken);

        const apiResponse = await authRefreshToken(formData);
        throwIfStatusError(apiResponse as unknown);

        // Handle the actual API response format
        if (apiResponse.statusCode === 200 && !apiResponse.statusError && apiResponse.data) {
            return {
                token: apiResponse.data, // New JWT token
                message: apiResponse.statusText
            };
        }

        throw new Error(apiResponse.statusText || apiResponse.statusMessage || 'Token refresh failed');
    } catch (error) {
        throw error;
    }
}
