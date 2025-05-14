'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  text: string;
  user: string;
}

const ChatPage = () => {
  // 🔍 Definimos el tipo de datos en el estado
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log("Chat loaded");
    // Aquí puedes cargar mensajes anteriores, si tienes backend.
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    // 🔍 Aquí no dará error, porque el estado está tipado correctamente
    setMessages([...messages, { text: input, user: 'Yo' }]);
    setInput('');
  };

  return (
    <main className="min-h-screen bg-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Chat</h1>

      <div className="bg-gray-700 p-4 rounded-lg mb-4 max-h-[500px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="text-sm text-gray-400">{msg.user}:</span>
            <p className="text-base">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 rounded-lg text-black"
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage} className="bg-blue-500 p-2 rounded-lg">
          Enviar
        </button>
      </div>
    </main>
  );
};

export default ChatPage;
