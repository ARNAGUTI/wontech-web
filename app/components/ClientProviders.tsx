'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/app/components/ui/toaster';
import Navbar from '@/app/components/Navbar';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <Navbar />
        {children}
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}
