'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function AnalyticsSkeleton() {
    return (
        <div className="relative mb-6">
            {/* Glass Effect Background Wrapper Skeleton */}
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                {/* Animated background skeleton */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-0 rounded-2xl" />
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl" />
                    <div className="absolute top-0 right-0 w-56 h-56 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl" />
                    <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-2xl" />
                </div>

                {/* Content Layout: Chart Left, Cards Right */}
                <div className="relative z-20 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch h-full">
                        {/* Left Side - Revenue Chart Skeleton */}
                        <div className="flex items-stretch">
                            <div className="w-full h-full flex flex-col">
                                <div className="bg-gradient-to-br from-white/80 via-emerald-50/50 to-blue-50/50 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg shadow-emerald-100/50 h-full overflow-hidden">
                                    <div className="p-4 h-full flex flex-col">
                                        {/* Header Section Skeleton */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <Skeleton className="h-6 w-32 mb-2" />
                                                <div className="flex items-center gap-3">
                                                    <Skeleton className="h-8 w-20" />
                                                    <Skeleton className="h-6 w-16 rounded-full" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-3">
                                                {/* Time Period Selector Skeleton */}
                                                <div className="flex bg-gray-100 rounded-full p-1 shadow-inner">
                                                    <Skeleton className="h-8 w-20 rounded-full" />
                                                    <Skeleton className="h-8 w-16 rounded-full" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chart Section Skeleton */}
                                        <div className="relative flex-1 min-h-0">
                                            <div className="h-full w-full flex flex-col justify-end">
                                                {/* Y-axis labels */}
                                                <div className="flex justify-between mb-2">
                                                    <Skeleton className="h-3 w-8" />
                                                    <Skeleton className="h-3 w-8" />
                                                    <Skeleton className="h-3 w-8" />
                                                    <Skeleton className="h-3 w-8" />
                                                    <Skeleton className="h-3 w-8" />
                                                    <Skeleton className="h-3 w-8" />
                                                </div>

                                                {/* Chart bars */}
                                                <div className="flex items-end justify-between gap-1 h-32">
                                                    {Array.from({ length: 12 }).map((_, index) => (
                                                        <div key={index} className="flex flex-col items-center gap-1 flex-1">
                                                            <div className="flex flex-col items-center gap-1 w-full">
                                                                <Skeleton className="w-full rounded-t-md" style={{ height: `${Math.random() * 60 + 20}%` }} />
                                                                <Skeleton className="w-full rounded-t-md" style={{ height: `${Math.random() * 40 + 10}%` }} />
                                                            </div>
                                                            <Skeleton className="h-3 w-6" />
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Legend */}
                                                <div className="flex items-center justify-center gap-6 mt-4">
                                                    <div className="flex items-center gap-2">
                                                        <Skeleton className="w-3 h-3 rounded-full" />
                                                        <Skeleton className="h-3 w-16" />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Skeleton className="w-3 h-3 rounded-full" />
                                                        <Skeleton className="h-3 w-12" />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Skeleton className="w-3 h-3 rounded-full" />
                                                        <Skeleton className="h-3 w-16" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - 2x2 Cards Grid Skeleton */}
                        <div className="grid grid-cols-2 grid-rows-2 auto-rows-fr gap-3 h-full content-stretch">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="h-full bg-gradient-to-br from-white/60 to-gray-50/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                                    <div className="p-3 h-full flex flex-col">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-1.5">
                                                <Skeleton className="w-5 h-5 rounded-lg" />
                                                <Skeleton className="h-3 w-20" />
                                            </div>
                                            <Skeleton className="w-4 h-4 rounded-full" />
                                        </div>

                                        {/* Value */}
                                        <div className="mb-2">
                                            <Skeleton className="h-10 w-16" />
                                        </div>

                                        {/* Description */}
                                        <div className="mb-3">
                                            <Skeleton className="h-3 w-full mb-1" />
                                            <Skeleton className="h-3 w-3/4" />
                                        </div>

                                        {/* Change Indicator */}
                                        <div className="mt-auto flex items-center gap-1.5">
                                            <Skeleton className="w-4 h-4 rounded-full" />
                                            <Skeleton className="h-3 w-8" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
