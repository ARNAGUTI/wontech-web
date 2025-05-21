import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/app/components/ClientProviders';

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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
