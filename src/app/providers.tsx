'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <Toaster
                    position="top-center"
                    duration={4000}
                    closeButton
                />
                {children}
            </AuthProvider>
        </ThemeProvider>
    )
}