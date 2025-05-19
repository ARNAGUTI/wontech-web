import React from 'react';
import { Shield } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <div className="bg-blue-600 p-2 rounded-full">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Agente Casos Wontech</h1>
          <p className="text-sm text-gray-500">Asistente de evaluación de garantías</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
