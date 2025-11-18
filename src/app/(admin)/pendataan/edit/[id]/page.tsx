'use client';

import React, { useState, useEffect } from 'react';
import { FolderTree } from 'lucide-react';
import { CFpendataan } from '@/features/pendataan';
import { FormHeader } from '@/components/common';
import { createPendataan, updPendataan } from '@/lib/api';
import { useRouter,useParams } from 'next/navigation';
import { ErrorAlert } from '@/components/ui/error-alert';  
import { useApi } from '@/hooks/api';
import { IPendataanForm } from '@/types';
import { API_ROUTES,buildRouteWithId } from '@/lib/constants/routes';

export default function AddCategoryPage() {
    const params = useParams(); 
    const id = params?.id as string;
    const { data} = useApi<IPendataanForm>(buildRouteWithId(API_ROUTES.arsip.pendataan,id));
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, _error] = useState({ on: false, message: "", onRetry: () => { } }); 
    const defaultDT =  {
        id: '',
        nm: '',
        idUser: '',
        idPimpinan: '',  
        idDin:'',
        img: '',
        jab: '',
        jabatan: '',
        kd: '',
        kategori: '',
        jenis: '',
        rentang: '',
        retensi: '',
        keterangan: '',
        uraian: '',
        uraianPoint: '',
        uraianPointC: 0,
        tgl: '',
        docStatus: '',
        docC: '',
        file: '',
        idBidang:'',
        status: '',

    };
    const [local, _local] = useState<{next: boolean;  dt: IPendataanForm;}>({ next: false, dt:defaultDT,}); 

    if(!local.next  && data.length>0){
        
        _local({next:true,dt:data.map(v=>({
            ...v,
            tgl:new Date(String(v.tgl).replace(/"/g, ''))
        }))[0]})
    }

    const handleSubmit = async (data: {
        kd: string;
        uraian: string;
        uraianPoint: string;
        uraianPointC: number;
        tgl: Date;
        docStatus: string;
        docC: string;
        file: string; // pastikan ini adalah File atau Blob, bukan string path
        idBidang: string;
        kategori: string;
        jenis: string;
        rentang: string;
        retensi: string;
        keterangan: string;
        status: string;
        }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("kd", data.kd);
            formData.append("uraian", data.uraian);
            formData.append("uraianPoint", data.uraianPoint);
            formData.append("uraianPointC", String(data.uraianPointC));
            formData.append("tgl", data.tgl.toISOString());
            formData.append("docStatus", data.docStatus);
            formData.append("docC", data.docC);
            formData.append("file", data.file); // pastikan ini adalah File, bukan string
            formData.append("idBidang", data.idBidang);
            formData.append("kategori", data.kategori);
            formData.append("jenis", data.jenis);
            formData.append("rentang", data.rentang);
            formData.append("retensi", data.retensi);
            formData.append("keterangan", data.keterangan);
            formData.append("status", data.status);

            const resp = await updPendataan(id, formData);
            router.push("/pendataan");
        } catch (err) {
            _error({
            on: true,
            message: String(err),
            onRetry: () => handleSubmit(data),
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

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

            {
                local.next &&
                <CFpendataan
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={loading}
                    initialData={local.dt}
                    submitButtonText="Simpan Pendataan"
                />
            }
        </div>
    );
}

