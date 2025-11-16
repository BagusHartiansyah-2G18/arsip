'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Download, Maximize2, MoreHorizontal } from 'lucide-react';

interface VisitorsCardProps {
    title?: string;
    subtitle?: string;
    value?: number;
    deltaPct?: number; // e.g., 2.8 means +2.8%
    deltaAbs?: number; // e.g., 377
    series?: number[]; // sparkline points
}

const defaultSeries = [120, 180, 140, 220, 210, 260, 180, 300, 280, 340, 310, 360, 450, 420, 480, 520, 490, 530, 620, 570, 590, 610, 740];

const VisitorsCard: React.FC<VisitorsCardProps> = ({
    title = 'Visitors',
    subtitle = "Visitors represent individuals that visit your site.",
    value = 13852,
    deltaPct = 2.8,
    deltaAbs = 377,
    series = defaultSeries,
}) => {
    const [containerWidth, setContainerWidth] = useState(600);
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const w = Math.floor(entry.contentRect.width);
                if (w > 0) setContainerWidth(w);
            }
        });
        observer.observe(chartRef.current);
        return () => observer.disconnect();
    }, []);

    const maxY = Math.max(...series) * 1.1;
    const avg = series.reduce((a, b) => a + b, 0) / series.length;

    // Build sparkline path responsively
    const width = containerWidth;
    const height = 140;
    const padding = 12;
    const innerW = Math.max(1, width - padding * 2);
    const innerH = height - padding * 2;
    const step = innerW / Math.max(1, (series.length - 1));

    const points = series.map((y, i) => {
        const xPos = padding + i * step;
        const yPos = padding + innerH - (y / maxY) * innerH;
        return `${xPos},${yPos}`;
    }).join(' ');

    const avgY = padding + innerH - (avg / maxY) * innerH;

    // Hover state
    const [hoverX, setHoverX] = useState<number | null>(null);
    const [hoverIdx, setHoverIdx] = useState<number | null>(null);

    const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
        const rect = (e.target as SVGElement).closest('svg')!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        // clamp
        const cx = Math.max(padding, Math.min(width - padding, x));
        const idx = Math.round((cx - padding) / step);
        setHoverX(cx);
        setHoverIdx(Math.max(0, Math.min(series.length - 1, idx)));
    };

    const handleLeave = () => {
        setHoverX(null);
        setHoverIdx(null);
    };

    const markerX = hoverIdx !== null ? padding + hoverIdx * step : null;
    const markerY = hoverIdx !== null ? (padding + innerH - (series[hoverIdx] / maxY) * innerH) : null;

    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-200 ">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Download"><Download className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Expand"><Maximize2 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="More"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex items-baseline gap-3">
                    <div className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{value.toLocaleString('en-US')}</div>
                    <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <span>▲</span>{deltaPct}% (+{deltaAbs})
                    </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">vs. {(value - deltaAbs).toLocaleString('en-US')} last period</div>
            </div>

            <div className="mt-4" ref={chartRef}>
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-emerald-50/50 to-transparent">
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36" onMouseMove={handleMove} onMouseLeave={handleLeave}>
                        {/* y-axis grid (simple dashed) */}
                        {[0, 1, 2, 3].map(i => (
                            <line key={i} x1={0} x2={width} y1={padding + (i * innerH) / 3} y2={padding + (i * innerH) / 3} stroke="#E5E7EB" strokeDasharray="4 4" />
                        ))}
                        {/* average dashed line */}
                        <line x1={0} x2={width} y1={avgY} y2={avgY} stroke="#111827" strokeDasharray="6 6" opacity={0.5} />
                        {/* area gradient */}
                        <defs>
                            <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                            </linearGradient>
                        </defs>
                        {/* area */}
                        <polyline points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`} fill="url(#sparkFill)" stroke="none" />
                        {/* line */}
                        <polyline points={points} fill="none" stroke="#10B981" strokeWidth={3} />

                        {/* hover crosshair & marker */}
                        {hoverX !== null && markerX !== null && markerY !== null && (
                            <g>
                                <line x1={markerX} x2={markerX} y1={padding} y2={height - padding} stroke="#10B981" strokeDasharray="4 4" opacity={0.8} />
                                <circle cx={markerX} cy={markerY} r={4} fill="#10B981" stroke="#ffffff" strokeWidth={2} />
                            </g>
                        )}
                    </svg>

                    {/* tooltip */}
                    {hoverIdx !== null && markerX !== null && markerY !== null && (
                        <div
                            className="absolute pointer-events-none bg-white border border-gray-200  rounded-md px-2 py-1 text-[11px] text-gray-900"
                            style={{ left: Math.min(width - 100, Math.max(8, markerX + 8)), top: Math.max(8, markerY - 28) }}
                        >
                            <div><span className="text-gray-500">x:</span> {hoverIdx + 1}</div>
                            <div><span className="text-gray-500">y:</span> {series[hoverIdx]}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VisitorsCard;