'use client';

import Chat from '@/components/chat';
import { useState } from 'react';
import { Session } from 'next-auth';

interface Message {
  text: string;
  user: string;
}

const emptySession: Session = {
  user: {
    id: '',
    name: null,
    email: null,
    image: null,
  },
  expires: '',
};

const FloatingChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="fixed right-4 bottom-4 w-[400px] h-[600px] bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <Chat
        id="general"
        initialMessages={messages}
        initialChatModel="gpt-4"
        initialVisibilityType="public"
        isReadonly={false}
        session={emptySession} // 🔍 Aquí lo paso vacío
        autoResume={false}
      />
    </div>
  );
};

export default FloatingChat;
