// En lugar de pasar directamente session:
<ChatHeader
  chatId={id}
  selectedModelId={initialChatModel}
  selectedVisibilityType={initialVisibilityType}
  isReadonly={isReadonly}
  session={session ?? {
    user: {
      id: '',
      name: 'Invitado',
      email: null,
      image: null,
      type: 'guest',
    },
    expires: '',
  }}
/>
