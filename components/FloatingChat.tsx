'use client';
import { useState } from "react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        💬
      </button>

      {/* Ventana del chat usando iframe */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-[350px] h-[500px] bg-white border shadow-xl rounded-xl overflow-hidden">
          <iframe
            src="/chat"
            className="size-full border-none"
          />
        </div>
      )}
    </div>
  );
}
