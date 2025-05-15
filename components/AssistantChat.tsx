'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';

const AssistantChat = () => {
  const { messages, input, handleSubmit, setInput } = useChat({
    id: 'asistente-ia',
    initialMessages: [
      {
        id: '1',
        content: 'Hola, soy tu asistente IA. ¿En qué puedo ayudarte?',
        role: 'assistant',
        createdAt: new Date(),
      },
    ],
    experimental_throttle: 100,
    sendExtraMessageFields: true,
  });

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg h-full flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 mb-2 rounded-lg ${
              message.role === 'assistant' ? 'bg-gray-700' : 'bg-gray-600'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="w-full p-2 rounded-lg text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default AssistantChat;
