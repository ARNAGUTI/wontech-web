'use client';

import Chat from '@/components/chat';
import { useState } from 'react';
import { Session } from 'next-auth';
import type { UIMessage } from 'ai';

const emptySession: Session = {
  user: {
    id: '',
    name: null,
    email: null,
    image: null,
    type: 'guest',
  },
  expires: '',
};

const FloatingChat = () => {
  // ✅ Ahora el tipo es UIMessage, no Message
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      content: '¡Bienvenido al chat!',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: '¡Bienvenido al chat!', // 🔍 Cambio de 'content' a 'text'
        },
      ],
      createdAt: new Date(),
    },
  ]);

  return (
    <div className="fixed right-4 bottom-4 w-[400px] h-[600px] bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <Chat
        id="general"
        initialMessages={messages}
        initialChatModel="gpt-4"
        initialVisibilityType="public"
        isReadonly={false}
        session={emptySession}
        autoResume={false}
      />
    </div>
  );
};

export default FloatingChat;
