export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (error) {
    console.error("Error al parsear el cuerpo de la solicitud:", error);
    return new Response('Invalid request body', { status: 400 });
  }

  try {
    const { id, message, selectedChatModel, selectedVisibilityType } = requestBody;
    const session = await auth();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userType: UserType = session.user.type;

    const messageCount = await getMessageCountByUserId({
      id: session.user.id,
      differenceInHours: 24,
    });

    if (messageCount > entitlementsByUserType[userType].maxMessagesPerDay) {
      return new Response('Message limit exceeded for the day', { status: 429 });
    }

    const chat = await getChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({ message });
      await saveChat({
        id,
        userId: session.user.id,
        title,
        visibility: selectedVisibilityType,
      });
    } else if (chat.userId !== session.user.id) {
      return new Response('Forbidden', { status: 403 });
    }

    const previousMessages = await getMessagesByChatId({ id });
    const messages = appendClientMessage({
      messages: previousMessages,
      message,
    });

    const streamId = generateUUID();
    await createStreamId({ streamId, chatId: id });

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: selectedChatModel,
          messages: [{ role: "user", content: message.parts.join(" ") }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta de OpenAI:", errorText);
        return new Response('OpenAI API error', { status: 500 });
      }

      const data = await response.json();
      console.log("Respuesta de OpenAI:", data);

      await saveMessages({
        messages: [
          {
            chatId: id,
            id: generateUUID(),
            role: "assistant",
            parts: data.choices[0].message.content.split("\n"),
            createdAt: new Date(),
          },
        ],
      });

      return new Response(JSON.stringify(data), { status: 200 });
    } catch (apiError) {
      console.error("Error al llamar a OpenAI:", apiError);
      return new Response('Failed to fetch response from OpenAI', { status: 500 });
    }
  } catch (error) {
    console.error("Error general en el handler POST:", error);
    return new Response('An error occurred while processing your request!', {
      status: 500,
    });
  }
}
