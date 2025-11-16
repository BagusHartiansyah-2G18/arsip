'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FolderTree } from 'lucide-react'; 
import { FormHeader } from '@/components/common';
import { updNamaForm } from '@/lib/api'; 

import { useApi } from '@/hooks/api';
import { Iarsip } from '@/types/api';

import { ErrorAlert } from '@/components/ui/error-alert';
import { API_ROUTES, buildRouteWithId } from '@/lib/constants';
import { DataTable } from '@/components/DataTable'; 
import { readDataArsip } from '@/lib/utils';
import { CFpendataanAuto } from '@/features/pendataan';

export default function PendAuto() {
    const params = useParams(); 
    const idArsip = params?.id as string; 
    const { data, loading:loadDt, error: dataError, refetch } = useApi<Iarsip>(buildRouteWithId(API_ROUTES.arsip.pendataan,idArsip));
    

    const columns = [
        {
            key: 'valueNames',
            label: 'keterangan',
        },
        {
            key: 'values',
            label: 'values',
        }
    ]; 
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, _error] = useState({on:false, message:"",onRetry:()=>{}});

    

    const handleSubmit = async (data: {
        id: string;
        formAs: string;
        formNm: string;
        formVal: string;
        }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("formAs", data.formAs);
            formData.append("formNm", data.formNm);
            formData.append("formVal", data.formVal);

            const resp = await updNamaForm(idArsip, formData);
            if (resp.kd) {
            router.push("/pendataan");
            return;
            }
            throw resp.error;
        } catch (err) {
            _error({
            on: true,
            message: String(err),
            onRetry: () => handleSubmit(data),
            });
        } finally {
            // setLoading(false); // aktifkan jika perlu
        }
        };

    const handleCancel = () => {
        router.back();
    };

    const dtTranform = readDataArsip(data);
    // console.log(dtTranform);
    
    
    return ( 
        <div className="space-y-6">
            {error.on && (
                <ErrorAlert
                    message={error.message || 'Terjadi kesalahan yang tidak diketahui'}
                    onRetry={() => {
                        error.onRetry();
                    }}
                />
            )}
            <FormHeader
                title="Form Pendataan Arsip"
                description="uraikan dengan baik dan tambahkan keterangan pendukung lainnya."
                backHref="/pendataan"
                backText="kembali"
                icon={FolderTree}
            />

            <DataTable
                title="Informasi Arsip"
                columns={columns.map((col) => ({
                    accessorKey: col.key,
                    header: col.label, 
                    cell: ({ row }: any) => {
                        const value = (row.original as Record<string, unknown>)[col.key];
                        return String(value ?? '');
                    },
                }))}
                data={dtTranform || []}
                loading={loading} 
            />

            {data.length>0 && 
                <CFpendataanAuto
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={loading}
                    submitButtonText="Simpan Catatan"
                    initialData={data[0]}
                /> 
            }
            
        </div>
    );
}

