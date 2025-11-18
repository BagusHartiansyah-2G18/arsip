'use client';

import React, { useState, useEffect } from 'react';
import { FolderTree } from 'lucide-react';
import { CFpendataan } from '@/features/pendataan';
import { FormHeader } from '@/components/common';
import { createPendataan } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ErrorAlert } from '@/components/ui/error-alert';
import { Sdialog } from '@/components/support/Sdialog';
import { __duser } from '@/lib/utils'; 
import { Ibidang, IPendataanForm} from '@/types';
import { Route } from 'next';

export default function AddCategoryPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, _error] = useState({ on: false, message: "", onRetry: () => { } });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [confirmItem, setConfirmItem] = useState<any>(null);
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
        formNm: '',

    };
    const [local, _local] = useState<{next: boolean;  dt: IPendataanForm;}>({ next: false, dt:defaultDT,
    }); 


    useEffect(() => {
        const fetchData = async () => {
            const saved = await __duser("formAddArsip") as IPendataanForm;
            _local({ next: true, dt: saved||defaultDT });
        };
        fetchData();
    }, []);


    // const handleSubmit = async (data: any) => {
    //     setLoading(true);
    //     try {
    //         // const formData = new FormData(); 
    //         const resp = await createPendataan(data); 
    //         if(resp.kd){
    //             await localStorage.removeItem("formAddArsip");
    //             setConfirmItem(resp.id);
    //             setConfirmOpen(true);
    //             return 1;
    //         }
    //         throw resp.error;
            
    //     } catch (err) { 
    //         _error({ on: true, message: String(err), onRetry: () => { handleSubmit(data) } });
    //         // if (error instanceof Error) {
    //         //     console.log('Create Category failed', error.message);
    //         // } else {
    //         //     console.log('Create Category failed body:', error);
    //         // }
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async (data: {
        kd: string;
        uraian: string;
        uraianPoint: string;
        uraianPointC: number;
        tgl: Date;
        docStatus: string;
        docC: string;
        file: string;
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
            // if (data.tgl instanceof Date) {
            //     formData.append("tgl", data.tgl.toISOString());
            // } else if (typeof data.tgl === "string" && data.tgl) {
            //     formData.append("tgl", new Date(data.tgl).toISOString());
            // } else {
            //     formData.append("tgl", ""); // atau handle sesuai kebutuhan
            // }

            formData.append("docStatus", data.docStatus);
            formData.append("docC", data.docC);
            formData.append("file", data.file); // pastikan ini adalah file blob, bukan string path
            formData.append("idBidang", data.idBidang);
            formData.append("kategori", data.kategori);
            formData.append("jenis", data.jenis);
            formData.append("rentang", data.rentang);
            formData.append("retensi", data.retensi);
            formData.append("keterangan", data.keterangan);
            formData.append("status", data.status);

            const resp = await createPendataan(formData); // kirim FormData, bukan object biasa

            if (resp.kd) {
                await localStorage.removeItem("formAddArsip");
                setConfirmItem(resp.id);
                setConfirmOpen(true);
            }
        } catch (err) {
            _error({
            on: true,
            message: String(err),
            onRetry: () => {
                handleSubmit(data);
            },
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
            <Sdialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                loading={confirmLoading}
                success={confirmSuccess}
                error={confirmError}
                title="Konfirmasi, Tahapan Selanjutnya"
                description="apakah ada informasi penting untuk di data ?"
                item={confirmItem}
                confirmLabel="ada"
                cancelLabel="close"
                onConfirm={async () => {
                    setConfirmLoading(true);
                    try {
                        const url = '/pendataan/autoForm/' + confirmItem as Route; 
                        router.push(url);
                        setConfirmSuccess(true);
                    } catch (err) {
                        setConfirmError(true);
                    } finally {
                        setConfirmLoading(false);
                    }
                }}
                onClose={() => {
                    setConfirmOpen(false);
                    setConfirmSuccess(false);
                    setConfirmError(false);
                    setConfirmItem(null);
                    router.push('/pendataan');
                }}

            />
        </div>
    );
}

