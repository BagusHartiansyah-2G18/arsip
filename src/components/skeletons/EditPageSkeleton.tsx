'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface EditPageSkeletonProps {
    title?: string;
    description?: string;
    showBackButton?: boolean;
}

const EditPageSkeleton: React.FC<EditPageSkeletonProps> = ({
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

            {/* Loading State */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="text-center space-y-2">
                        <Skeleton className="h-6 w-32 mx-auto" />
                        <Skeleton className="h-4 w-48 mx-auto" />
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="mt-4 w-full max-w-xs">
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPageSkeleton;
