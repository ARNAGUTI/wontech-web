import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const controls = useAnimation();
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    // Evitar el scroll automático al cargar
    document.body.style.overflow = 'hidden';

    window.scrollTo(0, 0); // Aseguramos que esté en el top

    const handleScroll = () => {
      if (window.scrollY > 50) {
        controls.start({ opacity: 0 });
        setShowNav(true);
      } else {
        controls.start({ opacity: 1 });
        setShowNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto'; // Restaurar scroll
    };
  }, [controls]);

  return (
    <div className="relative h-screen w-full bg-[url('/hero-image.jpg')] bg-cover bg-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-black/60"
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
        <div className="fixed top-0 left-0 w-full bg-black/75 p-4 z-50">
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
