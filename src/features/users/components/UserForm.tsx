'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User as UserIcon, Save, X } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { User } from '@/types/api';
import { toast } from 'sonner';
import { createItem, updateItem } from '@/lib/actions/api';
import { getApiToken } from '@/lib/api';
import { Route } from 'next';

// Form validation schema - will be modified based on edit mode
const createUserFormSchema = (isEditMode: boolean) => z.object({
    fullname: z.string().min(2, {
        message: 'Nama lengkap minimal 2 karakter.',
    }).max(100, {
        message: 'Nama lengkap maksimal 100 karakter.',
    }),
    username: z.string().min(3, {
        message: 'Username minimal 3 karakter.',
    }).max(50, {
        message: 'Username maksimal 50 karakter.',
    }),
    email: z.string().email({
        message: 'Format email tidak valid.',
    }),
    password: isEditMode
        ? z.string().optional().or(z.literal(''))
        : z.string().min(6, {
            message: 'Password minimal 6 karakter.',
        }),
    avatar: z.string().optional().or(z.literal('')),
}).refine((data) => {
    // For edit mode, password is optional but if provided must be >= 6 chars
    if (isEditMode && data.password && data.password !== '') {
        return data.password.length >= 6;
    }
    return true;
}, {
    message: 'Password minimal 6 karakter.',
    path: ['password'],
});

export type UserFormValues = z.infer<ReturnType<typeof createUserFormSchema>>;

interface UserFormProps {
    initialData?: User | null;
    isEditMode?: boolean;
    userId?: string;
}

export default function UserForm({
    initialData,
    isEditMode = false,
    userId
}: UserFormProps) {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form with validation
    const userFormSchema = createUserFormSchema(isEditMode);
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            fullname: '',
            username: '',
            email: '',
            password: '',
            avatar: '',
        },
    });

    // Load initial data when in edit mode
    useEffect(() => {
        if (initialData) {
            form.reset({
                fullname: initialData.fullname || '',
                username: initialData.username || '',
                email: initialData.email || '',
                password: '', // Always empty for security
                avatar: initialData.avatar || '',
            });
        }
    }, [initialData, form]);

    const onSubmit = async (data: UserFormValues) => {
        setIsSubmitting(true);

        try {
            // Get auth token
            const token = await getApiToken();

            // Prepare FormData for API
            const formData = new FormData();
            formData.append('fullname', data.fullname);
            formData.append('username', data.username);
            formData.append('email', data.email);
            formData.append('avatar', data.avatar || '');

            // Only include password if it's provided and not empty
            if (data.password && data.password !== '') {
                formData.append('password', data.password);
            }

            // Add metadata
            formData.append('created_by', '1');
            formData.append('edited_by', '1');

            if (isEditMode && userId) {
                // Update existing user
                await updateItem<User>('user', Number(userId), formData, token);
                toast.success('User berhasil diperbarui!');
            } else {
                // Create new user
                await createItem<User>('user', formData, token);
                toast.success('User berhasil ditambahkan!');
            }

            router.push('/users' as unknown as Route);
        } catch (error) {
            console.log('Error saving user:', error);
            toast.error(isEditMode ? 'Gagal memperbarui user.' : 'Gagal menambahkan user.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Link
                    href={`/users` as unknown as Route}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Daftar User
                </Link>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditMode ? 'Edit User' : 'Tambah User Baru'}
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {isEditMode ? 'Perbarui informasi user' : 'Tambahkan user baru ke sistem'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg border border-gray-200">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Informasi User
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-medium text-gray-700">
                                                Nama Lengkap *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Masukkan nama lengkap"
                                                    className="text-sm"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-medium text-gray-700">
                                                Username *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Masukkan username"
                                                    className="text-sm"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-medium text-gray-700">
                                                Email *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Masukkan email"
                                                    className="text-sm"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-medium text-gray-700">
                                                Password {!isEditMode && '*'}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder={isEditMode ? "Kosongkan jika tidak ingin mengubah" : "Masukkan password"}
                                                    className="text-sm"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs text-gray-500">
                                                {isEditMode ? 'Kosongkan jika tidak ingin mengubah password' : 'Password minimal 6 karakter'}
                                            </FormDescription>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="avatar"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-medium text-gray-700">
                                                URL Avatar
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://example.com/avatar.jpg"
                                                    className="text-sm"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs text-gray-500">
                                                Link gambar avatar (opsional)
                                            </FormDescription>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Avatar Preview */}
                            {form.watch('avatar') && (
                                <div className="mt-4">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-xs font-medium text-gray-700">Preview Avatar:</span>
                                        <SmartImage
                                            src={form.watch('avatar') || ''}
                                            alt="Avatar Preview"
                                            width={64}
                                            height={64}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="border-t border-gray-100 pt-6">
                            <div className="flex items-center justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push('/users' as unknown as Route)}
                                    disabled={isSubmitting}
                                    className="text-sm"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-pulse"></div>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            {isEditMode ? 'Simpan Perubahan' : 'Tambah User'}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}