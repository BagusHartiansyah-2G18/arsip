'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, LogOut, PanelLeftClose, PanelRightOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SidebarProps, NavItem, NavGroup } from './types';
import { navigationData, allNavigationItems } from './constants';
import Badge from './Badge';
import { useAuth } from '@/hooks/auth';
import { getUserInitials } from '@/lib/utils';

const Sidebar: React.FC<SidebarProps> = ({
    activeId,
    onChange,
    collapsed,
    onToggleCollapse,
}) => {
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
    const [persistentGroups, setPersistentGroups] = useState<Record<string, boolean>>({});
    const [isMobile, setIsMobile] = useState(false);
    const [prevActiveId, setPrevActiveId] = useState(activeId);
    const sidebarScrollRef = React.useRef<HTMLDivElement>(null);
    const collapsedScrollRef = React.useRef<HTMLDivElement>(null);

    // Use auth hook for user data
    const { user, logout, isLoading } = useAuth(); 
    

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log('Logout failed:', error);
        }
    };

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-close sidebar on mobile when navigating
    useEffect(() => {
        if (isMobile && !collapsed && activeId !== prevActiveId) {
            onToggleCollapse();
        }
        setPrevActiveId(activeId);
    }, [activeId, isMobile, collapsed, onToggleCollapse, prevActiveId]);

    const toggle = (groupId: string) => {
        setOpenGroups(s => ({ ...s, [groupId]: !s[groupId] }));
        // Remember the group state persistently
        setPersistentGroups(p => ({ ...p, [groupId]: !openGroups[groupId] }));
    };

    // Auto-open groups containing active items, but respect persistent state
    useEffect(() => {
        allNavigationItems.forEach((group: NavGroup) => {
            if (group.items) {
                const hasActiveItem = (group.items as NavItem[]).some((item: NavItem) => item.id === activeId);
                const wasManuallyOpened = persistentGroups[group.id];

                if (hasActiveItem || wasManuallyOpened) {
                    setOpenGroups(prev => ({ ...prev, [group.id]: true }));
                }
            }
        });
    }, [activeId, persistentGroups]);

    // When sidebar is expanded, restore groups that were opened
    useEffect(() => {
        if (!collapsed) {
            setOpenGroups(prev => ({ ...prev, ...persistentGroups }));
        }
    }, [collapsed, persistentGroups]);

    // Styles
    const baseBtn = 'w-full flex items-center justify-between px-4 py-3 text-left rounded-md transition-all duration-200 ease-in-out cursor-pointer';
    const neutral = 'text-gray-700 hover:bg-gray-100 hover:text-gray-900';
    const active = 'bg-emerald-100 text-emerald-700';
    const submenuActive = 'bg-emerald-100 text-emerald-700';
    const submenuNeutral = 'text-gray-600 hover:bg-gray-100 hover:text-gray-800';

    // Render menu button
    const renderMenuButton = (item: NavGroup | NavItem, isActive: boolean, hasSubmenu: boolean, isOpen: boolean) => {
        const handleClick = () => {
            if (hasSubmenu) {
                toggle(item.id);
            } else {
                onChange(item.id);
            }
        };

        const className = `${baseBtn} ${isActive ? active : neutral} ${hasSubmenu ? '' : 'hover:'}`;

        return (
            <button className={className} onClick={handleClick}>
                <span className="inline-flex items-center gap-3 min-w-0 flex-1">
                    {item.icon && React.createElement(item.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>, {
                        className: `w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-gray-500'}`
                    })}
                    <span className="text-sm font-medium truncate">{item.title}</span>
                </span>
                <div className="flex items-center gap-2">
                    {item.badge && (
                        <span className="text-gray-500">
                            {typeof item.badge === 'number' ? (
                                <Badge value={item.badge} />
                            ) : (
                                item.badge
                            )}
                        </span>
                    )}
                    {hasSubmenu && (
                        <span className="text-gray-500 transition-transform duration-200 ease-in-out">
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </motion.div>
                        </span>
                    )}
                </div>
            </button>
        );
    };

    // Render submenu item
    const renderSubmenuItem = (item: NavItem, index: number, totalItems: number, isActive: boolean) => {
        return (
            <div key={item.id} className="relative">
                {/* Garis vertikal (jika bukan item terakhir) */}
                {index !== totalItems - 1 && (
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />
                )}

                {/* Garis melengkung */}
                <svg
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
                    width="12"
                    height="24"
                    viewBox="0 0 12 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 0 C1 12, 1 12, 12 12"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>

                {/* Tombol item */}
                <button
                    className={`w-full flex items-center justify-between px-4 py-2 text-left rounded-md transition-all duration-200 ease-in-out cursor-pointer ${isActive ? submenuActive : submenuNeutral} ml-3 transition-transform duration-150 ease-in-out hover:translate-x-1 overflow-hidden`}
                    onClick={() => onChange(item.id)}
                >
                    <span className="inline-flex items-center gap-2 min-w-0 flex-1">
                        {item.icon && React.createElement(item.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>, {
                            className: `w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-gray-500'}`
                        })}
                        <span className="text-xs truncate">{item.title}</span>
                    </span>
                    {item.badge && (
                        <span className="text-gray-500">
                            {typeof item.badge === 'number' ? (
                                <Badge
                                    value={item.badge}
                                    tone={item.title === 'Drafts' ? 'orange' : 'green'}
                                />
                            ) : (
                                item.badge
                            )}
                        </span>
                    )}
                </button>
            </div>
        );
    };

    // Render submenu group
    const renderSubmenuGroup = (item: NavGroup, isOpen: boolean): React.ReactNode => {
        if (!item.items) return null;
        const items = item.items as NavItem[];
        return (
            <div className={`relative ml-6 mt-1 space-y-1 pl-3 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                {items.map((item: NavItem, index: number) => (
                    renderSubmenuItem(item, index, items.length, activeId === item.id)
                ))}
            </div>
        );
    };

    return (
        <>
            {/* Mobile Overlay - Only show when sidebar is open on mobile */}
            {!collapsed && isMobile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-white/20 backdrop-blur-xs z-40"
                    onClick={onToggleCollapse}
                />
            )}


            <motion.aside
                initial={false}
                animate={{
                    width: isMobile ? (collapsed ? 0 : 256) : (collapsed ? 80 : 256),
                    x: isMobile ? (collapsed ? -256 : 0) : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    type: "tween"
                }}
                className="shrink-0 flex flex-col h-screen bg-gray-50 border-r border-gray-200 shadow-lg overflow-hidden fixed inset-y-0 left-0 z-50"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    overscrollBehavior: 'none',
                    overscrollBehaviorY: 'none',
                    touchAction: 'pan-y pinch-zoom'
                }}
            >
                {/* Header */}
                <div className="px-4 py-2 border-b border-gray-200">
                    <div className="flex items-center justify-between min-h-[44px]">
                        <AnimatePresence mode="wait">
                            {!collapsed ? (
                                <motion.div
                                    key="expanded"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-3"
                                >
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.1, duration: 0.2 }}
                                        className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center"
                                    >
                                        <MapPin className="w-4 h-4" />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.2 }}
                                        className="text-sm font-semibold text-gray-900"
                                    >
                                        SI ARSIP
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="collapsed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-0"
                                />
                            )}
                        </AnimatePresence>
                        <motion.button
                            onClick={onToggleCollapse}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <motion.div
                                initial={false}
                                animate={{
                                    rotate: collapsed ? 0 : 180,
                                    scale: 1
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                {collapsed ? (
                                    <PanelLeftClose className="w-4 h-4 text-gray-600" />
                                ) : (
                                    <PanelRightOpen className="w-4 h-4 text-gray-600" />
                                )}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>

                {/* Scrollable Navigation */}
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            ref={sidebarScrollRef}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="flex-1 overflow-y-scroll overscroll-none px-4 py-2"
                            style={{
                                overscrollBehavior: 'none',
                                overscrollBehaviorY: 'none',
                                WebkitOverflowScrolling: 'auto',
                                touchAction: 'pan-y',
                                scrollBehavior: 'smooth',
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'thin'
                            }}
                        >
                            <nav className="space-y-6">
                                {navigationData.map((sectionData, sectionIndex) => {
                                    // Calculate global index for sequential animation
                                    let globalIndex = 0;
                                    for (let i = 0; i < sectionIndex; i++) {
                                        globalIndex += navigationData[i].items.length;
                                        if (i < navigationData.length - 1) globalIndex += 1; // Add separator
                                    }

                                    return (
                                        <motion.div
                                            key={sectionData.section}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + (sectionIndex * 0.1), duration: 0.3 }}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 + (sectionIndex * 0.1), duration: 0.2 }}
                                                className="px-4 py-2"
                                            >
                                                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {sectionData.section}
                                                </h3>
                                            </motion.div>
                                            <div className="space-y-1">
                                                {sectionData.items.map((item, itemIndex) => (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{
                                                            delay: 0.4 + (globalIndex + itemIndex) * 0.05,
                                                            duration: 0.3,
                                                            type: "spring",
                                                            stiffness: 200,
                                                            damping: 20
                                                        }}
                                                    >
                                                        {renderMenuButton(
                                                            item,
                                                            activeId === item.id,
                                                            Boolean('items' in item && item.items),
                                                            openGroups[item.id] || false
                                                        )}
                                                        {'items' in item && item.items ? renderSubmenuGroup(item as NavGroup, openGroups[item.id] || false) : null}
                                                    </motion.div>
                                                ))}
                                            </div>
                                            {/* Separator between groups */}
                                            {sectionIndex < navigationData.length - 1 && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{
                                                        delay: 0.4 + (globalIndex + sectionData.items.length) * 0.05,
                                                        duration: 0.3,
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 20
                                                    }}
                                                    className="mx-4 my-4 border-t border-gray-200"
                                                />
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Collapsed Navigation */}
                <AnimatePresence>
                    {collapsed && (
                        <motion.div
                            ref={collapsedScrollRef}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="flex-1 overflow-y-scroll overscroll-none px-2 py-2 custom-scrollbar"
                            style={{
                                overscrollBehavior: 'none',
                                overscrollBehaviorY: 'none',
                                WebkitOverflowScrolling: 'auto',
                                touchAction: 'pan-y',
                                scrollBehavior: 'smooth',
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'thin'
                            }}
                        >
                            <nav className="space-y-2">
                                {/* Navigation Items with Sequential Animation */}
                                {navigationData.map((sectionData, sectionIndex) => {
                                    // Calculate global index for sequential animation
                                    let globalIndex = 0;
                                    for (let i = 0; i < sectionIndex; i++) {
                                        globalIndex += navigationData[i].items.length;
                                        if (i < navigationData.length - 1) globalIndex += 1; // Add separator
                                    }

                                    return (
                                        <div key={sectionData.section}>
                                            {sectionData.items.map((item, itemIndex) => (
                                                <TooltipProvider key={item.id}>
                                                    <Tooltip delayDuration={300}>
                                                        <TooltipTrigger asChild>
                                                            <motion.button
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{
                                                                    delay: 0.2 + (globalIndex + itemIndex) * 0.05,
                                                                    duration: 0.3,
                                                                    type: "spring",
                                                                    stiffness: 200,
                                                                    damping: 20
                                                                }}
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                className={`w-full p-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer flex items-center justify-center ${activeId === item.id
                                                                    ? 'bg-emerald-100 text-emerald-700'
                                                                    : 'hover:bg-gray-100'
                                                                    }`}
                                                                onClick={() => onChange(item.id)}
                                                            >
                                                                {item.icon && React.createElement(item.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>, {
                                                                    className: `w-5 h-5 ${activeId === item.id ? 'text-emerald-700' : 'text-gray-500'}`
                                                                })}
                                                            </motion.button>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="right"
                                                            sideOffset={8}
                                                            className="bg-emerald-500/90 backdrop-blur-md text-white text-sm font-medium px-3 py-2 shadow-lg border border-emerald-400/50 rounded-full"
                                                        >
                                                            <AnimatePresence>
                                                                <motion.div
                                                                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                                                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                                                    exit={{ opacity: 0, x: -20, scale: 0.8 }}
                                                                    transition={{
                                                                        duration: 0.3,
                                                                        ease: [0.4, 0.0, 0.2, 1]
                                                                    }}
                                                                >
                                                                    <p>{item.title}</p>
                                                                </motion.div>
                                                            </AnimatePresence>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ))}
                                            {/* Separator between groups */}
                                            {sectionIndex < navigationData.length - 1 && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{
                                                        delay: 0.2 + (globalIndex + sectionData.items.length) * 0.05,
                                                        duration: 0.3,
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 20
                                                    }}
                                                    className="mx-2 my-2 border-t border-gray-200"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Bottom Section */}
                <div className={`${collapsed ? 'p-2' : 'px-4 py-2'}`}>
                    <AnimatePresence mode="wait">
                        {collapsed ? (
                            <motion.div
                                key="collapsed-profile"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-center gap-2"
                            >
                                {/* Profile Picture - Centered when collapsed */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer"
                                >
                                    {user?.name ? getUserInitials(user.name) : 'U'}
                                </motion.div>

                                {/* Logout Button */}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <motion.button
                                                onClick={handleLogout}
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                                                whileTap={{ scale: 0.9 }}
                                                className="h-6 w-6 p-0 rounded-md flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isLoading ? (
                                                    <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-pulse" />
                                                ) : (
                                                    <LogOut className="w-3 h-3" />
                                                )}
                                            </motion.button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="bg-emerald-600 text-white text-sm font-medium px-3 py-2 shadow-lg border border-emerald-500">
                                            <p>Logout</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="expanded-profile"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="bg-white rounded-lg border border-gray-200  p-3"
                            >
                                {/* Profile Section */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {/* Profile Picture */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, duration: 0.3, type: "spring", stiffness: 200 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer"
                                        >
                                            {user?.name ? getUserInitials(user.name) : 'U'}
                                        </motion.div>

                                        {/* Profile Info */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3, duration: 0.2 }}
                                            className="flex flex-col"
                                        >
                                            <span className="text-xs text-gray-500">Welcome Back</span>
                                            <span className="text-sm font-medium text-gray-900">{user?.name || 'User'} 👋</span>
                                        </motion.div>
                                    </div>

                                    {/* Logout Button */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4, duration: 0.2 }}
                                    >
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <motion.button
                                                        onClick={handleLogout}
                                                        disabled={isLoading}
                                                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="h-8 w-8 p-0 rounded-md flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isLoading ? (
                                                            <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-pulse" />
                                                        ) : (
                                                            <LogOut className="w-4 h-4" />
                                                        )}
                                                    </motion.button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="bg-emerald-600 text-white text-sm font-medium px-3 py-2 shadow-lg border border-emerald-500">
                                                    <p>Logout</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;