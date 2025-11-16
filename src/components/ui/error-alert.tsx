'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorAlertProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    retryText?: string;
    className?: string;
}

export function ErrorAlert({
    title = 'Terjadi Kesalahan',
    message,
    onRetry,
    retryText = 'Coba Lagi',
    className = ''
}: ErrorAlertProps) {
    return (
        <div className={`mb-6 p-6 bg-red-50 border border-red-200 rounded-xl shadow-sm ${className}`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-semibold text-red-900 mb-1">
                            {title}
                        </h3>
                        <p className="text-sm text-red-700 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>
                {onRetry && (
                    <div className="flex-shrink-0 ml-6">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onRetry}
                            className="border-red-300 text-red-800 hover:bg-red-100 hover:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                        >
                            {retryText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
