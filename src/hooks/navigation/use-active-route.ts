'use client';

import { usePathname } from 'next/navigation';

/**
 * Hook untuk mendeteksi route aktif dan memetakannya ke sidebar IDs
 */
export const useActiveRoute = () => {
    const pathname = usePathname();

    const getActiveId = (): string => {
        // Map URL paths ke sidebar IDs
        switch (pathname) {
            case '/':
            case '/dashboard':
                return 'dashboard';
            case '/pendataan':
                case '/pendataan/add':
                return 'pendataan';
            case '/sumber':
                return 'sumber';
            case '/jenis':
                return 'jenis';
            case '/form':
                return 'form';
            case '/klasifikasi':
                return 'klasifikasi';
            // case '/flows':
            // case '/flows/add':
            //     return 'flows';
            // case '/galleries':
            // case '/galleries/add':
            //     return 'galleries';
            // case '/events':
            // case '/events/add':
            //     return 'events';
            // case '/announcements':
            // case '/announcements/add':
            //     return 'announcements';
            // case '/services':
            // case '/services/add':
            //     return 'services';
            // case '/settings':
            //     return 'settings';
            case '/auth':
                return 'auth';
            default:
                // Handle dynamic routes like /destinations/edit/[id], /events/edit/[id], etc.
                if (pathname.startsWith('/destinations/')) return 'destinations';
                if (pathname.startsWith('/categories/')) return 'categories';
                if (pathname.startsWith('/tag-destinations/')) return 'tag-destinations';
                if (pathname.startsWith('/flows/')) return 'flows';
                if (pathname.startsWith('/galleries/')) return 'galleries';
                if (pathname.startsWith('/events/')) return 'events';
                if (pathname.startsWith('/announcements/')) return 'announcements';
                if (pathname.startsWith('/services/')) return 'services';
                if (pathname.startsWith('/settings/')) return 'settings';
                if (pathname.startsWith('/auth/')) return 'auth';
                return 'dashboard';
        }
    };

    const getParentGroupId = (activeId: string): string | null => {
        // Cari parent group untuk auto-open groups yang berisi active item
        const managementGroups = ['destinations', 'categories', 'tag-destinations', 'flows', 'galleries', 'events', 'announcements', 'services'];

        if (managementGroups.includes(activeId)) {
            return 'management';
        }

        return null;
    };

    const getBreadcrumbs = () => {
        const activeId = getActiveId();

        // Base breadcrumbs for each section
        const baseBreadcrumbs = {
            dashboard: [{ label: 'Dashboard' }],
            destinations: [
                { label: 'Dashboard', href: '/' },
                { label: 'Destinasi' }
            ],
            categories: [
                { label: 'Dashboard', href: '/' },
                { label: 'Kategori Destinasi' }
            ],
            'tag-destinations': [
                { label: 'Dashboard', href: '/' },
                { label: 'Tag Destinasi' }
            ],
            flows: [
                { label: 'Dashboard', href: '/' },
                { label: 'Alur Destinasi' }
            ],
            galleries: [
                { label: 'Dashboard', href: '/' },
                { label: 'Galeri' }
            ],
            events: [
                { label: 'Dashboard', href: '/' },
                { label: 'Event' }
            ],
            announcements: [
                { label: 'Dashboard', href: '/' },
                { label: 'Pengumuman' }
            ],
            services: [
                { label: 'Dashboard', href: '/' },
                { label: 'Services' }
            ],
            settings: [
                { label: 'Dashboard', href: '/' },
                { label: 'Settings' }
            ],
            auth: [
                { label: 'Dashboard', href: '/' },
                { label: 'Authentication' }
            ]
        };

        let breadcrumbs = baseBreadcrumbs[activeId as keyof typeof baseBreadcrumbs] || baseBreadcrumbs.dashboard;

        // Add specific breadcrumb for add/edit pages
        if (pathname.includes('/add')) {
            let actionLabel: string;
            switch (activeId) {
                case 'destinations':
                    actionLabel = 'Tambah Destinasi';
                    break;
                case 'categories':
                    actionLabel = 'Tambah Kategori';
                    break;
                case 'tag-destinations':
                    actionLabel = 'Tambah Tag Destinasi';
                    break;
                case 'flows':
                    actionLabel = 'Tambah Alur';
                    break;
                case 'galleries':
                    actionLabel = 'Tambah Galeri';
                    break;
                case 'events':
                    actionLabel = 'Tambah Event';
                    break;
                case 'announcements':
                    actionLabel = 'Tambah Pengumuman';
                    break;
                case 'services':
                    actionLabel = 'Tambah Layanan';
                    break;
                default:
                    actionLabel = 'Tambah';
                    break;
            }

            breadcrumbs = [
                ...breadcrumbs.slice(0, -1), // Remove last item
                {
                    label: breadcrumbs[breadcrumbs.length - 1].label,
                    href: `/${activeId}`
                }, // Make parent clickable
                { label: actionLabel }
            ];
        } else if (pathname.includes('/edit/')) {
            let actionLabel: string;
            switch (activeId) {
                case 'destinations':
                    actionLabel = 'Edit Destinasi';
                    break;
                case 'categories':
                    actionLabel = 'Edit Kategori';
                    break;
                case 'tag-destinations':
                    actionLabel = 'Edit Tag Destinasi';
                    break;
                case 'flows':
                    actionLabel = 'Edit Alur';
                    break;
                case 'galleries':
                    actionLabel = 'Edit Galeri';
                    break;
                case 'events':
                    actionLabel = 'Edit Event';
                    break;
                case 'announcements':
                    actionLabel = 'Edit Pengumuman';
                    break;
                case 'services':
                    actionLabel = 'Edit Layanan';
                    break;
                default:
                    actionLabel = 'Edit';
                    break;
            }

            breadcrumbs = [
                ...breadcrumbs.slice(0, -1), // Remove last item
                {
                    label: breadcrumbs[breadcrumbs.length - 1].label,
                    href: `/${activeId}`
                }, // Make parent clickable
                { label: actionLabel }
            ];
        }

        return breadcrumbs;
    };

    return {
        activeId: getActiveId(),
        parentGroupId: getParentGroupId(getActiveId()),
        breadcrumbs: getBreadcrumbs(),
        pathname
    };
};
