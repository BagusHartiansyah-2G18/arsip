'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface DataTablePageSkeletonProps {
    title?: string;
    description?: string;
    showCalendar?: boolean;
    showFilter?: boolean;
}

const DataTablePageSkeleton: React.FC<DataTablePageSkeletonProps> = ({
    showCalendar = false,
    showFilter = true
}) => {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* Calendar Section (if showCalendar is true) */}
            {showCalendar && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>

                    <div className="flex gap-1 mb-3">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <Skeleton className="h-3 w-6 mb-1" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                            <Skeleton className="w-3 h-3 rounded" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                        <div className="flex items-center gap-1">
                            <Skeleton className="w-3 h-3 rounded" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        <div className="flex items-center gap-1">
                            <Skeleton className="w-3 h-3 rounded" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Section (if showFilter is true) */}
            {showFilter && (
                <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-24" />
                </div>
            )}

            {/* Data Table Section */}
            <div className="bg-white rounded-2xl border border-gray-200">
                {/* Table Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-28" />
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded" />
                        <Skeleton className="h-8 flex-1" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-3 w-3" />
                            <Skeleton className="h-3 w-3" />
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Table Header */}
                        <thead className="bg-gray-50">
                            <tr>
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <th key={index} className="px-4 py-3 text-left">
                                        <Skeleton className="h-4 w-16" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {Array.from({ length: 5 }).map((_, rowIndex) => (
                                <tr key={rowIndex} className="border-b border-gray-100">
                                    {Array.from({ length: 7 }).map((_, colIndex) => (
                                        <td key={colIndex} className="px-4 py-3">
                                            {colIndex === 0 ? (
                                                <Skeleton className="h-4 w-4" />
                                            ) : colIndex === 6 ? (
                                                <Skeleton className="h-8 w-8 rounded-md" />
                                            ) : (
                                                <Skeleton className="h-4 w-20" />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-8 w-8 rounded-md" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTablePageSkeleton;
