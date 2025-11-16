'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { Route } from 'next';

interface FormHeaderProps {
    title: string;
    description: string;
    backHref: string;
    backText: string;
    icon: LucideIcon;
    iconColor?: string;
}

export function FormHeader({
    title,
    description,
    backHref,
    backText,
    icon: Icon,
    iconColor = 'bg-emerald-500'
}: FormHeaderProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Link
                    href={backHref as unknown as Route}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {backText}
                </Link>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {title}
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
