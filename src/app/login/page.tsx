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
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { login } from '@/lib/api';
import { useAuthContext } from '@/contexts/AuthContext';
import { useNavigationHandler } from '@/hooks/navigation';
import Link from 'next/link';

// Form schema for login
const loginFormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
    const router = useRouter();
    const { redirect } = useNavigationHandler();
    const { login: authLogin, isAuthenticated, isLoading: authLoading } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Redirect to dashboard when authenticated (but not during logout process)
    useEffect(() => { 
        
        if (!authLoading && isAuthenticated && !isLoading) {
            redirect.dashboard();
        }
        // console.log({ authLoading, isAuthenticated, isLoading });
    }, [isAuthenticated, authLoading, isLoading, redirect]);

    const handleSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);  
        try {
            console.log('[LOGIN PAGE] Starting login process...');
            const response = await login({
                email: data.email,
                password: data.password,
            });

            console.log('[LOGIN PAGE] API response:', response);

            if (response && response.token && response.user) {
                console.log('[LOGIN PAGE] Calling authLogin with:', { token: response.token, user: response.user });
                await authLogin(response.token, response.user);
                console.log('[LOGIN PAGE] AuthLogin completed, checking auth state...');

                // Force a small delay to ensure state updates
                setTimeout(() => {
                    console.log('[LOGIN PAGE] Final auth state:', { isAuthenticated, authLoading });
                }, 100);
            } else {
                console.log('[LOGIN PAGE] Invalid response format:', response);
                setError('Invalid response from server');
            }
        } catch (error) {
            console.log('Login error:', error);
            console.log(error);

            // Display the error message directly from API (statusText)
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Login gagal. Silakan coba lagi.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div  style={{ backgroundImage:'url("bg.jpg")' , backgroundSize:"cover"}}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 px-4 py-8"  style={{ background:"rgba(0,0,0,0.2)"}}>
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    {/* <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-white text-2xl font-bold">P</span>
                    </div> */}
                    <h1 className="text-3xl font-bold text-gray-900"><Link href={"/"}>SI ARSIP</Link></h1>
                    <p className="text-white-600 mt-2">Welcome back! Please sign in to your account.</p>
                </div>

                {/* Login Form */}
                <Card className="shadow-lg border-0">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access your account
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
                                                        placeholder="admin@example.com"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                            <FormDescription>
                                                Enter your registered email address
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
                                                        placeholder="Enter your password"
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
                                                Enter your password (minimum 6 characters)
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
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                            </form>
                        </Form>

                        {/* Additional Links */}
                        <div className="mt-6 text-center space-y-2">
                            <p className="text-sm text-gray-600">
                                Don&apos;t have an account?{' '}
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-emerald-600 hover:text-emerald-700"
                                    onClick={() => router.push('/register')}
                                >
                                    Sign up here
                                </Button>
                            </p>
                            <Button
                                variant="link"
                                className="p-0 h-auto text-sm text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    // TODO: Implement forgot password
                                    alert('Forgot password functionality coming soon!');
                                }}
                            >
                                Forgot your password?
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                {/* <div className="mt-8 text-center">
                    <p className="text-xs text-white-500">
                        © 2025 SIARSIP
                    </p>
                </div> */}
            </div>
        </div>
        </div>
    );
}
