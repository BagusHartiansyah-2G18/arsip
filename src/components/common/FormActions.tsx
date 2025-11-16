'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';

interface FormActionsProps {
    onCancel?: () => void;
    isLoading?: boolean;
    submitButtonText?: string;
    cancelButtonText?: string;
}

export function FormActions({
    onCancel,
    isLoading = false,
    submitButtonText = 'Simpan',
    cancelButtonText = 'Batal'
}: FormActionsProps) {
    return (
        <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-end gap-3">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="text-sm"
                    >
                        <X className="w-4 h-4 mr-2" />
                        {cancelButtonText}
                    </Button>
                )}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            {submitButtonText}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

