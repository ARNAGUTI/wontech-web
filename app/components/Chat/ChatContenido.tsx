import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/app/hook/use-toast';
import { v4 as uuidv4 } from 'uuid';
import ChatHeader from '@/app/components/Chat/ChatHeader';
import ChatMessage from '@/app/components/Chat/ChatMessages';
import ChatInput from '@/app/components/Chat/ChatInput';
import type { Message } from '@/app/types/chat';
import { sendMessageToOpenAI } from '@/app/services/openAI';
import { Loader } from 'lucide-react';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Bienvenido al sistema de evaluación de garantías de Wontech. Soy su asistente especializado en casos de garantía. Por favor, describa su situación para que pueda determinar si su caso está cubierto por nuestra política de garantía.',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast(); // ✅ corregido: se usa 'toast' en vez de 'addToast'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage];
      const response = await sendMessageToOpenAI(chatHistory);

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Se produjo un error al procesar su consulta. Por favor inténtelo nuevamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen chat-gradient">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-center items-center my-4">
              <Loader className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-500">Analizando caso de garantía...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-3xl mx-auto w-full">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
