'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface FormPageSkeletonProps {
    title?: string;
    description?: string;
    showBackButton?: boolean;
}

const FormPageSkeleton: React.FC<FormPageSkeletonProps> = ({
    showBackButton = true
}) => {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4">
                {showBackButton && (
                    <Skeleton className="h-9 w-20" />
                )}
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>

            {/* Form Card Skeleton */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Form Header */}
                <div className="mb-6">
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-72" />
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Title Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-24 w-full" />
                    </div>

                    {/* Date Fields Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                    {/* URL Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* File Upload Field */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <div className="text-center">
                                <Skeleton className="h-12 w-12 mx-auto mb-3" />
                                <Skeleton className="h-4 w-32 mx-auto mb-1" />
                                <Skeleton className="h-3 w-48 mx-auto" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPageSkeleton;
