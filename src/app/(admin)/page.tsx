'use client';

import { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

export default function AdminHomePage() {
    const { isAuthenticated, isLoading } = useAuthContext();

    useEffect(() => {
        // Only redirect to dashboard if user is authenticated and not loading
        if (!isLoading && isAuthenticated) {
            window.location.href = '/dashboard';
        }
    }, [isAuthenticated, isLoading]);

    return (
        <div className="flex items-center justify-center h-96">
            <div className="text-center">
                <div className="w-8 h-8 border-b-2 border-emerald-500 rounded-full mx-auto mb-3 animate-pulse"></div>
                <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
            </div>
        </div>
    );
}