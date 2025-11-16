'use client';

import React, { useEffect ,useState} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  z } from 'zod';
import { useWatch } from 'react-hook-form';

import { Sdialog } from '@/components/support/Sdialog';

import {
    Form, 
    FormField,
    FormItem, 
    FormMessage,
    FormControl,
    FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CategoryDestination, Iarsip, Iops } from '@/types/api';
import { FormActions } from '@/components/common';
import { SpendataanAuto } from '@/components/support'; 
import { makeOptions } from '@/components/kokonutui/action-search-helper';
import ActionSearchBar from '@/components/kokonutui/action-search-bar';


import { useApi } from '@/hooks/api';
import { API_ROUTES } from '@/lib/constants';

const stringFieldValidator = z.string()
    //   .min(2, { message: "Minimal 2 karakter." })
    //   .max(100, { message: "Maksimal 100 karakter." });
    .min(1, { message: "Field ini wajib diisi." });

const formSchema = z.object({
    id: stringFieldValidator,
    formAs: stringFieldValidator,
    formNm: z.string().min(5, { message: "Field ini wajib diisi" }),
    formVal: z.string().min(5, { message: "Field ini wajib diisi" }),
});

type Iform = z.infer<typeof formSchema>;

interface CategoryDestinationFormProps {
    initialData?: Iarsip;
    // eslint-disable-next-line no-unused-vars
    onSubmit: (data: Iform) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
    submitButtonText?: string;
}

export function CFpendataanAuto({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
    submitButtonText = 'Simpan Catatan', 
}: CategoryDestinationFormProps) {
    const { data:dformOps } = useApi<Iops>(API_ROUTES.arsip.opsForm);  
 
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [confirmItem, setConfirmItem] = useState<any>(null);

    const [tdata, _tdata] = useState<Iform>();

     const [isChecked, setIsChecked] = useState(false);

    


    
    const form = useForm<Iform>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: initialData?.id || '',
            formAs: initialData?.formAs || "---",

            formNm: String(initialData?.formNm) || '{}',
            formVal: String(initialData?.formVal) || '',
        },
    });

    const handleSubmit = async (data: Iform) => { 
        if(data.formAs == "---" && !confirmOpen){ 
            return setConfirmOpen(true); 
        }
        return handleSubmitReal(data);
    };
    const handleSubmitReal = async (data: Iform) => { 
        return await onSubmit(data);  
        // try {  
        //     const fd = new FormData();
        //     Object.entries(data).forEach(([key, value]) => {
        //         fd.append(key, value);
        //     }); 
            
        //     return await onSubmit(fd);  
        // } catch (error) {
        //     console.log('Error submitting form:', error);
        // }
    };

    const formNmValue = useWatch({
        control: form.control,
        name: 'formNm',
    });

    // useEffect(() => {
    //     try {
    //         const val = JSON.parse((formNmValue == "{}"?"[]":formNmValue) || '[]'); 
    //         form.setValue('formVal', val?.map(v=>v.value).join(",")||"[]");
    //     } catch (err) {
    //         console.error('Invalid JSON in formNm:', err);
    //     }
    // }, [formNmValue]);  
    type FormItem = { value: string };
    useEffect(() => {
        try {
            const raw = formNmValue === '{}' ? '[]' : formNmValue || '[]';
            const parsed = JSON.parse(raw) as FormItem[];

            const joined = Array.isArray(parsed)
            ? parsed.map((v: FormItem) => v.value).join(',')
            : '';

            form.setValue('formVal', joined || '[]');
        } catch (err) {
            console.error('Invalid JSON in formNm:', err);
            form.setValue('formVal', '[]');
        }
    }, [formNmValue, form]);


    useEffect(() => {
        const checkForm = async () => {
            const val = await form.getValues("formNm");
            setIsChecked(val !== undefined && val.length > 3);
        };
        checkForm();
    }, [formNmValue]);
 
    
    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            Form Entri Informasi Tambahan
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {
                                !isChecked &&
                                <FormField
                                    control={form.control}
                                    name="formAs"
                                    render={({ field }) => {
                                        const opdData = makeOptions(dformOps);
                                        const selected = dformOps.find(opt => opt.value === field.value);

                                        return (
                                            <FormItem>
                                                <FormLabel className="text-xs font-medium text-gray-700">
                                                    Pilihan Form
                                                </FormLabel>
                                                <FormControl>
                                                    <ActionSearchBar
                                                        actions={opdData}
                                                        placeholder="Pilih Status Dokument"
                                                        value={selected?.label || ''}
                                                        // value={''}
                                                        onSelect={(action) => field.onChange(action?.value || '')}
                                                        onClear={() => field.onChange('')}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        );
                                    }}
                                />
                            }
                            <FormField
                                control={form.control}
                                name="formNm"
                                render={({ field,fieldState }) => {
                                    const parsedValue = (() => {
                                        try {
                                            return JSON.parse(field.value || '{}');
                                        } catch {
                                            return {};
                                        }
                                    })();

                                    const hard = Array.isArray(parsedValue) ? parsedValue : [];
                                    const fieldHard = hard.map(obj => Object.keys(obj)[0]); // ambil nama field dari objek
                                    
                                    
                                    return (
                                        <FormItem className='w-full'>
                                            <SpendataanAuto
                                                judul="Tambah Catatan Tambahan"
                                                field={fieldHard}
                                                initialData={hard}
                                                sendValue={(val) => {
                                                    const updated = val.length === 0 ? undefined : val;
                                                    field.onChange(JSON.stringify(updated));
                                                }}
                                                
                                                error={fieldState.error?.message}
                                            />  
                                        </FormItem>
                                        // border border-gray-200 p-1
                                    )
                                }}
                            />
                        </div>
                    </div>

                    <FormActions
                        onCancel={onCancel}
                        isLoading={isLoading}
                        submitButtonText={submitButtonText}
                    />
                    <Sdialog 
                        open={confirmOpen}
                        onOpenChange={setConfirmOpen}
                        loading={confirmLoading}
                        success={confirmSuccess}
                        error={confirmError}
                        title="Konfirmasi"
                        description="apakah anda ingin memberikan label untuk form ini ?"
                        item={confirmItem}
                        confirmLabel="Tambahkan"
                        cancelLabel="lewati"
                        onConfirm={async () => { 
                            await form.handleSubmit(handleSubmit)();
                            // setConfirmLoading(true);
                            // try { 
                            //     handleSubmitReal({} as Iform) 
                            //     // setConfirmSuccess(true);
                            // } catch (err) {
                            // setConfirmError(true);
                            // } finally {
                                // setConfirmLoading(false);
                                // setConfirmOpen(false);
                            // }
                        }}
                        onClose={async () => {
                            await form.handleSubmit(handleSubmit)();
                            // handleSubmitReal({} as Iform)
                            // setConfirmOpen(false); 
                            // setConfirmItem(null); 
                        }}

                    >
                        <FormField
                            control={form.control}
                            name="formAs"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-medium text-white-700">
                                        Nama atau Label Form
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nama atau Label untuk Form ini"
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

                    </Sdialog>
                </form>
            </Form>
            
        </div>
    );
}

