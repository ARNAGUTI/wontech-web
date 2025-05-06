
'use client';

import Image from 'next/image';
import { Chat } from '@/components/chat'; // solo si quieres usarlo directo
// o usa el FloatingChat si prefieres flotante

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-12">
      <h1 className="text-5xl font-bold text-center mb-12">TÍTULO DE TU WEB</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1 */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Texto de presentación</h2>
            <p className="text-gray-400">Aquí puedes escribir algo introductorio sobre tu servicio o IA.</p>
          </div>
          <Image
            src="/images/foto1.jpg"
            width={400}
            height={300}
            alt="Foto 1"
            className="rounded-lg"
          />
        </div>

        {/* Columna 2 */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Más información</h2>
            <p className="text-gray-400">Otra sección de texto o características.</p>
          </div>
          <Image
            src="/images/foto2.jpg"
            width={400}
            height={300}
            alt="Foto 2"
            className="rounded-lg"
          />
        </div>

        {/* Columna 3 - Sidebar */}
        <div className="space-y-6">
          <Image
            src="/images/lateral.jpg"
            width={400}
            height={250}
            alt="Imagen lateral"
            className="rounded-lg"
          />

          <div className="bg-white text-black rounded-lg shadow p-4 h-[500px] overflow-hidden">
            <h3 className="text-lg font-bold mb-2">Asistente IA</h3>
            <iframe
              src="/chat"
              className="w-full h-full border-none rounded-md"
              title="Asistente"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
