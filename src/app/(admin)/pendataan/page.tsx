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

    console.log(ddetail);
    
 
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
                data={data || []}
                loading={loading}
                onOpenFilter={() => setIsFilterOpen(true)}
                filterDrawer={(
                    <>
                        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                                <SheetHeader>
                                    <SheetTitle>Filter Data</SheetTitle>
                                </SheetHeader>
                                <div className="p-4 space-y-3">
                                    <div>
                                        <Label htmlFor="column-select">Kolom</Label>
                                        <Select value={selectedColumnKey || ''} onValueChange={setSelectedColumnKey}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih kolom" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {columns.map((c) => (
                                                    <SelectItem key={c.key} value={c.key}>
                                                        {c.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Nilai (non-date) */}
                                    {!/(date|posted_at|created_at|updated_at)$/i.test(String(selectedColumnKey || '')) && (
                                        <div>
                                            <Label htmlFor="filter-value">Nilai</Label>
                                            <Input
                                                id="filter-value"
                                                type="text"
                                                value={filterValue}
                                                onChange={(e) => setFilterValue(e.target.value)}
                                                placeholder="Masukkan kata kunci"
                                            />
                                        </div>
                                    )}

                                    {/* Rentang tanggal */}
                                    {/(date|posted_at|created_at|updated_at)$/i.test(String(selectedColumnKey || '')) && (
                                        <>
                                            <div>
                                                <Label htmlFor="from-date">Dari Tanggal</Label>
                                                <Input
                                                    id="from-date"
                                                    type="date"
                                                    value={fromDate}
                                                    onChange={(e) => setFromDate(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="to-date">Sampai Tanggal</Label>
                                                <Input
                                                    id="to-date"
                                                    type="date"
                                                    value={toDate}
                                                    onChange={(e) => setToDate(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="flex gap-2 pt-2 border-t border-gray-200 mt-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedColumnKey(null);
                                                setFilterValue('');
                                                setFromDate('');
                                                setToDate('');
                                            }}
                                            className="flex-1"
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            onClick={() => setIsFilterOpen(false)}
                                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                                        >
                                            Terapkan
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Sheet open={isDetailOpen} onOpenChange={_isDetailOpen}>
                            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                                <SheetHeader>
                                    <SheetTitle>Detail Informasi</SheetTitle>
                                </SheetHeader>
                                <div className="p-4 space-y-3">
                                   {
                                    ddetail.map(v=>(
                                        <div className=' border-t border-gray-200'>
                                            <Label htmlFor="column-select">{v.valueNames}</Label>
                                            <h4 >{v.values}</h4>
                                        </div> 
                                    ))}


                                    <div className="flex gap-2 pt-2 border-t border-gray-200 mt-2">
                                        <Button
                                            onClick={() => _isDetailOpen(false)}
                                            className="flex-1 bg-gray-500 hover:bg-gray-600"
                                        >
                                            close
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
                        onClick: (item) =>  window.open('https://example.com', '_blank'),
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