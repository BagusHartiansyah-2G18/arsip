'use client';

import { useRouter } from 'next/navigation';
import { buildRouteWithQuery } from '@/lib/constants/routes';
import { Route } from 'next';
import { Pen } from 'lucide-react';

export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    PENDATAAN: '/pendataan',

    JENIS: '/jenis',
    SUMBER: '/sumber',
    FORM: '/form',
    SETTINGS: '/settings',
    AUTH: '/auth',
    KLASIFIKASI:'/klasifikasi',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const useNavigationHandler = () => {
    const router = useRouter();

    const normalizeRouteKey = (route: RouteKey | string): RouteKey => {
        if (typeof route !== 'string') return route;
        const upper = route.toUpperCase();
        if (upper in ROUTES) return upper as RouteKey;
        const map: Record<string, RouteKey> = {
            home: 'HOME',
            dashboard: 'DASHBOARD',
            pendataan: 'PENDATAAN',

            jenis: 'JENIS',
            sumber: 'SUMBER',
            form: 'FORM',
            klasifikasi:"KLASIFIKASI",
            settings: 'SETTINGS',
            auth: 'AUTH',
        };
        const key = map[route.toLowerCase()];
        return key ?? 'HOME';
    };

    const navigateTo = (route: RouteKey | string) => {
        const key = normalizeRouteKey(route);
        router.push(ROUTES[key] as Route);
    };

    const navigateToRoute = (routeKey: RouteKey) => {
        router.push(ROUTES[routeKey] as Route);
    };

    const navigateToDynamicRoute = (template: string, params: Record<string, string | number>) => {
        let route = template;

        Object.entries(params).forEach(([key, value]) => {
            route = route.replace(new RegExp(`\\[${key}\\]`, 'g'), String(value));
        });

        router.push(route as unknown as Route);
    };

    const navigateWithParams = (route: string, params: Record<string, string | number | boolean>) => {
        const url = buildRouteWithQuery(route, params);
        router.push(url as unknown as Route);
    };

    const navigateToAdd = (resource: string) => { router.push(`/${resource}/add` as unknown as Route); };
    const navigateToEdit = (resource: string, id: string | number) => { router.push(`/${resource}/edit/${id}` as unknown as Route); };

    const navigateBack = () => { router.back(); };
    const navigateForward = () => { router.forward(); };
    const replaceRoute = (route: string) => { router.replace(route as unknown as Route); };

    const redirectTo = (url: string) => { window.location.href = url; };
    const redirectToRoute = (route: RouteKey) => { window.location.href = ROUTES[route]; };
    const redirectToDynamicRoute = (template: string, params: Record<string, string | number>) => {
        let route = template;

        Object.entries(params).forEach(([key, value]) => {
            route = route.replace(new RegExp(`\\[${key}\\]`, 'g'), String(value));
        });

        window.location.href = route;
    };
    const redirectWithParams = (route: string, params: Record<string, string | number | boolean>) => {
        const url = buildRouteWithQuery(route, params);
        window.location.href = url;
    };
    const redirectToExternal = (url: string) => {
        const fullUrl = url.startsWith('http') ? url : `https://${url}`;
        window.location.href = fullUrl;
    };
    const redirectToAdd = (resource: string) => { window.location.href = `/${resource}/add`; };
    const redirectToEdit = (resource: string, id: string | number) => { window.location.href = `/${resource}/edit/${id}`; };

    const goTo = {
        home: () => router.push(ROUTES.HOME),
        dashboard: () => router.push(ROUTES.DASHBOARD),
        // destinations: () => router.push(ROUTES.DESTINATIONS),
        // categories: () => router.push(ROUTES.CATEGORIES),
        // tagDestinations: () => router.push(ROUTES.TAG_DESTINATIONS),
        // flows: () => router.push(ROUTES.FLOWS),
        // galleries: () => router.push(ROUTES.GALLERIES),
        // events: () => router.push(ROUTES.EVENTS),
        // announcements: () => router.push(ROUTES.ANNOUNCEMENTS),
        // services: () => router.push(ROUTES.SERVICES),
        // settings: () => router.push(ROUTES.SETTINGS),
        auth: () => router.push(ROUTES.AUTH),
    } as const;

    const redirect = {
        home: () => window.location.href = ROUTES.HOME,
        dashboard: () => window.location.href = ROUTES.DASHBOARD,
        // destinations: () => window.location.href = ROUTES.DESTINATIONS,
        // categories: () => window.location.href = ROUTES.CATEGORIES,
        // tagDestinations: () => window.location.href = ROUTES.TAG_DESTINATIONS,
        // flows: () => window.location.href = ROUTES.FLOWS,
        // galleries: () => window.location.href = ROUTES.GALLERIES,
        // events: () => window.location.href = ROUTES.EVENTS,
        // announcements: () => window.location.href = ROUTES.ANNOUNCEMENTS,
        // services: () => window.location.href = ROUTES.SERVICES,
        settings: () => window.location.href = ROUTES.SETTINGS,
        auth: () => window.location.href = ROUTES.AUTH,
    } as const;

    return {
        navigateTo,
        navigateToRoute,
        navigateToDynamicRoute,
        navigateWithParams,
        navigateToAdd,
        navigateToEdit,
        navigateBack,
        navigateForward,
        replaceRoute,
        redirectTo,
        redirectToRoute,
        redirectToDynamicRoute,
        redirectWithParams,
        redirectToExternal,
        redirectToAdd,
        redirectToEdit,
        goTo,
        redirect,
        ROUTES,
    };
};


