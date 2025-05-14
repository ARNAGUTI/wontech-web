import Chat from '@/components/chat';

const FloatingChat = () => {
  return (
    <div className="fixed right-4 bottom-4 w-[400px] h-[600px] bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <Chat
        id="general"
        initialMessages={[]}
        initialChatModel="gpt-4"
        initialVisibilityType="public"
        isReadonly={false}
        session={null}
        autoResume={false}
      />
    </div>
  );
};

export default FloatingChat;
