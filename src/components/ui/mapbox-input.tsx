'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxInputProps {
    value?: string;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
    // eslint-disable-next-line no-unused-vars
    onLocationSelect?: (lat: number, lng: number) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    mapboxToken?: string;
    height?: string;
}


export function MapboxInput({
    // eslint-disable-next-line no-unused-vars
    value: _value = '',
    onChange,
    onLocationSelect,
    // eslint-disable-next-line no-unused-vars
    placeholder: _placeholder = 'Pilih lokasi di peta...',
    className,
    disabled = false,
    mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    height = '400px'
}: MapboxInputProps) {
    const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
    const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);
    const [isProcessingClick, setIsProcessingClick] = useState(false);

    const mapContainerRef = useRef<HTMLDivElement>(null);

    // Initialize Mapbox
    useEffect(() => {
        if (typeof window !== 'undefined' && mapboxToken) {
            mapboxgl.accessToken = mapboxToken;
            console.log('Mapbox token set:', mapboxToken.substring(0, 20) + '...');
        } else {
            console.error('Mapbox token not found:', mapboxToken);
            setMapError('Mapbox token tidak ditemukan');
        }
    }, [mapboxToken]);

    // Initialize map - simplified approach
    useEffect(() => {
        if (!mapContainerRef.current || mapInstance || !mapboxToken) {
            console.log('Skipping map initialization:', {
                hasContainer: !!mapContainerRef.current,
                hasInstance: !!mapInstance,
                hasToken: !!mapboxToken
            });
            return;
        }

        console.log('Initializing map with token:', mapboxToken.substring(0, 20) + '...');

        // Ensure container has proper dimensions
        const container = mapContainerRef.current;
        if (container.offsetWidth === 0 || container.offsetHeight === 0) {
            console.warn('Container has no dimensions, waiting...');
            setTimeout(() => {
                if (container.offsetWidth > 0 && container.offsetHeight > 0) {
                    console.log('Container now has dimensions, retrying...');
                    // Trigger re-initialization by clearing mapInstance
                    setMapInstance(null);
                }
            }, 100);
            return;
        }

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [106.8456, -6.2088], // Jakarta coordinates
            zoom: 10,
            attributionControl: false,
            maxZoom: 18,
            minZoom: 5
        });

        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        const handleMapLoad = () => {
            console.log('Map loaded successfully');
            setMapInstance(map);
            setIsMapReady(true);
            setMapError(null);
        };

        const handleMapError = (e: mapboxgl.ErrorEvent) => {
            console.error('Mapbox error:', e);
            setMapError('Gagal memuat peta');
            setIsMapReady(false);
        };

        const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
            if (disabled || isProcessingClick) return;

            // Prevent multiple rapid clicks
            setIsProcessingClick(true);

            const { lng, lat } = e.lngLat;

            // Remove ALL existing markers from the map (more aggressive approach)
            if (marker) {
                marker.remove();
                setMarker(null);
            }

            // Clear previous coordinates immediately
            setCurrentCoords(null);

            // Force remove any remaining markers by querying the map container
            const mapContainer = map.getContainer();
            const existingMarkers = mapContainer.querySelectorAll('.mapboxgl-marker');
            existingMarkers.forEach(markerElement => {
                markerElement.remove();
            });

            // Add new marker at clicked location
            const newMarker = new mapboxgl.Marker({
                color: '#10b981',
                scale: 1.2
            })
                .setLngLat([lng, lat])
                .addTo(map);

            // Set new coordinates and marker atomically to prevent race conditions
            const newCoords = { lat, lng };
            setMarker(newMarker);
            setCurrentCoords(newCoords);

            // Move map center to clicked location (fly to center)
            map.flyTo({
                center: [lng, lat],
                zoom: Math.max(map.getZoom(), 15), // Ensure minimum zoom level
                duration: 1000, // Animation duration in milliseconds
                essential: true // This animation is considered essential with respect to prefers-reduced-motion
            });

            // Call callback with the exact coordinates that were set
            if (onLocationSelect) {
                onLocationSelect(lat, lng);
            }

            // Reset processing flag after a short delay to prevent rapid clicks
            setTimeout(() => {
                setIsProcessingClick(false);
            }, 300);
        };

        map.on('load', handleMapLoad);
        map.on('error', handleMapError);
        map.on('click', handleMapClick);

        // Cleanup function
        return () => {
            console.log('Cleaning up map...');
            map.off('load', handleMapLoad);
            map.off('error', handleMapError);
            map.off('click', handleMapClick);
            map.remove();
            setMapInstance(null);
            setIsMapReady(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to prevent re-initialization

    const handleClearLocation = () => {
        if (marker) {
            marker.remove();
            setMarker(null);
        }

        // Force remove any remaining markers by querying the map container
        if (mapInstance) {
            const mapContainer = mapInstance.getContainer();
            const existingMarkers = mapContainer.querySelectorAll('.mapboxgl-marker');
            existingMarkers.forEach(markerElement => {
                markerElement.remove();
            });
        }

        setCurrentCoords(null);
        setIsProcessingClick(false); // Reset processing flag
        onChange?.('');
    };

    return (
        <div className={cn("relative", className)}>
            <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">
                    Klik pada peta untuk memilih lokasi (akan menghapus lokasi sebelumnya)
                </p>
                {currentCoords && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-emerald-800">
                                    Koordinat terpilih:
                                </p>
                                <p className="text-sm text-emerald-700">
                                    Lat: {currentCoords.lat.toFixed(6)}, Lng: {currentCoords.lng.toFixed(6)}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleClearLocation}
                                disabled={disabled}
                                className="text-xs"
                            >
                                Hapus
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div
                ref={mapContainerRef}
                className="w-full rounded-lg border border-gray-200 bg-gray-100"
                style={{
                    height,
                    minHeight: '300px',
                    position: 'relative'
                }}
            />

            {!isMapReady && !mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-center">
                        <div className="w-8 h-8 border-b-2 border-emerald-600 rounded-full mx-auto mb-2 animate-pulse"></div>
                        <p className="text-sm text-gray-500">Memuat peta...</p>
                    </div>
                </div>
            )}

            {mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-center p-4">
                        <div className="text-red-500 mb-2">
                            <MapPin className="h-8 w-8 mx-auto" />
                        </div>
                        <p className="text-sm text-red-600 font-medium mb-2">{mapError}</p>
                        <p className="text-xs text-gray-500">
                            Pastikan Mapbox token valid di file .env.local
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
