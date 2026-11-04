// Conversas simuladas: a do adotante com as ONGs e a da ONG com os candidatos.

export interface Message {
  /** `me` é quem está usando o app; `other` é a outra parte da conversa. */
  from: 'other' | 'me';
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
        from: 'other',
        text: 'Olá! Recebemos o seu perfil e ele está ótimo. A Skye é bem calma e combina com apartamento.',
      },
      { from: 'me', text: 'Oi! Fico feliz. Posso visitar na semana que vem?' },
      { from: 'other', text: 'Claro! Tenho quinta, 05/11, às 10h ou sábado, 07/11, às 9h.' },
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
      { from: 'other', text: 'Olá! Seu perfil foi aprovado e a Lua está esperando por você.' },
      { from: 'me', text: 'Que notícia boa! Posso ir na quinta?' },
      { from: 'other', text: 'Visita confirmada. Esperamos você!' },
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
      { from: 'other', text: 'Obrigada pelo interesse. Neste momento ela já tem um lar.' },
    ],
    quick: [{ label: 'Entendi, obrigado', message: 'Entendi, obrigado pelo retorno!' }],
  },
];

export const getThread = (id: string | undefined) => threads.find((t) => t.id === id);

/* ------------------------------------------------------------ Lado da ONG */

/** Conversa da ONG com um candidato (`me` é a ONG). Usa o mesmo id do candidato. */
export interface OngThread {
  id: string;
  /** Nome curto do candidato, como aparece nas listas. */
  who: string;
  pet: string;
  /** Situação do candidato (Novo, Etapa 2, Recusado...). */
  chip: string;
  last: string;
  time: string;
  /** Mensagens não lidas ao abrir o app. */
  unread: number;
  dateNote: string;
  messages: Message[];
  quick: QuickReply[];
}

export const ongThreads: OngThread[] = [
  {
    id: 'augusto',
    who: 'Augusto F.',
    pet: 'Skye',
    chip: 'Novo',
    last: 'Claro! Tenho quinta, 05/11, às 10h ou sábado, 07/11, às 9h.',
    time: '12:40',
    unread: 0,
    dateNote: '23/10/2026 · Augusto enviou interesse na Skye',
    messages: [
      { from: 'me', text: 'Olá! Recebemos o seu perfil e ele está ótimo. A Skye é bem calma e combina com apartamento.' },
      { from: 'other', text: 'Oi! Fico feliz. Posso visitar na semana que vem?' },
      { from: 'me', text: 'Claro! Tenho quinta, 05/11, às 10h ou sábado, 07/11, às 9h.' },
    ],
    quick: [
      { label: 'Confirmar visita', message: 'Visita confirmada! Esperamos você na ONG.' },
      { label: 'Enviar endereço', message: 'Nosso endereço é Rua das Acácias, 747, São Carlos, SP.' },
      { label: 'Pedir comprovante', message: 'Pode nos enviar um comprovante de moradia? Uma foto aqui no chat já serve.' },
    ],
  },
  {
    id: 'marina',
    who: 'Marina L.',
    pet: 'Thor',
    chip: 'Novo',
    last: 'Quais cuidados ele precisa no dia a dia?',
    time: '10:15',
    unread: 2,
    dateNote: '28/10/2026 · Marina enviou interesse no Thor',
    messages: [
      { from: 'other', text: 'Olá! Tenho interesse no Thor. Moro em uma casa com quintal.' },
      { from: 'other', text: 'Quais cuidados ele precisa no dia a dia?' },
    ],
    quick: [
      {
        label: 'Falar do Thor',
        message: 'O Thor é dócil e cheio de energia, então precisa de passeios longos todos os dias. Como seria a rotina dele aí?',
      },
      { label: 'Agendar visita', message: 'Vamos agendar uma visita? Tenho quinta, 05/11, às 10h ou sábado, 07/11, às 9h.' },
    ],
  },
  {
    id: 'camila',
    who: 'Camila R.',
    pet: 'Nina',
    chip: 'Etapa 3',
    last: 'Combinado, até lá! Preciso levar algum documento?',
    time: 'ontem',
    unread: 1,
    dateNote: '15/10/2026 · Camila enviou interesse na Nina',
    messages: [
      { from: 'me', text: 'Oi, Camila! Seu perfil foi aprovado. Vamos marcar a visita à Nina?' },
      { from: 'other', text: 'Que ótimo! Posso ir sábado, 07/11, às 9h?' },
      { from: 'me', text: 'Fechado! Visita confirmada para sábado, 07/11, às 9h.' },
      { from: 'other', text: 'Combinado, até lá! Preciso levar algum documento?' },
    ],
    quick: [
      {
        label: 'Listar documentos',
        message: 'Traga um documento com foto e um comprovante de residência. O termo de adoção é assinado na entrega.',
      },
      { label: 'Enviar endereço', message: 'Nosso endereço é Rua das Acácias, 747, São Carlos, SP.' },
    ],
  },
  {
    id: 'rafael',
    who: 'Rafael T.',
    pet: 'Skye',
    chip: 'Etapa 2',
    last: 'Perfeito, posso passar aí para conhecê-la?',
    time: '27/10',
    unread: 0,
    dateNote: '20/10/2026 · Rafael enviou interesse na Skye',
    messages: [
      { from: 'other', text: 'Bom dia! Já adotei antes e queria saber se a Skye se adapta a uma casa sem quintal.' },
      { from: 'me', text: 'Bom dia, Rafael! Ela é bem calma e se adapta, mas precisa de passeios diários.' },
      { from: 'other', text: 'Perfeito, posso passar aí para conhecê-la?' },
    ],
    quick: [
      { label: 'Agendar visita', message: 'Pode sim! Tenho quinta, 05/11, às 10h ou sábado, 07/11, às 9h.' },
      { label: 'Enviar endereço', message: 'Nosso endereço é Rua das Acácias, 747, São Carlos, SP.' },
    ],
  },
  {
    id: 'joao',
    who: 'João P.',
    pet: 'Bob',
    chip: 'Recusado',
    last: 'Obrigada pelo interesse. Pelo perfil, o Bob precisaria de mais companhia ao longo do dia.',
    time: '14/10',
    unread: 0,
    dateNote: '12/10/2026 · João enviou interesse no Bob',
    messages: [
      { from: 'other', text: 'Olá, tenho interesse no Bob, mas passo o dia todo fora de casa.' },
      {
        from: 'me',
        text: 'Obrigada pelo interesse. Pelo perfil, o Bob precisaria de mais companhia ao longo do dia.',
      },
    ],
    quick: [
      {
        label: 'Sugerir outros animais',
        message: 'Temos animais mais independentes, como a Pipoca. Vale dar uma olhada no catálogo!',
      },
    ],
  },
];

export const getOngThread = (id: string | undefined) => ongThreads.find((t) => t.id === id);
