'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';

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
    </>
  );
}
