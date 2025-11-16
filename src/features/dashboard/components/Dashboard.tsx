'use client'

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import VisitorsCard from './cards/VisitorsCard';

const DashboardMain: React.FC = () => {
    return (
        <div className="flex-1 p-6">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Visitors Card */}
            <div className="mb-8">
                <VisitorsCard />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200 ">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Destinations</p>
                            <p className="text-3xl font-bold text-gray-900">24</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🗺️</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 ">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
                            <p className="text-3xl font-bold text-gray-900">8</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">✈️</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 ">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Upcoming Trips</p>
                            <p className="text-3xl font-bold text-gray-900">3</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">📅</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 ">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Saved Places</p>
                            <p className="text-3xl font-bold text-gray-900">42</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">❤️</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl p-6 border border-gray-200 ">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-emerald-600 font-semibold">🗺️</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Added new destination: Bali</p>
                                    <p className="text-sm text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-blue-600 font-semibold">✈️</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Flight booking confirmed</p>
                                    <p className="text-sm text-gray-500">5 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-purple-600 font-semibold">🏨</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Hotel booking updated</p>
                                    <p className="text-sm text-gray-500">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200  mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                                <p className="font-medium text-emerald-900">🔍 Find Destinations</p>
                                <p className="text-sm text-emerald-600">Discover new places</p>
                            </button>
                            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                <p className="font-medium text-blue-900">✈️ Book Flight</p>
                                <p className="text-sm text-blue-600">Plan your journey</p>
                            </button>
                            <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                                <p className="font-medium text-purple-900">🏨 Find Hotels</p>
                                <p className="text-sm text-purple-600">Comfortable stays</p>
                            </button>
                        </div>
                    </div>

                    {/* Weather Widget */}
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white">
                        <h3 className="font-semibold mb-4">Current Weather</h3>
                        <div className="text-center">
                            <div className="text-4xl mb-2">☀️</div>
                            <div className="text-3xl font-bold mb-1">26°C</div>
                            <div className="text-blue-100">Sunny</div>
                            <div className="text-sm text-blue-200 mt-2">San Francisco, CA</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Destinations */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 ">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Destinations</h2>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg h-48 bg-gradient-to-br from-green-400 to-blue-500 mb-3">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-semibold">Bali, Indonesia</h3>
                                <p className="text-sm opacity-90">Tropical Paradise</p>
                            </div>
                            <button className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center">
                                <span className="text-white">❤️</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">5 reviews</span>
                            <div className="flex items-center">
                                <span className="text-yellow-400">⭐</span>
                                <span className="ml-1 text-gray-600">4.8</span>
                            </div>
                        </div>
                    </div>

                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg h-48 bg-gradient-to-br from-purple-400 to-pink-500 mb-3">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-semibold">Santoorini, Greece</h3>
                                <p className="text-sm opacity-90">Stunning Sunsets</p>
                            </div>
                            <button className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center">
                                <span className="text-white">❤️</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">8 reviews</span>
                            <div className="flex items-center">
                                <span className="text-yellow-400">⭐</span>
                                <span className="ml-1 text-gray-600">4.9</span>
                            </div>
                        </div>
                    </div>

                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg h-48 bg-gradient-to-br from-orange-400 to-red-500 mb-3">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-semibold">Kyoto, Japan</h3>
                                <p className="text-sm opacity-90">Ancient Temples</p>
                            </div>
                            <button className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center">
                                <span className="text-white">❤️</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">12 reviews</span>
                            <div className="flex items-center">
                                <span className="text-yellow-400">⭐</span>
                                <span className="ml-1 text-gray-600">4.7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [active, setActive] = useState<string>('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

    return (
        <div className="h-screen bg-gray-50 text-gray-900 flex">
            <div className="max-w-7xl mx-auto w-full flex">
                <div className="rounded-3xl bg-gray-100 p-2 flex flex-1">
                    <Sidebar
                        activeId={active}
                        onChange={setActive}
                        collapsed={sidebarCollapsed}
                        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                    />
                    <div className="flex-1 overflow-y-auto">
                        <DashboardMain />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;