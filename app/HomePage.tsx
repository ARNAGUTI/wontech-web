'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const LandingPage = () => {
    return (
        <div className="w-full h-screen overflow-hidden relative">
            <motion.div 
                className="w-full h-screen flex items-center justify-center bg-cover bg-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <h1 className="text-5xl font-bold text-white">Bienvenido a Nuestra Web</h1>
            </motion.div>

            <motion.div 
                className="w-full h-screen grid grid-cols-3 gap-4 p-8 opacity-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
            >
                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <Card className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Texto Sección 1</h2>
                        <Image src="/foto1.jpg" alt="Foto 1" width={400} height={300} className="rounded-lg" />
                    </Card>
                    <Card className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Texto Sección 2</h2>
                        <Image src="/foto2.jpg" alt="Foto 2" width={400} height={300} className="rounded-lg" />
                    </Card>
                </div>
                <div className="flex flex-col gap-4">
                    <Card className="p-4">
                        <Image src="/lateral.jpg" alt="Lateral" width={400} height={500} className="rounded-lg" />
                    </Card>
                    <Card className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Asistente IA con Chat</h2>
                        <div id="chat-widget"></div>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
""
