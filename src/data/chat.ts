// Conversas simuladas entre adotante e ONGs.

export interface Message {
  from: 'ong' | 'me';
  text: string;
}

export interface QuickReply {
  label: string;
  message: string;
}

export interface Thread {
  id: string;
  ongId: string;
  pet: string;
  last: string;
  time: string;
  dateNote: string;
  messages: Message[];
  quick: QuickReply[];
}

export const threads: Thread[] = [
  {
    id: 'abc',
    ongId: 'abc',
    pet: 'Skye',
    last: 'Claro! Tenho quinta, 05/11, às 10h ou sábado, 07/11, às 9h.',
    time: '12:40',
    dateNote: '24/10/2026 · A ONG ABC recebeu seu perfil',
    messages: [
      {
        from: 'ong',
        text: 'Olá! Recebemos o seu perfil e ele está ótimo. A Skye é bem calma e combina com apartamento.',
      },
      { from: 'me', text: 'Oi! Fico feliz. Posso visitar na semana que vem?' },
      { from: 'ong', text: 'Claro! Tenho quinta, 05/11, às 10h ou sábado, 07/11, às 9h.' },
    ],
    quick: [
      { label: 'Quinta, 05/11, às 10h', message: 'Prefiro quinta, 05/11, às 10h.' },
      { label: 'Sábado, 07/11, às 9h', message: 'Prefiro sábado, 07/11, às 9h.' },
    ],
  },
  {
    id: 'patas',
    ongId: 'patas',
    pet: 'Lua',
    last: 'Visita confirmada. Esperamos você!',
    time: 'ontem',
    dateNote: '28/10/2026 · A Patas Amigas recebeu seu perfil',
    messages: [
      { from: 'ong', text: 'Olá! Seu perfil foi aprovado e a Lua está esperando por você.' },
      { from: 'me', text: 'Que notícia boa! Posso ir na quinta?' },
      { from: 'ong', text: 'Visita confirmada. Esperamos você!' },
    ],
    quick: [
      { label: 'Confirmo presença', message: 'Confirmo presença na visita.' },
      { label: 'Preciso remarcar', message: 'Preciso remarcar a visita, pode ser?' },
    ],
  },
  {
    id: 'lar',
    ongId: 'lar',
    pet: 'Nina',
    last: 'Obrigada pelo interesse. Neste momento ela já tem um lar.',
    time: '20/10',
    dateNote: '18/10/2026 · O Lar dos Bichos recebeu seu perfil',
    messages: [
      { from: 'me', text: 'Olá! Tenho interesse na Nina.' },
      { from: 'ong', text: 'Obrigada pelo interesse. Neste momento ela já tem um lar.' },
    ],
    quick: [{ label: 'Entendi, obrigado', message: 'Entendi, obrigado pelo retorno!' }],
  },
];

export const getThread = (id: string | undefined) => threads.find((t) => t.id === id);
