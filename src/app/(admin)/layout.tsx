import React from 'react';
import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute } from '@/features/auth'; 
import 'react-datepicker/dist/react-datepicker.css';

export default function AdminRouteGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <DashboardLayout> 
                    {children} 
                
            </DashboardLayout>
        </ProtectedRoute>
    );
}
