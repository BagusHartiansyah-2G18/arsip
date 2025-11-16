/**
 * Generate initials from user name
 * Takes the first letter of each word (max 2)
 * @param name - Full name of the user
 * @returns Uppercase initials (max 2 characters)
 * @example
 * getUserInitials("John Doe") // Returns "JD"
 * getUserInitials("John Smith Doe") // Returns "JS"
 */
export function getUserInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns String with first letter capitalized
 * @example
 * capitalize("hello world") // Returns "Hello world"
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncate a string to a specified length
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: "...")
 * @returns Truncated string
 * @example
 * truncate("Hello World", 5) // Returns "Hello..."
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + suffix;
}

/**
 * Convert string to slug format (lowercase with hyphens)
 * @param str - String to convert
 * @returns Slug formatted string
 * @example
 * slugify("Hello World") // Returns "hello-world"
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Format number with locale-specific formatting
 * @param num - Number to format
 * @returns Formatted number string
 * @example
 * formatNumber(1234) // Returns "1,234"
 * formatNumber(1234567) // Returns "1,234,567"
 */
export function formatNumber(num: number): string {
    return num.toLocaleString();
}