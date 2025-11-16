'use client';

import React, { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuthContext();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            window.location.href = '/login';
        }
    }, [isAuthenticated, isLoading]);

    // Show loading skeleton while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4 animate-pulse"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Show fallback or redirect if not authenticated
    if (!isAuthenticated) {
        return fallback || (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    // Render protected content
    return <>{children}</>;
}
