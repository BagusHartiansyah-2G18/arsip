'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Megaphone, Settings, ChevronRight } from 'lucide-react';
import { Idashboard, IDitem } from '@/types/api';
import { useApi } from '@/hooks/api';
import { API_ROUTES } from '@/lib/constants/routes';
import DashboardItem from '@/components/ui/DashboartItem';

export default function DashboardPage() {
    const { data, loading, error } = useApi<Idashboard>(API_ROUTES.DASHBOARD); 
    const dt = useMemo<Idashboard>(() => { 
         return data[0];
    }, [data]);   
    
    return (
        <div className="max-w-7xl mx-auto">
            {/* Greetings Section */}
            <div className="mb-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back,</h1>
                    <p className="text-gray-600 mt-1">Data dan Informasi SI ARSIP</p>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Terjadi Kesalahan
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Upcoming Announcements & Events - Side by Side Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Upcoming Announcements Section */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Megaphone className="w-4 h-4 text-emerald-600" />
                            <h3 className="text-sm font-semibold text-gray-900">
                                Data Arsip ({loading ? '...' : dt?.total ?? 0})
                            </h3>
                        </div>
                        <Link
                            href="/"
                            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {loading ? (
                            // Loading skeleton
                            <>
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 animate-pulse">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 animate-pulse">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : dt ? (

                            <>
                                {
                                    dt?.form ? (
                                        <div key="addFT" className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Megaphone className="w-4 h-4 text-emerald-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">Form Tambahan</h4>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                        {dt.form.length} Data
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ): (
                                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 text-center">
                                            <Megaphone className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <h3 className="text-xs font-medium text-gray-900 mb-1">Form Tambahan</h3>
                                            <p className="text-xs text-gray-600">belum ada form tambahan yang dibuat</p>
                                        </div>
                                    )
                                }
                                {
                                    dt?.kd ? (
                                        <div key="klasf" className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Megaphone className="w-4 h-4 text-emerald-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">Kode Klasifikasi</h4>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                        {dt.kd.length} Data
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ): (
                                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 text-center">
                                            <Megaphone className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <h3 className="text-xs font-medium text-gray-900 mb-1">Kode Klasifikasi</h3>
                                            <p className="text-xs text-gray-600">Belum dilakukan Pendataan</p>
                                        </div>
                                    )
                                }
                                {
                                    dt?.status ? (
                                        <div key="status" className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Megaphone className="w-4 h-4 text-emerald-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">Status Kerahasiaan</h4>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                        {dt.status.length} Data
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ): (
                                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 text-center">
                                            <Megaphone className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <h3 className="text-xs font-medium text-gray-900 mb-1">Status Kerahasiaan</h3>
                                            <p className="text-xs text-gray-600">Belum dilakukan Pendataan</p>
                                        </div>
                                    )
                                }
                            </>  
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 text-center">
                                <Megaphone className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                <h3 className="text-xs font-medium text-gray-900 mb-1">Data & Informasi</h3>
                                <p className="text-xs text-gray-600">Belum dilakukan Pendataan </p>
                            </div>
                        )}
                    </div>
                </div>

            { dt && dt.form && <DashboardItem judul='Data Form Tambahan'  dt={dt.form}/>}
            { dt && dt.kd && <DashboardItem judul='Data Kode Klasifikasi' dt={dt.kd}/>}
            { dt && dt.status && <DashboardItem judul='Data Status Dokumen' dt={dt.status}/>}

            </div>

           

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-4 h-4 text-emerald-600" />
                    <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* <a
                        href="/destinations"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-emerald-200 transition-all group"
                    >
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-semibold text-gray-900">Kelola Destinasi</h3>
                            <p className="text-xs text-gray-600">Tambah, edit, atau hapus destinasi wisata</p>
                        </div>
                    </a>
                    <a
                        href="/events"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-emerald-200 transition-all group"
                    >
                        <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                            <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-semibold text-gray-900">Kelola Event</h3>
                            <p className="text-xs text-gray-600">Tambah, edit, atau hapus event dan acara</p>
                        </div>
                    </a>
                    <a
                        href="/announcements"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-emerald-200 transition-all group"
                    >
                        <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                            <Megaphone className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-semibold text-gray-900">Kelola Pengumuman</h3>
                            <p className="text-xs text-gray-600">Tambah, edit, atau hapus pengumuman</p>
                        </div>
                    </a>
                    <a
                        href="/settings"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-emerald-200 transition-all group"
                    >
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                            <Settings className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-semibold text-gray-900">Kelola Pengaturan</h3>
                            <p className="text-xs text-gray-600">Konfigurasi sistem dan pengaturan aplikasi</p>
                        </div>
                    </a> */}
                </div>
            </div>
        </div>
    );
}



