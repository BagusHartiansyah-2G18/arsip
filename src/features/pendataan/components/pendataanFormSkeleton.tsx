'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryDestinationFormSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>

        {/* Form Actions */}
        <div className="border-t border-gray-100 pt-6 flex items-center justify-end gap-3">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}