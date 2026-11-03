// Dados simulados da área da ONG (ONG ABC) e dos processos do adotante.

export type CandidateGroup = 'novo' | 'andamento' | 'recusado';

export interface Candidate {
  id: string;
  short: string;
  fullName: string;
  age: number;
  city: string;
  sentAt: string;
  pet: string;
  group: CandidateGroup;
  chip: string;
  resumo: string;
  /** Etapa inicial da triagem: 0 Interesse, 1 Análise, 2 Visita, 3 Adoção. */
  stage: number;
  /** [pergunta, resposta, compatível?] */
  answers: [string, string, boolean][];
}

export const candidates: Candidate[] = [
  {
    id: 'augusto',
    short: 'Augusto F.',
    fullName: 'Augusto Fernandes',
    age: 22,
    city: 'São Carlos, SP',
    sentAt: '23/10/2026',
    pet: 'Skye',
    group: 'novo',
    chip: 'Novo',
    resumo: 'Apartamento · tem outro pet · home office',
    stage: 1,
    answers: [
      ['Moradia', 'Apartamento', true],
      ['Tem outro pet', 'Sim, 1 cachorro', true],
      ['Trabalha em casa', 'Home office', true],
      ['Tempo sozinho por dia', 'Até 4 horas', true],
      ['Quintal ou área externa', 'Não tem', false],
      ['Todos concordam com a adoção', 'Sim', true],
    ],
  },
  {
    id: 'marina',
    short: 'Marina L.',
    fullName: 'Marina Lopes',
    age: 27,
    city: 'Araraquara, SP',
    sentAt: '28/10/2026',
    pet: 'Thor',
    group: 'novo',
    chip: 'Novo',
    resumo: 'Casa com quintal · sem outros pets · mora com 2 pessoas',
    stage: 0,
    answers: [
      ['Moradia', 'Casa', true],
      ['Tem outro pet', 'Não', true],
      ['Trabalha em casa', 'Híbrido', true],
      ['Tempo sozinho por dia', 'De 4 a 8 horas', false],
      ['Quintal ou área externa', 'Sim', true],
      ['Todos concordam com a adoção', 'Sim', true],
    ],
  },
  {
    id: 'rafael',
    short: 'Rafael T.',
    fullName: 'Rafael Teixeira',
    age: 31,
    city: 'São Carlos, SP',
    sentAt: '20/10/2026',
    pet: 'Skye',
    group: 'andamento',
    chip: 'Etapa 2',
    resumo: 'Casa sem quintal · já adotou antes · trabalho híbrido',
    stage: 1,
    answers: [
      ['Moradia', 'Casa', true],
      ['Tem outro pet', 'Não, já adotou antes', true],
      ['Trabalha em casa', 'Híbrido', true],
      ['Tempo sozinho por dia', 'Até 4 horas', true],
      ['Quintal ou área externa', 'Não tem', false],
      ['Todos concordam com a adoção', 'Sim', true],
    ],
  },
  {
    id: 'camila',
    short: 'Camila R.',
    fullName: 'Camila Ribeiro',
    age: 24,
    city: 'Ibaté, SP',
    sentAt: '15/10/2026',
    pet: 'Nina',
    group: 'andamento',
    chip: 'Etapa 3',
    resumo: 'Apartamento telado · 1 gato · estudante',
    stage: 2,
    answers: [
      ['Moradia', 'Apartamento (telado)', true],
      ['Tem outro pet', 'Sim, 1 gato', true],
      ['Trabalha em casa', 'Estudante', true],
      ['Tempo sozinho por dia', 'Até 4 horas', true],
      ['Quintal ou área externa', 'Não tem', false],
      ['Todos concordam com a adoção', 'Sim', true],
    ],
  },
  {
    id: 'joao',
    short: 'João P.',
    fullName: 'João Pereira',
    age: 35,
    city: 'Descalvado, SP',
    sentAt: '12/10/2026',
    pet: 'Bob',
    group: 'recusado',
    chip: 'Recusado',
    resumo: 'Fica mais de 8 horas fora de casa',
    stage: 0,
    answers: [
      ['Moradia', 'Apartamento', true],
      ['Tem outro pet', 'Não', true],
      ['Trabalha em casa', 'Não', false],
      ['Tempo sozinho por dia', 'Mais de 8 horas', false],
      ['Quintal ou área externa', 'Não tem', false],
      ['Todos concordam com a adoção', 'Sim', true],
    ],
  },
];

export const getCandidate = (id: string | undefined) => candidates.find((c) => c.id === id);

export type PetStatus = 'disponivel' | 'processo' | 'adotado';

export interface OngPet {
  id: string;
  name: string;
  species: 'Cão' | 'Gato';
  sex: 'Macho' | 'Fêmea';
  age: string;
  size: 'Pequeno' | 'Médio' | 'Grande';
  weight: string;
  personality: string[];
  castrada: boolean;
  vacinas: boolean;
  microchip: boolean;
  verm: boolean;
  checkup: string;
  story: string;
  interested: number;
  status: PetStatus;
}

