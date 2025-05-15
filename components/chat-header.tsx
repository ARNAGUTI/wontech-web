import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon, VercelIcon } from './icons';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { VisibilitySelector, VisibilityType } from './visibility-selector'; // ✅ Importamos el tipo VisibilityType

// ✅ Definición de tipos para los props
interface ChatHeaderProps {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: string; // Dejamos string porque puede venir de una API
  isReadonly: boolean;
  session: any; // Puedes ajustar el tipo si conoces su estructura
}

// ✅ Validación del tipo para evitar errores
const isValidVisibility = (value: string): value is VisibilityType =>
  value === 'private' || value === 'public';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  session,
}: ChatHeaderProps) {
  const router = useRouter();
  const { width: windowWidth } = useWindowSize();

  // ✅ Intentamos cargar el contexto solo si está disponible
  let open = false;
  try {
    const sidebar = require('@/components/ui/sidebar');
    open = sidebar.useSidebar().open;
  } catch (error) {
    console.warn("Sidebar context is not available in this route");
  }

  // ✅ Verificamos que el valor sea válido; si no, usamos 'private' por defecto
  const visibilityToRender: VisibilityType = isValidVisibility(selectedVisibilityType)
    ? selectedVisibilityType
    : 'private';

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      {open && <SidebarToggle />}

      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={() => {
                console.log("Redirección evitada.");
              }}
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )}

      {!isReadonly && (
        <ModelSelector
          session={session}
          selectedModelId={selectedModelId}
          className="order-1 md:order-2"
        />
      )}

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={visibilityToRender} // ✅ Validado antes de renderizar
          className="order-1 md:order-3"
        />
      )}

      <Button
        className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto"
        asChild
      >
        <Link
          href={`https://vercel.com/new/clone?repository-url=https://github.com/vercel/ai-chatbot&env=AUTH_SECRET&envDescription=Learn more about how to get the API Keys for the application&envLink=https://github.com/vercel/ai-chatbot/blob/main/.env.example&demo-title=AI Chatbot&demo-description=An Open-Source AI Chatbot Template Built With Next.js and the AI SDK by Vercel.&demo-url=https://chat.vercel.ai&products=[{"type":"integration","protocol":"ai","productSlug":"grok","integrationSlug":"xai"},{"type":"integration","protocol":"storage","productSlug":"neon","integrationSlug":"neon"},{"type":"blob"}]`}
          target="_noblank"
        >
          <VercelIcon size={16} />
          Deploy with Vercel
        </Link>
      </Button>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
