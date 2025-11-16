'use client'

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { useNavigationHandler } from '@/hooks/navigation';
import { useActiveRoute } from '@/hooks/navigation';
import DashboardHeader from '@/features/dashboard/components/DashboardHeader';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeId?: string; // Optional, akan auto-detect jika tidak diberikan
}

export default function DashboardLayout({ children, activeId: manualActiveId }: DashboardLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const { navigateTo } = useNavigationHandler();
    const { activeId: detectedActiveId, parentGroupId, breadcrumbs } = useActiveRoute();

    const activeId = manualActiveId || detectedActiveId;

    const handleNavigation = (id: string) => { 
        navigateTo(id);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Sidebar
                activeId={activeId}
                onChange={handleNavigation}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                parentGroupId={parentGroupId}
            />
            <div
                className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${sidebarCollapsed
                    ? 'md:ml-20 ml-0'
                    : 'md:ml-64 ml-0'
                    }`}
            >
                <DashboardHeader
                    breadcrumbs={breadcrumbs}
                    onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                    sidebarCollapsed={sidebarCollapsed}
                />
                <main className="flex-1 bg-gray-50 p-3 md:p-6 pt-16 md:pt-20">
                    {children}
                </main>
            </div>
        </div>
    );
}
