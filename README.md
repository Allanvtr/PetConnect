# PetConnect · protótipo mobile (Expo)

Protótipo interativo do PetConnect (app de adoção responsável) como **aplicativo nativo** para Android e iOS, feito com
**React Native + TypeScript** sobre o **Expo (SDK 58)** e o **Expo Router**.
As 14 telas reproduzem o protótipo de média fidelidade. Os dados são simulados (ficam no código), então não há servidor
nem banco de dados.

## Como rodar

Requer Node 22.13 ou mais recente e o aplicativo **Expo Go** no celular (Play Store ou App Store).

```bash
npm install
```

### Na mesma rede Wi-Fi (casa, hotspot do celular)

Com o celular e o computador na mesma rede:

```bash
npx expo start
```

O terminal mostra um QR code. No Android, leia com o leitor do próprio Expo Go; no iPhone, com a câmera.
Para usar um emulador (Android Studio ou Xcode instalados), pressione `a` (Android) ou `i` (iOS, só no macOS) no
terminal.

Se o celular não conectar, verifique se o Firewall do Windows está liberando o Node na porta 8081 e se a rede está
marcada como **Privada** (e não Pública) nas configurações do Windows.

### Na eduroam (ou outra rede da universidade)

A eduroam isola os aparelhos conectados: o celular não consegue acessar o computador diretamente, mesmo estando na
mesma rede. Por isso o QR code do modo normal não abre o app. A saída é usar um **túnel**, que passa a conexão pela
internet:

```bash
npx expo start --tunnel
```

O túnel exige estar logado **na mesma conta Expo** no computador e no Expo Go, seja no Android ou no iPhone. Sem isso,
o Expo Go mostra o erro "You need to be signed in to Expo Go and Expo CLI to open your project". Faça isso uma vez:

1. **No computador:** `npx expo login --no-browser` (pede usuário ou e-mail e senha no terminal). Confira com
   `npx expo whoami`. No Windows, o `npx expo login` sem a opção `--no-browser` pode quebrar ao tentar abrir o
   navegador. Isso é um bug do Expo CLI.
2. **No celular (Android ou iPhone):** abra o Expo Go, toque no ícone de perfil e entre com a mesma conta.

Se a sua conta Expo foi criada pelo Google e não tem senha, crie uma em https://expo.dev/login →
**"Forgot password?"**, usando o e-mail do Google. A conta continua a mesma.

Alternativa sem o túnel do Expo: `npx expo start --tunnel ngrok` usa o ngrok, que já está nas dependências do projeto
(`@expo/ngrok`). O login no Expo Go e no computador continua sendo necessário.

### Outros comandos

- Conferir os tipos: `npm run typecheck`.

## Menu do protótipo

Para facilitar o teste com usuários, existe um menu que não faz parte do app final. Ele abre com **toque longo (cerca de
1 segundo) no logo "PetConnect"** do catálogo ou no **cabeçalho "ONG ABC"** do painel da ONG. Nele é possível pular para
qualquer uma das 14 telas e alternar entre a visão do adotante e a da ONG.

## Telas e rotas

| # | Tela | Rota |
| --- | --- | --- |
| 01 | Catálogo | `/` |
| 02 | Perfil do animal | `/animal/[id]` |
| 03 | Perfil da ONG | `/ongs/[id]` |
| 04 | Criar conta | `/cadastro` |
| 05 | Formulário Universal | `/formulario` |
| 06 | Confirmar interesse (e estado de sucesso) | `/confirmar/[id]` |
| 07 | Meus processos | `/processos` |
| 08 | Detalhe do processo | `/processo` |
| 09 | Chat (lista e conversa) | `/chat` e `/chat/[threadId]` |
| 10 | Painel da ONG | `/painel` |
| 11 | Animais da ONG | `/painel/animais` |
| 12 | Cadastro e edição de animal | `/painel/animais/novo` e `/painel/animais/[id]` |
| 13 | Candidatos | `/painel/candidatos` |
| 14 | Triagem do candidato | `/painel/candidatos/[id]` |

## O que é interativo

- **Catálogo:** chips de filtro (espécie e sexo) e busca por nome ou ONG sobre os 4 animais de exemplo.
- **Perfil do animal:** galeria de miniaturas, link para a ONG e botão "Tenho interesse".
- **Perfil da ONG:** copiar o endereço (área de transferência do aparelho) e ligar para a ONG.
- **Cadastro:** mostrar ou ocultar a senha e aceitar os termos, com o teclado certo para cada campo.
- **Formulário Universal:** seções que se abrem em sequência, com progresso, respostas Sim/Não e listas de escolha em
  folha inferior.
- **Confirmar interesse:** interruptores do que a ONG poderá ver (os obrigatórios ficam travados) e tela de sucesso.
- **Processos e detalhe:** abas Em andamento e Encerrados, mais uma linha do tempo e a desistência com confirmação.
- **Chat:** lista de conversas, com respostas rápidas e envio de mensagens digitadas. As mensagens enviadas continuam
  na conversa e aparecem na lista enquanto o app estiver aberto.
- **Área da ONG:** abas de animais por status, formulário de animal (com exclusão confirmada), filtro de candidatos e
  triagem com avanço de etapa e recusa com motivo.

## Estrutura

```
src/
  app/                rotas do Expo Router (um arquivo por tela)
  components/         Text (fonte Inter), Icons (SVG), Layout (tela, barras, diálogo), ui e Controls
  data/               dados simulados (animais e ONGs, conversas, candidatos, processos) e o estado do chat
  theme/colors.ts     paleta do protótipo
  routes.ts           lista das 14 telas usada pelo menu do protótipo
assets/               ícone, ícone adaptativo e tela de abertura
```

## Decisões de fidelidade

- Mesmas cores e proporções do protótipo de média fidelidade, com os mesmos textos. O azul-petróleo `#2F4B73` é a única
  cor de destaque e a fonte Inter vem embarcada no app (funciona sem internet).
- Fotos continuam como blocos cinza rotulados, como no protótipo; o mapa da ONG também é um espaço reservado.
- Adaptações próprias do celular: respeito às áreas seguras (notch e barra de gestos), teclado que empurra o conteúdo,
  voltar pelo gesto ou pelo botão do sistema, alvos de toque de 44 px e listas de escolha em folha inferior no lugar do
  seletor do navegador.
- Ações que o protótipo deixava sem destino ganharam um comportamento simples: desistir do processo abre uma
  confirmação, "Novo animal" abre um formulário vazio e cada card do catálogo abre o seu próprio animal.
