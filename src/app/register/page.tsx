'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { register } from '@/lib/api';
import { useAuth } from '@/hooks/auth';
import { useAuthContext } from '@/contexts/AuthContext';
import { useNavigationHandler } from '@/hooks/navigation';

// Form schema for registration
const registerFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }).max(50, {
        message: "Name must not exceed 50 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Please confirm your password.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const { login: authLogin } = useAuth();
    const { redirect } = useNavigationHandler()
    const { isAuthenticated, isLoading: authLoading } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    // Redirect to dashboard when authenticated (but not during logout process)
    useEffect(() => {
        if (!authLoading && isAuthenticated && !isLoading) {
            redirect.dashboard();
        }
    }, [isAuthenticated, authLoading, isLoading, redirect]);

    const handleSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await register({
                username: data.name,
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (response && response.token && response.user) {
                // Store token and user data
                await authLogin(response.token, response.user);
            }
        } catch (error) {
            console.log('Registration error:', error);

            // Display the error message directly from API (statusText)
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Registrasi gagal. Silakan coba lagi.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 px-4 py-8">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-white text-2xl font-bold">P</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Peaceful</h1>
                    <p className="text-gray-600 mt-2">Create your account to get started.</p>
                </div>

                {/* Register Form */}
                <Card className="shadow-lg border-0">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
                        <CardDescription className="text-center">
                            Fill in your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                {/* Error Alert */}
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <User className="w-4 h-4 text-gray-500" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        type="text"
                                                        placeholder="John Doe"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormDescription>
                                                Enter your full name
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email Field */}
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
                                                        placeholder="john@example.com"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormDescription>
                                                Enter your email address
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <Lock className="w-4 h-4 text-gray-500" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Create a password"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                    <InputGroupAddon align="inline-end">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            disabled={isLoading}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-4 w-4" />
                                                            ) : (
                                                                <Eye className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormControl>
                                            <FormDescription>
                                                Create a strong password (minimum 6 characters)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password Field */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <Lock className="w-4 h-4 text-gray-500" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm your password"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                    <InputGroupAddon align="inline-end">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            disabled={isLoading}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="h-4 w-4" />
                                                            ) : (
                                                                <Eye className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormControl>
                                            <FormDescription>
                                                Re-enter your password to confirm
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </Button>
                            </form>
                        </Form>

                        {/* Additional Links */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-emerald-600 hover:text-emerald-700"
                                    onClick={() => router.push('/login')}
                                >
                                    Sign in here
                                </Button>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        © 2024 Peaceful. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
