'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Bell, ChevronDown, User, LogOut, Mail, Phone, MapPin, ChevronRight, Home, PanelLeftClose } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/auth';
import { getUserInitials } from '@/lib/utils';
import { Route } from 'next';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    unread: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
}


interface DashboardHeaderProps {
    breadcrumbs?: Array<{
        label: string;
        href?: string;
    }>;
    onToggleSidebar?: () => void;
    sidebarCollapsed?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    breadcrumbs = [{ label: "Dashboard", href: "/" }],
    onToggleSidebar,
    sidebarCollapsed = false
}) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const accountMenuRef = useRef<HTMLDivElement>(null);

    // Use auth hook for user data
    const { user, logout, isLoading } = useAuth();

    // Mock notifications
    const notifications: Notification[] = [
        {
            id: '1',
            title: 'SI ARSIP',
            message: 'Lounch 15 11 2025',
            time: '-',
            unread: true,
            type: 'success'
        },
        // {
        //     id: '2',
        //     title: 'System Update',
        //     message: 'System will be updated tonight at 2 AM',
        //     time: '1 hour ago',
        //     unread: true,
        //     type: 'info'
        // },
        // {
        //     id: '3',
        //     title: 'Payment Received',
        //     message: 'Payment of $500 received from John Doe',
        //     time: '3 hours ago',
        //     unread: false,
        //     type: 'success'
        // },
        // {
        //     id: '4',
        //     title: 'Low Storage',
        //     message: 'Storage is running low. Please clean up old files',
        //     time: '1 day ago',
        //     unread: false,
        //     type: 'warning'
        // }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setShowAccountMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return '✅';
            case 'warning':
                return '⚠️';
            case 'error':
                return '❌';
            default:
                return 'ℹ️';
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setShowAccountMenu(false);
        } catch (error) {
            console.log('Logout failed:', error);
        }
    };

    return (
        <header
            className="bg-white border-b border-gray-200 px-6 fixed top-0 right-0 z-40 transition-all duration-300 ease-in-out"
            style={{
                paddingTop: '2px',
                paddingBottom: '2px',
                left: isMobile ? '0px' : (sidebarCollapsed ? '64px' : '256px'),
                height: '60px'
            }}
        >
            <div className="flex items-center justify-between">
                {/* Left side - Breadcrumbs and title */}
                <div className="flex items-center space-x-4">
                    {/* Breadcrumbs */}
                    <div className="flex items-center space-x-2 text-sm">
                        {/* Mobile Sidebar Toggle Button */}
                        {onToggleSidebar && (
                            <motion.button
                                onClick={onToggleSidebar}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <PanelLeftClose className="w-5 h-5 text-gray-600" />
                            </motion.button>
                        )}

                        {/* Home Icon */}
                        <Home className="w-4 h-4 text-gray-400" />

                        {/* Breadcrumb Items */}
                        {breadcrumbs.map((breadcrumb, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <ChevronRight className="w-3 h-3 text-gray-300" />}
                                {breadcrumb.href ? (
                                    <Link
                                        href={breadcrumb.href as unknown as Route}
                                        className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        {breadcrumb.label}
                                    </Link>
                                ) : (
                                    <span className={index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "text-gray-600"}>
                                        {breadcrumb.label}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Right side - Settings, Notifications, Account */}
                <div className="flex items-center space-x-4">
                    {/* Settings Button - Hidden on mobile */}
                    <button
                        onClick={() => { }}
                        className="hidden md:block p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Settings"
                    >
                        <Settings className="w-5 h-5" />
                    </button>

                    {/* Notifications Dropdown */}
                    <div className="relative" ref={notificationsRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Notifications"
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                                >
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map((notification, index) => (
                                            <motion.div
                                                key={notification.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.unread ? 'bg-blue-50' : ''
                                                    }`}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-900">{notification.title}</p>
                                                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                    </div>
                                                    {notification.unread && (
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="p-4 border-t border-gray-200">
                                        <button className="w-full text-center text-xs text-blue-600 hover:text-blue-700 font-medium">
                                            View all notifications
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Account Dropdown */}
                    <div className="relative" ref={accountMenuRef}>
                        <button
                            onClick={() => setShowAccountMenu(!showAccountMenu)}
                            className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {/* Profile Picture */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                                {user?.name ? getUserInitials(user.name) : 'U'}
                            </div>

                            {/* User Info - Hidden on mobile */}
                            <div className="hidden md:block text-left">
                                <p className="text-xs font-medium text-gray-900">{user?.name || 'User'}</p>
                                <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                            </div>

                            <ChevronDown className="hidden md:block w-4 h-4 text-gray-500" />
                        </button>

                        {/* Account Dropdown Menu */}
                        <AnimatePresence>
                            {showAccountMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                                >
                                    {/* Profile Header */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.2 }}
                                        className="p-4 border-b border-gray-200"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, duration: 0.3, type: "spring", stiffness: 200 }}
                                                className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-lg"
                                            >
                                                {user?.name ? getUserInitials(user.name) : 'U'}
                                            </motion.div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                                                <p className="text-xs text-gray-500">{user?.username || 'User'}</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        {[
                                            { icon: User, label: 'Profile Settings', active: true },
                                            { icon: Mail, label: 'Messages' },
                                            { icon: Phone, label: 'Support' },
                                            { icon: MapPin, label: 'Location' }
                                        ].map((item, index) => (
                                            <motion.button
                                                key={item.label}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + (index * 0.05), duration: 0.2 }}
                                                whileHover={{ x: 4, backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`w-full flex items-center space-x-3 px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 transition-colors ${item.active ? 'bg-gray-50' : ''
                                                    }`}
                                            >
                                                <item.icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Logout */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.2 }}
                                        className="border-t border-gray-200 py-2"
                                    >
                                        <motion.button
                                            onClick={handleLogout}
                                            disabled={isLoading}
                                            whileHover={{ x: 4, backgroundColor: 'rgba(254, 226, 226, 0.5)' }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full flex items-center space-x-3 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-pulse" />
                                            ) : (
                                                <LogOut className="w-4 h-4" />
                                            )}
                                            <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
