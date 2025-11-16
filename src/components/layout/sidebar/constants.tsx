import {
    Home,
    MapPin,
    Calendar,
    Megaphone,
    Settings,
    Wrench,
    Shield,
    FolderTree,
    Route,
    Tag,
    Images,
} from 'lucide-react';
import { NavGroup } from './types';

export const navigationData = [
    {
        section: 'Main',
        items: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                icon: Home
            },
        ]
    },
    {
        section: 'Manajemen Arsip',
        items: [
            {
                id: 'pendataan',
                title: 'Pendataan',
                icon: MapPin
            },
            // {
            //     id: 'categories',
            //     title: 'Kategori Destinasi',
            //     icon: FolderTree
            // },
            // {
            //     id: 'tag-destinations',
            //     title: 'Tag Destinasi',
            //     icon: Tag
            // },
            // {
            //     id: 'flows',
            //     title: 'Alur Destinasi',
            //     icon: Route
            // },
            // {
            //     id: 'galleries',
            //     title: 'Galeri',
            //     icon: Images
            // },
        ]
    },
    {
        section: 'Analisis Data',
        items: [
            {
                id: 'sumber',
                title: 'Sumber Data',
                icon: FolderTree
            },{
            //     id: 'jenis',
            //     title: 'Jenis Dokumen',
            //     icon: Calendar
            // },{
                id: 'form',
                title: 'Form Tambahan',
                icon: FolderTree
            },
            // {
            //     id: 'klasifikasi',
            //     title: 'Klasifikasi',
            //     icon: Megaphone
            // },
            // {
            //     id: 'services',
            //     title: 'Services',
            //     icon: Wrench
            // },
        ]
    },
    {
        section: 'System',
        items: [
            // {
            //     id: 'settings',
            //     title: 'Settings',
            //     icon: Settings
            // },
            {
                id: 'auth',
                title: 'Authentication',
                icon: Shield
            },
        ]
    },
];

export const allNavigationItems: NavGroup[] = navigationData.flatMap((section: { items: NavGroup[] }) => section.items);