/**
 * Common Types and Enums
 * Shared types used across the application
 */

import { API_ROUTES } from '@/lib/constants/routes';

// ============================================================================
// COMMON TYPES
// ============================================================================

/**
 * Alert type
 */
export type AlertType = 'success' | 'error' | 'warning' | 'info';

/**
 * Modal size type
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

// File and Theme types are already defined in api.ts, so we don't duplicate them here

/**
 * Badge variant type
 */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error';

/**
 * Badge size type
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

// ============================================================================
// ROUTING TYPES
// ============================================================================

/**
 * API Route Key Type
 */
export type ApiRouteKey = keyof typeof API_ROUTES;

/**
 * API Route Value Type
 */
export type ApiRouteValue = (typeof API_ROUTES)[ApiRouteKey];
