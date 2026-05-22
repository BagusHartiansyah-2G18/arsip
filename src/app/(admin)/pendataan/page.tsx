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
import { IAfile, Iarsip } from '@/types/api';
import { delPendataan } from '@/lib/api';
import { API_ROUTES } from '@/lib/constants/routes';
import { readDataArsip } from '@/lib/utils';
import { Route } from 'next';

export default function dataPage() {
    const router = useRouter();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDetailOpen, _isDetailOpen] = useState(false);
    const [selectedColumnKey, setSelectedColumnKey] = useState<string | null>(null);
    const [filterValue, setFilterValue] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const { data, loading, error: dataError, refetch } = useApi<Iarsip>(API_ROUTES.arsip.pendataan);
    const [filters, setFilters] = useState<Record<string, string>>({});

    const [ddetail, _ddetail] = useState<Record<string, string>[]>([]);
    
    const columns = [
        {
            key: 'bidang.nm',
            label: 'Bidang',
        },{
            key: 'kategori',
            label: 'Kategori',
        },{
            key: 'uraian',
            label: 'Uraian',
        },
        {
            key: 'docC',
            label: 'Jumlah',
        },{
            key: 'tgl',
            label: 'Tanggal',
        },{
            key: 'status',
            label: 'Status',
        },

    ];
    
    // Show error messages if any API calls failed
    const hasError = dataError;
    const errorMessage = dataError;  
    
 
    const filteredData = (data || []).filter((item) => {
        return Object.entries(filters).every(([key, val]) => {
            if (!val) return true;

            const keys = key.split('.');
            let value: any = item;

            for (const k of keys) {
                value = value?.[k];
            }

            return String(value ?? '')
                .toLowerCase()
                .includes(val.toLowerCase());
        });
    });

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Menajemen Arsip</h1>
                <p className="text-gray-600">Pendataan Informasi</p>
            </div>

            {/* Error Display */}
            {hasError && (
                <ErrorAlert
                    message={errorMessage || 'Terjadi kesalahan yang tidak diketahui'}
                    onRetry={() => {
                        if (dataError) refetch();
                        window.location.reload();
                    }}
                />
            )}

            <DataTable
                title="Pendataan Arsip"
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
                data={filteredData}
                loading={loading}
                onOpenFilter={() => setIsFilterOpen(true)}
                filterDrawer={(
                    <>
                        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                                <SheetHeader>
                                    <SheetTitle>Filter Data</SheetTitle>
                                </SheetHeader>

                                <div className="p-4 space-y-4">
                                    {columns.map((col) => (
                                        <div key={col.key}>
                                            <Label>{col.label}</Label>
                                            <Input
                                                value={filters[col.key] || ''}
                                                onChange={(e) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        [col.key]: e.target.value,
                                                    }))
                                                }
                                                placeholder={`Filter ${col.label}`}
                                            />
                                        </div>
                                    ))}

                                    <div className="flex gap-2 pt-4 border-t">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => setFilters({}) }
                                        >
                                            Reset
                                        </Button>

                                        <Button
                                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                                            onClick={() => setIsFilterOpen(false)}
                                        >
                                            Terapkan
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </>
                   
                )}
                onAdd={() => router.push('/pendataan/add')}
                onEdit={(item: Iarsip) => router.push(`/pendataan/edit/${item.id}`)}
                onDelete={async (item: Iarsip) => {
                    await delPendataan(item.id)
                    refetch();
                }}
                deleteConfirmTitle="Konfirmasi Hapus Kategori"
                deleteConfirmMessage={(item: unknown) => {
                    const category = item as Iarsip;
                    return `Apakah Anda yakin ingin menghapus uraian "${category.uraian}"?`;
                }}
                searchKey="kategori,uraian,status"
                searchPlaceholder="Cari kategori..."
                addButtonText="Entri Arsip Baru"
                emptyStateTitle="Tidak ada kategori"
                emptyStateDescription="Belum ada kategori yang tersedia. Mulai dengan menambahkan kategori baru."
                emptyStateActionLabel="Tambah Kategori"
                emptyStateOnAction={() => router.push('/pendataan/add')}
                customActions={[
                    {
                        label: 'Form Tambahan',
                        // icon: <DownloadIcon />,
                        onClick: (item) => router.push(`/pendataan/autoForm/${item.id}` as Route)
                        // }, {
                        // label: 'Kirim Email',
                        // variant: 'success',
                        // onClick: (item) => console.log('Email', item),
                    },{
                        label: 'File',
                        onClick: (item) =>  {
                            const link = (JSON.parse(String(item.file)) as IAfile)
                                .online?.find(v => v.nama === "link")?.value;

                            if (link) {
                                window.open(link, "_blank");
                            } else {
                                console.log("Link kosong");
                            }
                        },
                    },{
                        label: 'Detail',
                        onClick: (item) =>{  
                            
                            _ddetail(readDataArsip([item]));

                            _isDetailOpen(true);        
                        },
                    },
                ]}
            />
        </div>
    );
}