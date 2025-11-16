'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Users, Key, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/auth';
import { getUserInitials } from '@/lib/utils';

export default function AuthPage() {
    const { user, token, logout, verifyToken } = useAuth();
    const [tokenStatus, setTokenStatus] = useState<boolean | null>(null);
    const [checkingToken, setCheckingToken] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        checkTokenStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkTokenStatus = async () => {
        if (!token) return;

        setCheckingToken(true);
        try {
            const isValid = await verifyToken(token);
            setTokenStatus(isValid);
        } catch (error) {
            console.log('Error checking token:', error);
            setTokenStatus(false);
        } finally {
            setCheckingToken(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Implement password change logic here
        alert('Password change functionality to be implemented');
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Authentication</h1>
                    <p className="text-gray-600">Manage authentication and security settings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current User Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Current User
                        </CardTitle>
                        <CardDescription>
                            Information about the currently logged-in user
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                                {user?.name ? getUserInitials(user.name) : 'U'}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{user?.name || 'Unknown User'}</h3>
                                <p className="text-sm text-gray-600">{user?.email || 'No email'}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Role:</span>
                            <Badge variant="secondary">{user?.username || 'User'}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">User ID:</span>
                            <span className="text-sm font-mono text-gray-900">{user?.id || 'N/A'}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Token Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="w-5 h-5" />
                            Token Status
                        </CardTitle>
                        <CardDescription>
                            Current authentication token information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Status:</span>
                            <div className="flex items-center gap-2">
                                {checkingToken ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                                ) : tokenStatus === true ? (
                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Valid
                                    </Badge>
                                ) : tokenStatus === false ? (
                                    <Badge variant="destructive">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        Invalid
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary">Unknown</Badge>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Token:</span>
                            <span className="text-xs font-mono text-gray-500 truncate max-w-32">
                                {token ? `${token.substring(0, 20)}...` : 'No token'}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={checkTokenStatus}
                                disabled={checkingToken}
                            >
                                <Activity className="w-4 h-4 mr-2" />
                                Check Status
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <Shield className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Security Settings
                        </CardTitle>
                        <CardDescription>
                            Manage your account security
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                                Change Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* API Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            API Information
                        </CardTitle>
                        <CardDescription>
                            Authentication API endpoints and usage
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Login Endpoint:</span>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">POST /auth/login</code>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Register Endpoint:</span>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">POST /peaceful/register</code>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Verify Endpoint:</span>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">GET /auth/verify</code>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Logout Endpoint:</span>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">POST /auth/logout</code>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
