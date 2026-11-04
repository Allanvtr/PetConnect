# Fotos dos animais e logos das ONGs

Este documento explica onde ficam as imagens do protótipo, como a ONG troca as fotos de um animal pelo app e como
substituir as ilustrações por fotos reais.

## Onde ficam as imagens

| O quê | Pasta | Nomes |
| --- | --- | --- |
| Fotos dos animais | `assets/animais/` | `skye.png`, `skye-2.png`, `lua.png`, `bob.png` etc. (800×800) |
| Logos das ONGs | `assets/ongs/` | `abc.png`, `patas.png`, `lar.png` (256×256) |

Todas são ilustrações originais, feitas para o protótipo. A ligação entre cada animal e as suas imagens está em
`src/data/images.ts`. Skye, Lua, Thor e Nina têm 4 imagens cada (a galeria do perfil usa todas). Os demais têm uma.

## Trocar as fotos pelo app (visão da ONG)

1. Abra a visão da ONG: toque longo (cerca de 1 segundo) no logo "PetConnect" do catálogo e escolha uma tela da ONG no
   menu do protótipo.
2. Vá em **Animais** e toque no lápis do animal (ou em **Adicionar animal** para um cadastro novo).
3. Na seção **Fotos**:
   - **Adicionar** abre uma folha com **Escolher da galeria** (fotos do próprio aparelho, várias de uma vez) e
     **Usar ilustração do protótipo** (as 14 ilustrações do app, útil no emulador, que costuma não ter fotos).
   - Tocar numa foto abre **Tornar principal** e **Remover foto**.
   - O limite é de 6 fotos por animal, e a primeira é a **principal**, a que aparece no catálogo e nas listas.
4. **Publicar** ou **Salvar rascunho** grava a mudança. **Publicar** exige ao menos uma foto.

Depois de salvar, a nova foto principal aparece no catálogo, no perfil do animal (com a galeria atualizada), em
"Meus processos", na confirmação de interesse e na lista de animais do painel.

### O que o protótipo não faz

- As mudanças ficam só na memória: ao fechar o app, as fotos voltam às ilustrações originais.
- Um animal criado em **Adicionar animal** não entra no catálogo, porque o protótipo não cria cadastros. A tela serve
  para testar o fluxo de fotos e o preenchimento do formulário.
- Os avatares dos candidatos e o mapa da ONG continuam como espaços reservados.

## Trocar as ilustrações por fotos reais (nos arquivos)

1. Escolha a imagem e dê a ela **o mesmo nome** do arquivo que será substituído (por exemplo `assets/animais/skye.png`).
   Imagens quadradas de cerca de 800 px funcionam bem: o app corta o excesso (`cover`) para caber em cada moldura.
2. Substitua o arquivo e reinicie com `npx expo start -c` (o `-c` limpa o cache do Metro, que às vezes guarda a imagem
   antiga).

Se a nova imagem tiver outra extensão (`.jpg`, por exemplo), ajuste também o `require` correspondente em
`src/data/images.ts`.

## Dar imagens a um animal novo dos dados

1. Copie as imagens para `assets/animais/`.
2. Em `src/data/images.ts`, acrescente uma entrada em `basePhotos` com o **id do animal** (o mesmo de `src/data/`):

   ```ts
   caramelo: [
     require('../../assets/animais/caramelo.png'),
     require('../../assets/animais/caramelo-2.png'),
   ],
   ```

   Os caminhos precisam estar escritos por extenso: o Metro não aceita `require` com nome montado em tempo de execução.

## Como funciona por dentro

- `src/data/images.ts` guarda as fotos originais (`basePhotos`) e as fotos editadas pela ONG. Esse estado fica fora dos
  componentes, no mesmo estilo do chat (`src/data/store.ts`), por isso sobrevive à troca de tela.
- `usePetPhotos(id)` devolve as fotos de um animal e atualiza a tela sozinho. `usePhotosRevision()` serve para listas
  que usam `petPhoto(id)` (a foto principal) e precisam redesenhar quando alguma foto muda.
- `src/components/PhotosEditor.tsx` é a seção **Fotos** do formulário, e o componente `Photo` (em `ui.tsx`) mostra
  qualquer imagem num bloco com tamanho fixo.
- A galeria do aparelho usa o `expo-image-picker`. O texto de permissão do iPhone está em `app.json`, no plugin
  `expo-image-picker`.

## Problemas comuns

- **"Unable to resolve module expo-image-picker"**: a dependência foi adicionada depois da sua última instalação. Rode
  `npm install` e reinicie o servidor.
- **A galeria não mostra fotos no emulador**: o emulador novo não tem imagens. Use **Usar ilustração do protótipo** ou
  arraste uma imagem para a janela do emulador para ela entrar na galeria.
- **A imagem trocada continua a antiga**: reinicie com `npx expo start -c`.
