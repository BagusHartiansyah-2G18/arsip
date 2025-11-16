import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @param inputs - Array of class values to merge
 * @returns Merged class name string
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

