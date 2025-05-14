'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ✅ Carga dinámica del componente para evitar el error
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });

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
      <main className="min-h-screen bg-gray-950 text-white p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna 1 - Texto y Foto 1 */}
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

        {/* Columna 2 - Texto y Foto 2 */}
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

        {/* Columna 3 - Foto grande */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Nuestros servicios</h2>
          <Image
            src="/images/foto-grande.jpg"
            width={400}
            height={400}
            alt="Foto grande"
            className="rounded-lg w-full object-cover"
          />
        </div>

      </main>
    </>
  );
}
