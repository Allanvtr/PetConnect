// Dados simulados (hard coded) usados pelas telas do adotante.

export interface Review {
  who: string;
  stars: string;
  text: string;
}

export interface Ong {
  id: string;
  name: string;
  /** Artigo que acompanha o nome em frases ("A ONG ABC", "O Lar dos Bichos"). */
  article: string;
  rating: string;
  reviewsCount: number;
  responseTime: string;
  adoptions: number;
  cnpj: string;
  address: string;
  phone: string;
  validatedAt: string;
  distanceKm: number;
  animalsCount: number;
  reviews: Review[];
}

export const ongs: Record<string, Ong> = {
  abc: {
    id: 'abc',
    name: 'ONG ABC',
    article: 'A',
    rating: '4,9',
    reviewsCount: 128,
    responseTime: '~2 h',
    adoptions: 37,
    cnpj: '00.000.000/0001-00',
    address: 'Rua das Acácias, 747 · São Carlos, SP',
    phone: '(99) 99999-9999',
    validatedAt: '12/08/2026',
    distanceKm: 3,
    animalsCount: 6,
    reviews: [
      {
        who: 'Mariana S.',
        stars: '★★★★★',
        text: 'Responderam no mesmo dia e a visita foi tranquila. Recebi a ficha de saúde completa do Bob.',
      },
      {
        who: 'Rafael T.',
        stars: '★★★★★',
        text: 'Processo claro, sem pedir documento desnecessário. Recomendo.',
      },
    ],
  },
  patas: {
    id: 'patas',
    name: 'Patas Amigas',
    article: 'As',
    rating: '4,8',
    reviewsCount: 96,
    responseTime: '~3 h',
    adoptions: 21,
    cnpj: '11.111.111/0001-11',
    address: 'Av. dos Ipês, 120 · São Carlos, SP',
    phone: '(16) 99999-1111',
    validatedAt: '03/09/2026',
    distanceKm: 4,
    animalsCount: 4,
    reviews: [
      {
        who: 'Júlia M.',
        stars: '★★★★★',
        text: 'Atendimento acolhedor e a Lua chegou com a vacinação em dia.',
      },
      {
        who: 'Pedro A.',
        stars: '★★★★☆',
        text: 'Demoraram um pouco para responder, mas o processo foi bem organizado.',
      },
    ],
  },
  lar: {
    id: 'lar',
    name: 'Lar dos Bichos',
    article: 'O',
    rating: '4,7',
    reviewsCount: 64,
    responseTime: '~5 h',
    adoptions: 15,
    cnpj: '22.222.222/0001-22',
    address: 'Rua do Cedro, 58 · São Carlos, SP',
    phone: '(16) 99999-2222',
    validatedAt: '21/09/2026',
    distanceKm: 8,
    animalsCount: 3,
    reviews: [
      {
        who: 'Beatriz C.',
        stars: '★★★★★',
        text: 'Fizeram todas as perguntas certas e me explicaram os cuidados de cada fase.',
      },
      {
        who: 'Lucas H.',
        stars: '★★★★☆',
        text: 'Ótima comunicação pelo chat. A fila de espera foi o único ponto fraco.',
      },
    ],
  },
};

export interface Animal {
  id: string;
  name: string;
  species: 'Cão' | 'Gato';
  sex: 'Macho' | 'Fêmea';
  age: string;
  size: string;
  weight: string;
  personality: string[];
  tags: [string, string];
  ongId: string;
  health: [string, string][];
  story: string;
}

export const animals: Animal[] = [
  {
    id: 'skye',
    name: 'Skye',
    species: 'Cão',
    sex: 'Fêmea',
    age: '10 anos',
    size: 'Porte médio',
    weight: '14 kg',
    personality: ['Caseira', 'Carinhosa', 'Calma'],
    tags: ['Vacinada', 'Microchip'],
    ongId: 'abc',
    health: [
      ['Castrada', 'Sim'],
      ['Vacinas', 'Em dia (V10 e antirrábica)'],
      ['Microchip', 'Sim'],
      ['Último check-up', '12/10/2026'],
      ['Condições conhecidas', 'Nenhuma'],
    ],
    story:
      'Resgatada de uma casa abandonada e acolhida há 8 meses. Convive bem com outros cães e com crianças. Prefere passeios curtos e muito colo.',
  },
  {
    id: 'lua',
    name: 'Lua',
    species: 'Gato',
    sex: 'Fêmea',
    age: '2 anos',
    size: 'Porte pequeno',
    weight: '4 kg',
    personality: ['Independente', 'Curiosa', 'Dócil'],
    tags: ['Vacinada', 'Castrada'],
    ongId: 'patas',
    health: [
      ['Castrada', 'Sim'],
      ['Vacinas', 'Em dia (V4 e antirrábica)'],
      ['Microchip', 'Não'],
      ['Último check-up', '03/10/2026'],
      ['Condições conhecidas', 'Nenhuma'],
    ],
    story:
      'Nasceu na rua e foi resgatada ainda filhote. Gosta de janelas, de bolinhas de papel e de dormir no colo no fim do dia.',
  },
  {
    id: 'thor',
    name: 'Thor',
    species: 'Cão',
    sex: 'Macho',
    age: '1 ano',
    size: 'Porte grande',
    weight: '22 kg',
    personality: ['Brincalhão', 'Energético', 'Leal'],
    tags: ['Vacinado', 'Microchip'],
    ongId: 'abc',
    health: [
      ['Castrado', 'Não'],
      ['Vacinas', 'Em dia (V10)'],
      ['Microchip', 'Sim'],
      ['Último check-up', '28/09/2026'],
      ['Condições conhecidas', 'Nenhuma'],
    ],
    story:
      'Filhote resgatado de uma ninhada abandonada. Tem muita energia e adora correr atrás de bola, por isso precisa de passeios diários.',
  },
  {
    id: 'nina',
    name: 'Nina',
    species: 'Gato',
    sex: 'Fêmea',
    age: '6 meses',
    size: 'Porte pequeno',
    weight: '2 kg',
    personality: ['Brincalhona', 'Curiosa'],
    tags: ['Vacinada', 'Vermifugada'],
    ongId: 'lar',
    health: [
      ['Castrada', 'Ainda não (aguardando idade)'],
      ['Vacinas', 'Primeira dose aplicada'],
      ['Microchip', 'Não'],
      ['Último check-up', '25/10/2026'],
      ['Condições conhecidas', 'Nenhuma'],
    ],
    story:
      'Filhote encontrado numa caixa de papelão perto de uma praça. Já usa a caixa de areia e se dá bem com outros gatos.',
  },
];

export const getAnimal = (id: string | undefined) => animals.find((a) => a.id === id);

export const animalMeta = (a: Animal) => `${a.species} · ${a.sex} · ${a.age}`;
