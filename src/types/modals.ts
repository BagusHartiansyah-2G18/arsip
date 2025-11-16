/* eslint-disable no-unused-vars */
/**
 * Modal and Alert Interfaces
 * All modal, alert, and dialog related types
 */

import { AlertType, ModalSize } from './common';

// ============================================================================
// MODAL INTERFACES
// ============================================================================

/**
 * Form Modal Props
 */
export interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: ModalSize;
}

/**
 * Alert Modal Props
 */
export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: AlertType;
}

/**
 * Confirm Modal Props
 */
export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'default' | 'danger' | 'warning' | 'info';
}

// ============================================================================
// MODAL HOOK INTERFACES
// ============================================================================

/**
 * Alert Modal Hook Return
 */
export interface AlertModalHook {
    showAlert: (_title: string, _message: string, _type?: AlertType) => void;
    AlertModalComponent: React.ComponentType;
}

/**
 * Confirm Modal Hook Return
 */
export interface ConfirmModalHook {
    showConfirm: (
        _title: string,
        _message: string,
        _onConfirm: () => void,
        _options?: {
            confirmText?: string;
            cancelText?: string;
            type?: 'default' | 'danger' | 'warning' | 'info';
        }
    ) => void;
    ConfirmModalComponent: React.ComponentType;
}

/**
 * Form Modal Hook Return
 */
export interface FormModalHook {
    openModal: (_title: string, _size?: ModalSize) => void;
    onClose: () => void;
    FormModalComponent: React.ComponentType<{ children?: React.ReactNode }>;
}
