'use client';

import React,{useEffect} from 'react';
import { useForm,useWatch } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { json, z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Ibidang, IPendataanForm,Iaction} from '@/types/api';
import { FormActions } from '@/components/common'; 
import { createSDocOptions,createStatusOptions } from '@/components/kokonutui/action-search-helper';
import ActionSearchBar from '@/components/kokonutui/action-search-bar';
import { SpendataanText,SpendataanGroup } from '@/components/support';
import DatePicker from 'react-datepicker';
import { _duser,safeDate } from '@/lib/utils'; 
import { useApi } from '@/hooks/api';
import { API_ROUTES } from '@/lib/constants';


// Form schema

const stringFieldValidator = z.string()
//   .min(2, { message: "Minimal 2 karakter." })
//   .max(100, { message: "Maksimal 100 karakter." });
    .min(1, { message: "Field ini wajib diisi." });

const formSchema = z.object({
    kd: stringFieldValidator,
    uraian: stringFieldValidator,
    uraianPoint: z.string().min(5,{message:"Field ini wajib diisi"}),
    uraianPointC: z.number(),
    tgl:z.date(),
    docStatus:stringFieldValidator,
    docC:stringFieldValidator,


    file:z.string().min(10,{message:"Field ini wajib diisi"}),
    
    idBidang:stringFieldValidator,
    kategori:stringFieldValidator,
    jenis:stringFieldValidator,
    rentang:stringFieldValidator,
    retensi:stringFieldValidator,
    keterangan:stringFieldValidator,
    status:stringFieldValidator,
    formNm: stringFieldValidator,
    // formVal: stringFieldValidator,
});

type Iform = z.infer<typeof formSchema>;

interface CategoryDestinationFormProps {
    initialData?: IPendataanForm;
    // eslint-disable-next-line no-unused-vars
    onSubmit: (data: Iform) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
    submitButtonText?: string;
}

