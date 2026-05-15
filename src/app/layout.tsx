import './globals.css';
import { ThemeProvider } from 'next-themes';
import NextTopLoader from 'nextjs-toploader'; 
import { AuthDialogProvider } from './context/AuthDialogContext';
import { AuthProvider } from '../contexts/AuthContext';
// import { getServerSession } from 'next-auth'; // ⬅️ hanya jika kamu pakai next-auth


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(); // ⬅️ ambil session di sini

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader />
        <AuthProvider>
          <AuthDialogProvider> 
              <ThemeProvider attribute="class" enableSystem defaultTheme="system">
                {children}
              </ThemeProvider> 
          </AuthDialogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}