const pet = (p: Partial<OngPet> & Pick<OngPet, 'id' | 'name' | 'species' | 'sex' | 'age'>): OngPet => ({
  size: 'Médio',
  weight: '10',
  personality: ['Calma'],
  castrada: true,
  vacinas: true,
  microchip: false,
  verm: true,
  checkup: '10/10/2026',
  story: 'Animal acolhido pela ONG ABC, saudável e pronto para um lar responsável.',
  interested: 0,
  status: 'disponivel',
  ...p,
});

export const ongPets: OngPet[] = [
  pet({
    id: 'skye',
    name: 'Skye',
    species: 'Cão',
    sex: 'Fêmea',
    age: '10 anos',
    weight: '14',
    personality: ['Caseira', 'Carinhosa', 'Calma'],
    microchip: true,
    verm: false,
    checkup: '12/10/2026',
    story:
      'Resgatada de uma casa abandonada e acolhida há 8 meses. Convive bem com outros cães e com crianças.',
    interested: 8,
  }),
  pet({
    id: 'thor',
    name: 'Thor',
    species: 'Cão',
    sex: 'Macho',
    age: '1 ano',
    size: 'Grande',
    weight: '22',
    personality: ['Dócil', 'Agitada'],
    castrada: false,
    microchip: true,
    checkup: '28/09/2026',
    story: 'Filhote resgatado de uma ninhada abandonada, cheio de energia para passeios longos.',
    interested: 5,
  }),
  pet({
    id: 'bob',
    name: 'Bob',
    species: 'Cão',
    sex: 'Macho',
    age: '3 anos',
    weight: '15',
    personality: ['Calma', 'Dócil'],
    interested: 2,
  }),
  pet({
    id: 'mel',
    name: 'Mel',
    species: 'Gato',
    sex: 'Fêmea',
    age: '5 meses',
    size: 'Pequeno',
    weight: '2',
    personality: ['Brincalhona', 'Carinhosa'],
    castrada: false,
    interested: 11,
  }),
  pet({
    id: 'pipoca',
    name: 'Pipoca',
    species: 'Cão',
    sex: 'Fêmea',
    age: '6 anos',
    size: 'Pequeno',
    weight: '7',
    personality: ['Caseira', 'Calma'],
    interested: 0,
  }),
  pet({ id: 'rex', name: 'Rex', species: 'Cão', sex: 'Macho', age: '4 anos', interested: 3, status: 'processo' }),
  pet({
    id: 'tigre',
    name: 'Tigre',
    species: 'Gato',
    sex: 'Macho',
    age: '2 anos',
    size: 'Pequeno',
    weight: '4',
    interested: 1,
    status: 'processo',
  }),
  pet({ id: 'amora', name: 'Amora', species: 'Cão', sex: 'Fêmea', age: '2 anos', interested: 4, status: 'processo' }),
  pet({
    id: 'mingau',
    name: 'Mingau',
    species: 'Gato',
    sex: 'Macho',
    age: '1 ano',
    size: 'Pequeno',
    weight: '3',
    interested: 2,
    status: 'processo',
  }),
  pet({ id: 'faisca', name: 'Faísca', species: 'Cão', sex: 'Macho', age: '5 anos', status: 'adotado' }),
  pet({
    id: 'pretinha',
    name: 'Pretinha',
    species: 'Gato',
    sex: 'Fêmea',
    age: '3 anos',
    size: 'Pequeno',
    weight: '4',
    status: 'adotado',
  }),
  pet({ id: 'biscoito', name: 'Biscoito', species: 'Cão', sex: 'Macho', age: '2 anos', status: 'adotado' }),
];

export const getOngPet = (id: string | undefined) => ongPets.find((p) => p.id === id);

export const ongPetMeta = (p: OngPet) => `${p.species} · ${p.sex} · ${p.age}`;

export interface Process {
  id: string;
  animalId: string;
  name: string;
  meta: string;
  ong: string;
  status: string;
  when: string;
  tone: 'soft' | 'solid' | 'muted';
  closed: boolean;
  to: string;
  chatTo: string;
}

export const processes: Process[] = [
  {
    id: 'skye',
    animalId: 'skye',
    name: 'Skye',
    meta: 'Cão · Fêmea',
    ong: 'ONG ABC',
    status: 'Em análise',
    when: 'há 2 h',
    tone: 'soft',
    closed: false,
    to: '/processo',
    chatTo: '/chat/abc',
  },
  {
    id: 'lua',
    animalId: 'lua',
    name: 'Lua',
    meta: 'Gato · Fêmea',
    ong: 'Patas Amigas',
    status: 'Visita agendada',
    when: '05/11',
    tone: 'solid',
    closed: false,
    to: '/processo',
    chatTo: '/chat/patas',
  },
  {
    id: 'thor',
    animalId: 'thor',
    name: 'Thor',
    meta: 'Cão · Macho',
    ong: 'ONG ABC',
    status: 'Interesse enviado',
    when: 'ontem',
    tone: 'muted',
    closed: false,
    to: '/processo',
    chatTo: '/chat',
  },
  {
    id: 'nina',
    animalId: 'nina',
    name: 'Nina',
    meta: 'Gato · Fêmea',
    ong: 'Lar dos Bichos',
    status: 'Não avançou',
    when: '20/10',
    tone: 'muted',
    closed: true,
    to: '/processo',
    chatTo: '/chat/lar',
  },
];
