import { postRequestBodySchema, type PostRequestBody } from './schema';
export const runtime = 'nodejs';

export const maxDuration = 60;

const VALID_MODELS = ['gpt-3.5-turbo', 'gpt-4', 'text-davinci-003'];

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  console.log('🔍 OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Cargada' : '❌ No encontrada');
  console.log('🔍 ASSISTANT_ID:', process.env.ASSISTANT_ID ? '✅ Cargada' : '❌ No encontrada');

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (error) {
    console.error('❌ Error al parsear el cuerpo de la solicitud:', error);
    return new Response('Invalid request body', { status: 400 });
  }

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

    let buffer = '';
    const reader = response.body.getReader();

    const stream = new ReadableStream({
      start(controller) {
        const decoder = new TextDecoder();

        function read() {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log("🛑 Stream finalizado correctamente.");
              controller.enqueue("data: [DONE]\n\n");
              controller.close();
              return;
            }

            const chunk = decoder.decode(value);
            buffer += chunk;

            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            lines.forEach((line) => {
              if (line.startsWith('data:')) {
                const jsonData = line.replace('data: ', '').trim();
                try {
                  if (jsonData !== "[DONE]") {
                    JSON.parse(jsonData);
                  }
                  controller.enqueue(`data: ${jsonData}\n\n`);
                } catch (err) {
                  console.warn('⚠️ JSON no válido (posiblemente fragmentado), almacenado temporalmente:', jsonData);
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
  return new Response('GET not implemented', { status: 501 });
}

export async function DELETE(request: Request) {
  return new Response('DELETE not implemented', { status: 501 });
}
