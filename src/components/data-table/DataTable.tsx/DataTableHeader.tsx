import * as React from 'react';
import { Search } from 'lucide-react';

interface DataTableHeaderProps {
    title?: string;
}

export function DataTableHeader({ title }: DataTableHeaderProps) {
    if (!title) return null;

    return (
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            </div>
        </div>
    );
}
