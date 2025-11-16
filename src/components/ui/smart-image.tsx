import { getFileUrl } from '@/lib/api';
import React from 'react';

interface SmartImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    folderName?: string;
    fileName?: string;
    // eslint-disable-next-line no-unused-vars
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function SmartImage({
    src,
    alt,
    width = 64,
    height = 64,
    className = '',
    folderName,
    fileName,
    onError
}: SmartImageProps) {
    // Use getFileUrl if folderName and fileName are provided
    if (folderName && fileName) {
        const fileUrl = getFileUrl(folderName, fileName);
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={fileUrl}
                alt={alt}
                width={width}
                height={height}
                className={className}
                onError={onError}
            />
        );
    }

    // Handle empty or invalid src
    if (!src || src.trim() === '') {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src="/placeholder-destination.jpg"
                alt={alt}
                width={width}
                height={height}
                className={className}
                onError={onError}
            />
        );
    }

    // Check if it's an external URL
    const isExternalUrl = src.startsWith('http://') || src.startsWith('https://');

    if (isExternalUrl) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={className}
                onError={onError}
            />
        );
    }

    // For relative paths, use regular img tag to avoid Next.js Image issues
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={onError}
        />
    );
}
