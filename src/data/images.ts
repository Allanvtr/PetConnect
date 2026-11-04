// Ilustrações originais dos animais e das ONGs (assets/animais e assets/ong).
// O Metro exige caminhos fixos em require(), por isso o mapa é escrito por extenso.
import { useSyncExternalStore } from 'react';
import type { ImageSourcePropType } from 'react-native';

/** Fotos de cada animal; a primeira é a principal (cards e listas). */
const basePhotos: Record<string, ImageSourcePropType[]> = {
  skye: [
    require('../../assets/animais/skye.png'),
    require('../../assets/animais/skye-2.png'),
    require('../../assets/animais/skye-3.png'),
    require('../../assets/animais/skye-4.png'),
  ],
  lua: [
    require('../../assets/animais/lua.png'),
    require('../../assets/animais/lua-2.png'),
    require('../../assets/animais/lua-3.png'),
    require('../../assets/animais/lua-4.png'),
  ],
  thor: [
    require('../../assets/animais/thor.png'),
    require('../../assets/animais/thor-2.png'),
    require('../../assets/animais/thor-3.png'),
    require('../../assets/animais/thor-4.png'),
  ],
  nina: [
    require('../../assets/animais/nina.png'),
    require('../../assets/animais/nina-2.png'),
    require('../../assets/animais/nina-3.png'),
    require('../../assets/animais/nina-4.png'),
  ],
  bob: [require('../../assets/animais/bob.png')],
  mel: [require('../../assets/animais/mel.png')],
  pipoca: [require('../../assets/animais/pipoca.png')],
  rex: [require('../../assets/animais/rex.png')],
  tigre: [require('../../assets/animais/tigre.png')],
  amora: [require('../../assets/animais/amora.png')],
  mingau: [require('../../assets/animais/mingau.png')],
  faisca: [require('../../assets/animais/faisca.png')],
  pretinha: [require('../../assets/animais/pretinha.png')],
  biscoito: [require('../../assets/animais/biscoito.png')],
};

/** Logo de cada ONG. */
export const ongLogos: Record<string, ImageSourcePropType> = {
  abc: require('../../assets/ongs/abc.png'),
  patas: require('../../assets/ongs/patas.png'),
  lar: require('../../assets/ongs/lar.png'),
};

/* ------------------------------------------- Fotos editadas pela ONG
 * A ONG pode adicionar, remover e reordenar as fotos de um animal. As mudanças
 * ficam num estado fora dos componentes (como o chat), então aparecem no
 * catálogo, nos processos e no painel enquanto o app estiver aberto. */

const EMPTY: ImageSourcePropType[] = [];
let overrides: Record<string, ImageSourcePropType[]> = {};
let revision = 0;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Fotos atuais do animal (as editadas pela ONG, ou as do protótipo). */
export const getPetPhotos = (id: string | undefined): ImageSourcePropType[] =>
  id ? overrides[id] ?? basePhotos[id] ?? EMPTY : EMPTY;

/** Grava a lista de fotos do animal; a primeira é a principal. */
export function setPetPhotos(id: string, photos: ImageSourcePropType[]) {
  overrides = { ...overrides, [id]: photos };
  revision += 1;
  listeners.forEach((l) => l());
}

/** Fotos do animal que se atualizam sozinhas quando a ONG as altera. */
export function usePetPhotos(id: string | undefined): ImageSourcePropType[] {
  return useSyncExternalStore(subscribe, () => getPetPhotos(id), () => EMPTY);
}

/** Faz a tela refazer a renderização quando qualquer foto mudar (use junto de `petPhoto`). */
export function usePhotosRevision(): number {
  return useSyncExternalStore(subscribe, () => revision, () => 0);
}

/** Foto principal do animal, ou `undefined` quando não houver (a tela mostra o bloco cinza). */
export const petPhoto = (id: string | undefined): ImageSourcePropType | undefined => getPetPhotos(id)[0];

/** Uma ilustração por animal, para a ONG escolher ao adicionar foto no protótipo. */
export const photoLibrary: { id: string; source: ImageSourcePropType }[] = Object.entries(basePhotos).map(
  ([id, list]) => ({ id, source: list[0] }),
);
