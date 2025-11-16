'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getApiBaseUrl } from '@/lib/api/config';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Upload, Mail, Facebook, Instagram, Music, Twitter, Youtube } from 'lucide-react';
import { Setting } from '@/types/api';
import { FileUpload } from '@/components/ui/file-upload';

// Form schema based on Setting interface
const settingsFormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    facebook: z.string().url({
        message: "Please enter a valid Facebook URL.",
    }),
    instagram: z.string().url({
        message: "Please enter a valid Instagram URL.",
    }),
    tiktok: z.string().url({
        message: "Please enter a valid TikTok URL.",
    }),
    x: z.string().url({
        message: "Please enter a valid X (Twitter) URL.",
    }),
    youtube: z.string().url({
        message: "Please enter a valid YouTube URL.",
    }),
    banner: z.instanceof(File).optional().or(z.string().optional()),
});

type SettingsFormData = z.infer<typeof settingsFormSchema>;

interface SettingsFormProps {
    initialData?: Setting;
    // eslint-disable-next-line no-unused-vars
    onSubmit: (data: SettingsFormData) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
    submitButtonText?: string;
    title?: string;
    description?: string;
    showOnlyFields?: string[];
}

export function SettingsForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
    submitButtonText = 'Save Settings',
    title = 'Settings Configuration',
    description = 'Configure your application settings and social media links',
    showOnlyFields
}: SettingsFormProps) {
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [, setBannerFile] = useState<File | null>(null);

    const form = useForm<SettingsFormData>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            email: initialData?.email || '',
            facebook: initialData?.facebook || '',
            instagram: initialData?.instagram || '',
            tiktok: initialData?.tiktok || '',
            x: initialData?.x || '',
            youtube: initialData?.youtube || '',
            banner: initialData?.banner || undefined,
        },
    });

    // Helper function to check if a field should be shown
    const shouldShowField = (fieldName: string): boolean => {
        if (!showOnlyFields) return true;
        return showOnlyFields.includes(fieldName);
    };

    const handleBannerChange = (file: File | null) => {
        if (file) {
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file));
            form.setValue('banner', file);
        } else {
            setBannerFile(null);
            setBannerPreview(null);
            form.setValue('banner', undefined);
        }
    };

    const handleSubmit = async (data: SettingsFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.log('Error submitting form:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
                    {/* Email Field */}
                    {shouldShowField('email') && (
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <Mail className="w-4 h-4 text-gray-500" />
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                type="email"
                                                placeholder="admin@example.com"
                                                {...field}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormDescription>
                                        The main contact email for your application
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {/* Social Media Links */}
                    {(shouldShowField('facebook') || shouldShowField('instagram') || shouldShowField('tiktok') || shouldShowField('x') || shouldShowField('youtube')) && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Social Media Links</h3>

                            {/* Facebook */}
                            {shouldShowField('facebook') && (
                                <FormField
                                    control={form.control}
                                    name="facebook"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Facebook</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <Facebook className="w-4 h-4 text-blue-600" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        placeholder="https://facebook.com/yourpage"
                                                        {...field}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {/* Instagram */}
                            {shouldShowField('instagram') && (
                                <FormField
                                    control={form.control}
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instagram</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <Instagram className="w-4 h-4 text-pink-600" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        placeholder="https://instagram.com/yourpage"
                                                        {...field}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {/* TikTok */}
                            {shouldShowField('tiktok') && (
                                <FormField
                                    control={form.control}
                                    name="tiktok"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>TikTok</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <Music className="w-4 h-4 text-black" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        placeholder="https://tiktok.com/@yourpage"
                                                        {...field}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {/* X (Twitter) */}
                            {shouldShowField('x') && (
                                <FormField
                                    control={form.control}
                                    name="x"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>X (Twitter)</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <Twitter className="w-4 h-4 text-gray-900" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        placeholder="https://x.com/yourpage"
                                                        {...field}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {/* YouTube */}
                            {shouldShowField('youtube') && (
                                <FormField
                                    control={form.control}
                                    name="youtube"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>YouTube</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <Youtube className="w-4 h-4 text-red-600" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        placeholder="https://youtube.com/@yourchannel"
                                                        {...field}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                    )}

                    {/* Banner Field */}
                    {shouldShowField('banner') && (
                        <FormField
                            control={form.control}
                            name="banner"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Banner Image</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            onFileSelect={handleBannerChange}
                                            accept="image/*"
                                            preview={bannerPreview || (initialData?.banner ? `${getApiBaseUrl()}/uploads/setting/${initialData.banner}` : null)}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Upload a banner image for your application (optional)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {/* Form Actions */}
                    <div className="flex items-center gap-4 pt-6">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            {isLoading ? 'Saving...' : submitButtonText}
                        </Button>
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}
