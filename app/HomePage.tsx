'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import AssistantChat from '@/components/AssistantChat'; // ✅ Importamos el componente

const HomePage = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      {/* Título inicial */}
      <motion.div 
        className="w-full h-screen flex items-center justify-center bg-cover bg-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <h1 className="text-5xl font-bold text-white">Bienvenido a Nuestra Web</h1>
      </motion.div>

      {/* Contenido principal */}
      <motion.div 
        className="w-full min-h-screen grid grid-cols-3 gap-4 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        {/* Bloque de texto y foto */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gray-800 text-white">
            <h2 className="text-2xl font-bold mb-4">Texto Sección 1</h2>
            <Image src="/images/foto1.jpg" alt="Foto 1" width={500} height={300} className="rounded-lg" />
          </Card>
          <Card className="p-4 bg-gray-800 text-white">
            <h2 className="text-2xl font-bold mb-4">Texto Sección 2</h2>
            <Image src="/images/foto2.jpg" alt="Foto 2" width={500} height={300} className="rounded-lg" />
          </Card>
        </div>

        {/* Imagen grande y Asistente */}
        <div className="flex flex-col gap-4">
          <Card className="p-4 bg-gray-800">
            <Image src="/images/lateral.jpg" alt="Imagen Lateral" width={400} height={500} className="rounded-lg" />
          </Card>
          <Card className="p-4 h-full">
            <h2 className="text-xl font-semibold mb-2">Asistente IA con Chat</h2>
            <AssistantChat /> {/* Aquí lo integramos directamente */}
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
