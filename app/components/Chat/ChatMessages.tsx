import React from 'react';
import { Message } from '../../types/chat';
import { User, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex w-full mb-4 items-start",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex items-start max-w-[80%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className={cn(
          "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-2",
          isUser ? "bg-blue-500 ml-2" : "bg-gray-500 mr-2"
        )}>
          {isUser ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <MessageSquare className="h-5 w-5 text-white" />
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-lg",
          isUser ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-100 dark:bg-gray-700 rounded-tl-none"
        )}>
          <p className="whitespace-pre-wrap">{message.content}</p>
          <div className={cn(
            "text-xs mt-1",
            isUser ? "text-blue-100" : "text-gray-400"
          )}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
