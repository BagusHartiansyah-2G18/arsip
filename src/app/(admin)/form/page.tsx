'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/DataTable';
import { ErrorAlert } from '@/components/ui/error-alert';
import { useApi } from '@/hooks/api';
import { Iarsip } from '@/types/api';
import { API_ROUTES } from '@/lib/constants/routes';

export default function CategoriesPage() {
    const router = useRouter();
    const { data, loading, error: categoriesError, refetch } = useApi<Iarsip>(API_ROUTES.arsip.analisis.form);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedColumnKey, setSelectedColumnKey] = useState<string | null>(null);
    const [filterValue, setFilterValue] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    console.log(data);
    
    const columns = [
        {
            key: 'formAs',
            label: 'Nama Form',
        },
        {
            key: '_count._all',
            label: 'Total Penggunaan',
        }
    ];

    const filterDT = () => { 
        return data;
    }


    // Show error messages if any API calls failed
    const hasError = categoriesError;
    const errorMessage = categoriesError;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Form Tambahan</h1>
                <p className="text-gray-600">Informasi Form Tambahan Pendataan</p>
            </div>

            {/* Error Display */}
            {hasError && (
                <ErrorAlert
                    message={errorMessage || 'Terjadi kesalahan yang tidak diketahui'}
                    onRetry={() => {
                        if (categoriesError) refetch();
                        window.location.reload();
                    }}
                />
            )}

            <DataTable
                title="Daftar Nama / Label Form Tambahan"
                columns={columns.map((col) => ({
                    accessorKey: col.key,
                    header: col.label,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    cell: ({ row }: any) => {
                        const keys = col.key.split(".");
                        let value: any = row.original;

                        for (const key of keys) {
                            value = value?.[key];
                        }

                        return String(value ?? '');
                    },
                }))}
                data={filterDT() || []}
                loading={loading}
                searchPlaceholder="Cari..." 
            />
        </div>
    );
}