// Lista das 15 telas do protótipo. Alimenta o menu do protótipo (toque longo no logo).

export type Area = 'adotante' | 'ong';

export interface ScreenInfo {
  n: string;
  title: string;
  area: Area;
  /** Caminho concreto para abrir a tela a partir do menu. */
  to: string;
}

export const screens: ScreenInfo[] = [
  { n: '01', title: 'Catálogo', area: 'adotante', to: '/' },
  { n: '02', title: 'Perfil do animal', area: 'adotante', to: '/animal/skye' },
  { n: '03', title: 'Perfil da ONG', area: 'adotante', to: '/ongs/abc' },
  { n: '04', title: 'Criar conta', area: 'adotante', to: '/cadastro' },
  { n: '05', title: 'Formulário Universal', area: 'adotante', to: '/formulario' },
  { n: '06', title: 'Confirmar interesse', area: 'adotante', to: '/confirmar/skye' },
  { n: '07', title: 'Meus processos', area: 'adotante', to: '/processos' },
  { n: '08', title: 'Detalhe do processo', area: 'adotante', to: '/processo' },
  { n: '09', title: 'Chat', area: 'adotante', to: '/chat' },
  { n: '10', title: 'Painel da ONG', area: 'ong', to: '/painel' },
  { n: '11', title: 'Animais da ONG', area: 'ong', to: '/painel/animais' },
  { n: '12', title: 'Cadastro e edição de animal', area: 'ong', to: '/painel/animais/skye' },
  { n: '13', title: 'Candidatos', area: 'ong', to: '/painel/candidatos' },
  { n: '14', title: 'Triagem do candidato', area: 'ong', to: '/painel/candidatos/augusto' },
  { n: '15', title: 'Chat da ONG', area: 'ong', to: '/painel/chat' },
];
