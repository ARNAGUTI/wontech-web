'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import Chat from '@/components/chat';
import { Session } from 'next-auth';

const emptySession: Session = {
  user: {
    id: '',
    name: null,
    email: null,
    image: null,
    type: 'guest', // 👈 Solución aplicada
  },
  expires: '',
};

export default function HomePage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <main id="section1" className="min-h-screen bg-gray-950 text-white p-12">
        <h1 className="text-5xl font-bold text-center mb-12">TÍTULO DE TU WEB</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Texto de presentación</h2>
            <p className="text-gray-400">
              Aquí puedes escribir algo introductorio sobre tu servicio o IA.
            </p>
            <Image
              src="/images/foto1.jpg"
              width={200}
              height={200}
              alt="Foto 1"
              className="rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Más información</h2>
            <p className="text-gray-400">
              Otra sección de texto o características.
            </p>
            <Image
              src="/images/foto2.jpg"
              width={200}
              height={200}
              alt="Foto 2"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>

      {/* Chat integrado en el HomePage */}
      <div id="section3" className="bg-gray-900 text-white p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">💬 Chat en vivo</h2>
        <Chat
          id="general"
          initialMessages={[]}
          initialChatModel="gpt-4"
          initialVisibilityType="public"
          isReadonly={false}
          session={emptySession}
          autoResume={false}
        />
      </div>
    </>
  );
}
