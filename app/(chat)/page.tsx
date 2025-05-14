'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function HomePage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-12">
      <h1 className="text-5xl font-bold text-center mb-12">TÍTULO DE TU WEB</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1 */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Texto de presentación</h2>
            <p className="text-gray-400">
              Aquí puedes escribir algo introductorio sobre tu servicio o IA.
            </p>
          </div>
          <Image
            src="/images/foto1.jpg"
            width={200}
            height={200}
            alt="Foto 1"
            className="rounded-lg"
          />
        </div>

        {/* Columna 2 */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Más información</h2>
            <p className="text-gray-400">
              Otra sección de texto o características.
            </p>
          </div>
          <Image
            src="/images/foto2.jpg"
            width={200}
            height={200}
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
            {!iframeLoaded && (
              <p className="text-center text-gray-500">Cargando chat...</p>
            )}
            <iframe
              src="/embed"
              className="w-full h-full border-none rounded-md"
              title="Asistente"
              sandbox="allow-scripts allow-same-origin allow-popups"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
""import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const controls = useAnimation();
  const [showNav, setShowNav] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      controls.start({ opacity: 0 });
      setShowNav(true);
    } else {
      controls.start({ opacity: 1 });
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full bg-[url('/hero-image.jpg')] bg-cover bg-center">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60"
        animate={controls}
      >
        <div className="text-center text-white space-y-4">
          <h1 className="text-5xl font-bold">Bienvenido a tu Plataforma</h1>
          <p className="text-lg">Explora nuestras soluciones tecnológicas</p>
          <Button variant="default" className="mt-4">Saber más</Button>
        </div>
      </motion.div>
      <div className="absolute bottom-8 w-full flex justify-center">
        <ChevronDown className="animate-bounce text-white" size={32} />
      </div>
      {showNav && (
        <div className="fixed top-0 left-0 w-full bg-black bg-opacity-75 p-4 z-50">
          <nav className="flex justify-around text-white">
            <a href="#section1">Sección 1</a>
            <a href="#section2">Sección 2</a>
            <a href="#section3">Sección 3</a>
          </nav>
        </div>
      )}
    </div>
  );
};

""import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const controls = useAnimation();
  const [showNav, setShowNav] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      controls.start({ opacity: 0 });
      setShowNav(true);
    } else {
      controls.start({ opacity: 1 });
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full bg-[url('/hero-image.jpg')] bg-cover bg-center">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60"
        animate={controls}
      >
        <div className="text-center text-white space-y-4">
          <h1 className="text-5xl font-bold">Bienvenido a tu Plataforma</h1>
          <p className="text-lg">Explora nuestras soluciones tecnológicas</p>
          <Button variant="default" className="mt-4">Saber más</Button>
        </div>
      </motion.div>
      <div className="absolute bottom-8 w-full flex justify-center">
        <ChevronDown className="animate-bounce text-white" size={32} />
      </div>
      {showNav && (
        <div className="fixed top-0 left-0 w-full bg-black bg-opacity-75 p-4 z-50">
          <nav className="flex justify-around text-white">
            <a href="#section1">Sección 1</a>
            <a href="#section2">Sección 2</a>
            <a href="#section3">Sección 3</a>
          </nav>
        </div>
      )}
    </div>
  );
};

""import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const controls = useAnimation();
  const [showNav, setShowNav] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      controls.start({ opacity: 0 });
      setShowNav(true);
    } else {
      controls.start({ opacity: 1 });
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full bg-[url('/hero-image.jpg')] bg-cover bg-center">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60"
        animate={controls}
      >
        <div className="text-center text-white space-y-4">
          <h1 className="text-5xl font-bold">Bienvenido a tu Plataforma</h1>
          <p className="text-lg">Explora nuestras soluciones tecnológicas</p>
          <Button variant="default" className="mt-4">Saber más</Button>
        </div>
      </motion.div>
      <div className="absolute bottom-8 w-full flex justify-center">
        <ChevronDown className="animate-bounce text-white" size={32} />
      </div>
      {showNav && (
        <div className="fixed top-0 left-0 w-full bg-black bg-opacity-75 p-4 z-50">
          <nav className="flex justify-around text-white">
            <a href="#section1">Sección 1</a>
            <a href="#section2">Sección 2</a>
            <a href="#section3">Sección 3</a>
          </nav>
        </div>
      )}
    </div>
  );
};

""import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const controls = useAnimation();
  const [showNav, setShowNav] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      controls.start({ opacity: 0 });
      setShowNav(true);
    } else {
      controls.start({ opacity: 1 });
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full bg-[url('/hero-image.jpg')] bg-cover bg-center">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60"
        animate={controls}
      >
        <div className="text-center text-white space-y-4">
          <h1 className="text-5xl font-bold">Bienvenido a tu Plataforma</h1>
          <p className="text-lg">Explora nuestras soluciones tecnológicas</p>
          <Button variant="default" className="mt-4">Saber más</Button>
        </div>
      </motion.div>
      <div className="absolute bottom-8 w-full flex justify-center">
        <ChevronDown className="animate-bounce text-white" size={32} />
      </div>
      {showNav && (
        <div className="fixed top-0 left-0 w-full bg-black bg-opacity-75 p-4 z-50">
          <nav className="flex justify-around text-white">
            <a href="#section1">Sección 1</a>
            <a href="#section2">Sección 2</a>
            <a href="#section3">Sección 3</a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
""