export function CFpendataan({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
    submitButtonText = 'Simpan Kategori'
}: CategoryDestinationFormProps) {    

    const { data } = useApi<Ibidang>(API_ROUTES.arsip.bidang);  
        
    const form = useForm<Iform>({
        resolver: zodResolver(formSchema),
        defaultValues: { 
            idBidang: initialData?.idBidang || '', 
            kd: initialData?.kd || '', 
            kategori: initialData?.kategori || '',
            jenis: initialData?.jenis || '[]',
            rentang: initialData?.rentang || '',
            retensi:initialData?.retensi || '',
            keterangan:initialData?.keterangan || '[]',
 
            uraian: initialData?.uraian || '',
            uraianPoint: initialData?.uraianPoint || '[]',
            uraianPointC: Number(initialData?.uraianPointC) || 0,

            tgl: safeDate(initialData?.tgl),

            docStatus: initialData?.docStatus || '',
            docC: initialData?.docC !== undefined
                ? String(initialData.docC)
                : undefined,

            formNm: initialData?.formNm || '---',


            file:initialData?.file|| '',
            status:initialData?.status|| '', 
        },
    }); 

    const handleSubmit = async (data: Iform) => { 

        try {
            await onSubmit(data);
        } catch (error) {
            // console.log('Error submitting form:', error);
        }
    };

    const uraianPoint = useWatch({ control: form.control, name: "uraianPoint" }); 
    useEffect(() => {
    try {
        const val = JSON.parse(uraianPoint || "[]");
        const current = form.getValues("uraianPointC");
        if (current !== val.length) {
        form.setValue("uraianPointC", val.length);
        }
    } catch (err) {
        console.error("uraianPoint bukan JSON valid:", err);
    }
    }, [uraianPoint, form]);

    useEffect(() => {
    const subscription = form.watch((value) => { 
        _duser(value, "formAddArsip"); // simpan ke localStorage
    });

    return () => subscription.unsubscribe();
    }, [form]);

    // useEffect(() => {
    //     const val = JSON.parse(form.getValues('uraianPoint') || '[]'); 
    //     form.setValue('uraianPointC', val.length);
    // }, [form.watch('uraianPoint')]); 
     
    // useEffect(() => {
    //     const subscription = form.watch((value) => {
    //         _duser(value, "formAddArsip"); // simpan ke localStorage
    //     });

    //     return () => subscription.unsubscribe();
    // }, [form]);
    
    return (
        
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg border border-gray-200 p-10">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Klasifikasi Arsip Dinamis ANRI
                            </h3>
                            <hr/>
                            <div className="grid grid-cols-2 gap-4"> 
                                <div className='row'>
                                    <FormField
                                        control={form.control}
                                        name="idBidang"
                                        render={({ field }) => {
                                            const categoryOptions :Iaction[]= data.map((v,i)=>({id:`${i}`,label:v.nm,value:v.id,description:''}));
                                            const selectedCategory = categoryOptions.find(opt => opt.value === field.value);

                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-medium text-gray-700">
                                                        Bidang
                                                    </FormLabel>
                                                    <FormControl>
                                                        <ActionSearchBar
                                                            key={`bdg`}
                                                            actions={categoryOptions}
                                                            placeholder="Pilih Status Dokument"
                                                            value={selectedCategory?.label || ''}
                                                            onSelect={(action) => field.onChange(action?.value || '')}
                                                            onClear={() => field.onChange('')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="kd"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-medium text-gray-700">
                                                    kode klasifikasi
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="kode klasifikasi"
                                                        className="text-sm"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); 
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    /> 
                                    <FormField
                                        control={form.control}
                                        name="kategori"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-medium text-gray-700">
                                                    kategori
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="kode klasifikasi"
                                                        className="text-sm"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); 
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    /> 
                                </div>
                                <div className='row'>
                                    
                                    <FormField 
                                        control={form.control}
                                        name="rentang"
                                        render={({ field }) => {
                                            
                                            const data=JSON.parse(field.value || '[]'); 
                                            const kolom = [{"Dari Tahun":""},{"Hingga Tahun":""}];
                                            const initial = data ? data :kolom;   
                                            
                                            // const handleSendValue = React.useCallback(
                                            //     (val: Array<Record<string, string>>) => field.onChange(JSON.stringify(val.length === 0 ? [] : val)),
                                            //     [field]
                                            // );
                                            interface IcdtItem {
                                                nama: string;
                                                value: string;
                                                keterangan?: string;
                                            }
                                            const handleSendValue = React.useCallback(
                                                (val: IcdtItem[]) => {
                                                    // Convert IcdtItem[] ke Record<string,string>[] (hanya nama dan value)
                                                    const converted: Record<string, string>[] = val.map(item => ({ [item.nama]: item.value }));
                                                    field.onChange(JSON.stringify(converted.length === 0 ? [] : converted));
                                                },
                                                [field]
                                            );

                                            return ( 
                                                <FormItem className='w-full'>
                                                    <SpendataanGroup
                                                        field={kolom.flatMap(obj => Object.keys(obj))}
                                                        judul='Rentang Waktu'
                                                        initialData={initial}
                                                        sendValue={handleSendValue} />
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )
                                        }}
                                    />
                                    <FormField 
                                        control={form.control}
                                        name="retensi"
                                        render={({ field }) => {
                                            const data=JSON.parse(field.value || '[]'); 
                                            const kolom = [{"Aktif":""},{"Inaktif":""}];
                                            const initial = data ? data :kolom; 
                                            
                                            return ( 
                                                <FormItem className='w-full'>
                                                    <SpendataanGroup
                                                        field={kolom.flatMap(obj => Object.keys(obj))}
                                                        judul='Retensi'
                                                        initialData={initial}
                                                        sendValue={(val) => field.onChange(JSON.stringify(val.length == 0?[]:val))} />
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )
                                        }}
                                    /> 
                                    <FormField 
                                        control={form.control}
                                        name="keterangan"
                                        render={({ field, fieldState }) => {  
                                            return <SpendataanText 
                                                judul='keterangan' 
                                                dlist={JSON.parse(field.value)} 
                                                sendValue={(val)=>field.onChange(JSON.stringify(val))}
                                                error={fieldState.error?.message}/>
                                        }} 
                                    /> 
                                    <FormField 
                                        control={form.control}
                                        name="jenis"
                                        render={({ field, fieldState }) => {  
                                            return <SpendataanText 
                                                judul='jenis Dokument' 
                                                dlist={JSON.parse(field.value)} 
                                                sendValue={(val)=>field.onChange(JSON.stringify(val))}
                                                error={fieldState.error?.message}/>
                                        }} 
                                    /> 
                                </div>
                                    
                            </div> 
                        </div> 
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-10">
                        <div> 
                            <h3 className="p-10px text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Daftar isi Berkas
                            </h3> 
                            <div className="grid grid-cols-2 gap-4">
                                <div className='row'>
                                    
                                    <FormField
                                        control={form.control}
                                        name="uraian"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-medium text-gray-700">
                                                    Uraian Data Arsip
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="uraian"
                                                        className="text-sm"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); 
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="tgl"
                                        render={({ field }) => (
                                            <>
                                                <FormItem className='flex justify-between p-2 border-gray-200'  style={{ alignItems:"center" }}>
                                                    <FormLabel className="text-xs font-medium text-gray-700">
                                                        Tanggal
                                                    </FormLabel>
                                                    <FormControl> 
                                                        <DatePicker
                                                            
                                                            selected={field.value}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                // handleTitleChange(e.target.value);
                                                            }}
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="dd/mm/yyyy"
                                                            className="text-sm w-full border-gray-200 rounded px-3 py-2 text-sm"
                                                        />


                                                        {/* <Input
                                                            placeholder="Masukkan nama kategori"
                                                            className="text-sm"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleTitleChange(e.target.value);
                                                            }}
                                                            type='date'
                                                        /> */}
                                                    </FormControl>
                                                    
                                                </FormItem>
                                                <FormMessage className="text-xs" />
                                            </>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="docStatus"
                                        render={({ field }) => {
                                            const categoryOptions = createSDocOptions();
                                            const selectedCategory = categoryOptions.find(opt => opt.value === field.value);

                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-medium text-gray-700">
                                                        Status Dokument
                                                    </FormLabel>
                                                    <FormControl>
                                                        <ActionSearchBar
                                                            actions={categoryOptions}
                                                            placeholder="Pilih Status Dokument"
                                                            value={selectedCategory?.label || ''}
                                                            onSelect={(action) => field.onChange(action?.value || '')}
                                                            onClear={() => field.onChange('')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="docC"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-medium text-gray-700">
                                                    Jumlah Dokument
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="10 lembar, 5 file, dll"
                                                        className="text-sm"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); 
                                                        }} 
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => {
                                            const categoryOptions = createStatusOptions();
                                            const selectedCategory = categoryOptions.find(opt => opt.label === field.value);

                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-medium text-gray-700">
                                                        Status Tingkatan Dokument
                                                    </FormLabel>
                                                    <FormControl>
                                                        <ActionSearchBar
                                                            actions={categoryOptions}
                                                            placeholder="Pilih Status Dokument"
                                                            value={selectedCategory?.label || ''}
                                                            onSelect={(action) => field.onChange(action?.label || '')}
                                                            onClear={() => field.onChange('')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div> 
                                <div className="row">
                                    <FormField 
                                        control={form.control}
                                        name="uraianPoint"
                                        render={({ field, fieldState }) => {  
                                            return <SpendataanText 
                                                judul='Point Uraian' 
                                                dlist={JSON.parse(field.value)} 
                                                sendValue={(val)=>field.onChange(JSON.stringify(val))}
                                                error={fieldState.error?.message}/>
                                        }}
                                        
                                    /> 
                                    <FormField
                                        
                                        control={form.control}
                                        name="file"
                                        render={({ field }) => {
                                            const { hard,soft,online }=JSON.parse(field.value || '{}'); 
                                            const fieldHard = [{"No Lemari":""},{"No Laci":""}];
                                            const initialHardcopy = hard ? hard :fieldHard; 
                                            
                                            const fieldSoft = [{"lokasi penyimpanan":""},{"nama file":""}];
                                            const initialSoftcopy = soft ? soft : fieldSoft;   

                                            const fieldOnline = [{"link":''},{"lokasi penyimpanan":""},{"nama file":""}];
                                            const initialOnline = online ? online : fieldOnline;     
                                            const current = JSON.parse(field.value || '{}');
                                            
                                            return (
                                                // border border-gray-200 p-1
                                                <FormItem className='w-full'>
                                                    <FormLabel className="text-xs font-medium text-gray-700">
                                                        File Data & Informasi
                                                    </FormLabel>
                                                    <div className='p-2'>
                                                        <SpendataanGroup
                                                            field={fieldHard.flatMap(obj => Object.keys(obj))} judul='Hardcopy'
                                                            initialData={initialHardcopy}
                                                            sendValue={(val) => field.onChange(JSON.stringify({...current,hard:val.length == 0?undefined:val}))} />
                                                        <SpendataanGroup
                                                            field={fieldSoft.flatMap(obj => Object.keys(obj))} judul='Softcopy'
                                                            initialData={initialSoftcopy}
                                                            sendValue={(val) => field.onChange(JSON.stringify({...current,soft:val.length == 0?undefined:val}))} />
                                                        <SpendataanGroup
                                                            field={fieldOnline.flatMap(obj => Object.keys(obj))} judul='Online'
                                                            initialData={initialOnline}
                                                            sendValue={(val) => field.onChange(JSON.stringify({...current,online:val.length == 0?undefined:val}))} />
                                                    </div>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )
                                        }}
                                    />
                                    
                                </div>
                                
                                
                            </div>
                        </div>
                                            
                    </div>
                    <FormActions
                        onCancel={onCancel}
                        isLoading={isLoading}
                        submitButtonText={submitButtonText}
                    />
                </form>
            </Form>
    );
}

