'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Greetings Section Skeleton */}
            <div className="mb-8">
                <div className="mb-4">
                    <Skeleton className="h-9 w-80 mb-2" />
                    <Skeleton className="h-5 w-96" />
                </div>
            </div>

            {/* Upcoming Announcements & Events - Side by Side Layout Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Upcoming Announcements Section Skeleton */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <div className="flex items-start gap-3">
                                    <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <Skeleton className="h-3 w-3/4 mb-2" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events Section Skeleton */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <div className="flex items-start gap-3">
                                    <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <Skeleton className="h-3 w-4/5 mb-2" />
                                        <div className="flex items-center gap-2 mb-1">
                                            <Skeleton className="h-3 w-3" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-3 w-3" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions Section Skeleton */}
            <div className="mb-8">
                <div className="mb-4">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <Skeleton className="w-10 h-10 rounded-lg" />
                                <div>
                                    <Skeleton className="h-4 w-20 mb-1" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                            <Skeleton className="h-8 w-full" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity Section Skeleton */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <div className="flex-1">
                                <Skeleton className="h-4 w-3/4 mb-1" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                            <Skeleton className="h-3 w-16" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
