'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const HomePage = () => {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      controls.start({ scale: 0.7, opacity: 0, transition: { duration: 0.5 } });
      setIsVisible(false);
    } else {
      controls.start({ scale: 1, opacity: 1, transition: { duration: 0.5 } });
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      {/* Título inicial */}
      <motion.div
        className="w-full h-screen flex items-center justify-center bg-cover bg-center"
        initial={{ scale: 1, opacity: 1 }}
        animate={controls}
      >
        <h1 className="text-5xl font-bold text-white">Bienvenido a Nuestra Web</h1>
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        className="w-full min-h-screen grid grid-cols-3 gap-4 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Bloque de texto y foto */}
        <div className="grid grid-cols-2 gap-8 p-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold text-white mb-4">Texto Sección 1</h2>
            <img src="/foto1.jpeg" alt="Foto 1" className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300" />
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold text-white mb-4">Texto Sección 2</h2>
            <img src="/foto2.jpeg" alt="Foto 2" className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300" />
          </div>
        </div>

        {/* Imagen grande y Asistente */}
        <div className="flex flex-col gap-4">
          <Card className="p-4 bg-gray-800">
            <Image src="/images/lateral.jpg" alt="Imagen Lateral" width={400} height={500} className="rounded-lg" />
          </Card>
          <Card className="p-4 bg-gray-800 text-white">
            <h2 className="text-xl font-bold mb-2">Asistente IA con Chat</h2>
            <motion.div id="chat-widget" className="size-full">
              <p>Asistente IA cargando...</p>
            </motion.div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
