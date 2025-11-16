'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
    // eslint-disable-next-line no-unused-vars
    onFileSelect: (file: File | null) => void;
    accept?: string;
    maxSize?: number;
    className?: string;
    disabled?: boolean;
    preview?: string | null;
    onRemove?: () => void;
}

export function FileUpload({
    onFileSelect,
    accept = 'image/*',
    maxSize = 5 * 1024 * 1024, // 5MB
    className,
    disabled = false,
    preview,
    onRemove
}: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            onFileSelect(file);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: accept ? { [accept]: [] } : undefined,
        maxSize,
        multiple: false,
        disabled,
        onDragEnter: () => setDragActive(true),
        onDragLeave: () => setDragActive(false),
        onDropAccepted: () => setDragActive(false),
        onDropRejected: () => setDragActive(false),
    });

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onFileSelect(null);
        onRemove?.();
    };

    return (
        <div className={cn('w-full', className)}>
            <div
                {...getRootProps()}
                className={cn(
                    'relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                    isDragActive || dragActive
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-300 hover:border-gray-400',
                    disabled && 'opacity-50 cursor-not-allowed',
                    preview && 'border-solid'
                )}
            >
                <input {...getInputProps()} />

                {preview ? (
                    <div className="relative">
                        <Image
                            src={preview}
                            alt="Preview"
                            width={800}
                            height={192}
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={handleRemove}
                            disabled={disabled}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {isDragActive ? 'Drop the file here' : 'Upload a file'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Drag and drop or click to select
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Max size: {Math.round(maxSize / 1024 / 1024)}MB
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Simple file input component as fallback
export function SimpleFileInput({
    onFileSelect,
    accept = 'image/*',
    className,
    disabled = false,
    preview,
    onRemove
}: FileUploadProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onFileSelect(file);
    };

    const handleRemove = () => {
        onFileSelect(null);
        onRemove?.();
    };

    return (
        <div className={cn('w-full', className)}>
            {preview ? (
                <div className="relative">
                    <Image
                        src={preview}
                        alt="Preview"
                        width={800}
                        height={192}
                        className="w-full h-48 object-cover rounded-md border"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemove}
                        disabled={disabled}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        disabled={disabled}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 file:cursor-pointer cursor-pointer border border-gray-300 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <FileImage className="w-4 h-4 text-gray-500 flex-shrink-0" />
                </div>
            )}
        </div>
    );
}
