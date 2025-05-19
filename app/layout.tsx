import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/app/components/Navbar'; 
import { Toaster } from '@/app/components/ui/toaster';    // ✅ Import correcto del Toaster
import { ToastProvider } from '@/app/hooks/use-toast';    // ✅ Import del Provider

export const metadata: Metadata = {
  metadataBase: new URL('https://chat.vercel.ai'),
  title: 'Next.js Chatbot Template',
  description: 'Next.js chatbot template using the AI SDK.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <Navbar />
            <ToastProvider>          {/* ✅ Envolvemos en el Provider para que los toasts funcionen */}
              <Toaster />            {/* ✅ Nuestro Toaster global */}
              {children}
            </ToastProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
