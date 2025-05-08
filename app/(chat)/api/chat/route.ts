import {
  appendClientMessage,
  appendResponseMessages,
  createDataStream,
  smoothStream,
  streamText,
} from 'ai';
import { auth, type UserType } from '@/app/(auth)/auth';
import { type RequestHints, systemPrompt } from '@/lib/ai/prompts';
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getMessageCountByUserId,
  getMessagesByChatId,
  getStreamIdsByChatId,
  saveChat,
  saveMessages,
} from '@/lib/db/queries';
import { generateUUID, getTrailingMessageId } from '@/lib/utils';
import { generateTitleFromUserMessage } from '../../actions';
import { createDocument } from '@/lib/ai/tools/create-document';
import { updateDocument } from '@/lib/ai/tools/update-document';
import { requestSuggestions } from '@/lib/ai/tools/request-suggestions';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { isProductionEnvironment } from '@/lib/constants';
import { myProvider } from '@/lib/ai/providers';
import { entitlementsByUserType } from '@/lib/ai/entitlements';
import { geolocation } from '@vercel/functions';
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from 'resumable-stream';
import { after } from 'next/server';
import type { Chat } from '@/lib/db/schema';

// ✅ Corrección añadida:
import { postRequestBodySchema, type PostRequestBody } from './schema';

export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: any) {
      if (error.message.includes('REDIS_URL')) {
        console.log(
          ' > Resumable streams are disabled due to missing REDIS_URL',
        );
      } else {
        console.error(error);
      }
    }
  }

  return globalStreamContext;
}

// 🚀 Modelos válidos en OpenAI
const VALID_MODELS = ['gpt-3.5-turbo', 'gpt-4', 'text-davinci-003'];

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (error) {
    console.error('Error al parsear el cuerpo de la solicitud:', error);
    return new Response('Invalid request body', { status: 400 });
  }

  // 🚀 Verificación del modelo
  const selectedModel = VALID_MODELS.includes(requestBody.selectedChatModel)
    ? requestBody.selectedChatModel
    : 'gpt-3.5-turbo';

  console.log('📌 Request recibido:', requestBody);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [{ role: "user", content: requestBody.message.parts.join(" ") }],
        stream: true
      }),
    });

    if (!response.body) {
      console.error('❌ Error: response.body es null o undefined');
      return new Response('OpenAI no devolvió datos en el cuerpo de la respuesta.', { status: 500 });
    }

    // ✅ TypeScript Guard para asegurar que no es null
    const reader = response.body?.getReader();

    const stream = new ReadableStream({
      start(controller) {
        const decoder = new TextDecoder();

        function read() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }

            const chunk = decoder.decode(value);
            console.log('📌 Chunk recibido (crudo):', chunk);

            // ✅ Filtramos líneas válidas
            const lines = chunk.split('\n');
            lines.forEach((line) => {
              if (line.startsWith('data:')) {
                const jsonData = line.replace('data: ', '');
                try {
                  JSON.parse(jsonData); // Si no es válido, fallará aquí
                  console.log('✅ Línea válida enviada:', jsonData);
                  controller.enqueue(`${line}\n\n`);
                } catch (err) {
                  console.warn('⚠️ Línea no válida, ignorada:', line);
                }
              }
            });

            read();
          }).catch(error => {
            console.error('❌ Error leyendo el stream:', error);
            controller.error(error);
          });
        }

        read();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (error) {
    console.error('❌ Error al llamar a OpenAI:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(request: Request) {
  // Código original del GET
}

export async function DELETE(request: Request) {
  // Código original del DELETE
}
