import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { photoLibrary } from '../data/images';
import { colors } from '../theme/colors';
import { IconPlus } from './Icons';
import { Dialog } from './Layout';
import { T } from './Text';
import { Button, Photo, textStyles } from './ui';

export const MAX_PHOTOS = 6;

/** Foto da lista com um identificador próprio (a posição muda quando a ONG reordena). */
export interface PhotoItem {
  key: string;
  source: ImageSourcePropType;
}

let counter = 0;
export const toItems = (sources: ImageSourcePropType[]): PhotoItem[] =>
  sources.map((source) => ({ key: `p${(counter += 1)}`, source }));

type Sheet = { kind: 'add' } | { kind: 'library' } | { kind: 'photo'; index: number } | null;

/**
 * Fotos do animal no formulário da ONG: adicionar (galeria do aparelho ou
 * ilustração do protótipo), tornar principal e remover. A primeira é a principal.
 */
export function PhotosEditor({
  photos,
  onChange,
  error,
}: {
  photos: PhotoItem[];
  onChange: (next: PhotoItem[]) => void;
  error?: string;
}) {
  const [sheet, setSheet] = useState<Sheet>(null);
  const [notice, setNotice] = useState<string>();
  const room = MAX_PHOTOS - photos.length;

  const add = (sources: ImageSourcePropType[]) => onChange([...photos, ...toItems(sources.slice(0, room))]);

  const pickFromDevice = async () => {
    setSheet(null);
    setNotice(undefined);
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: room > 1,
        selectionLimit: room,
        quality: 0.8,
      });
      if (!res.canceled) add(res.assets.map((a) => ({ uri: a.uri })));
    } catch {
      setNotice('Não foi possível abrir a galeria. Tente uma ilustração do protótipo.');
    }
  };

  const makeMain = (index: number) => {
    onChange([photos[index], ...photos.filter((_, i) => i !== index)]);
    setSheet(null);
  };
  const remove = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
    setSheet(null);
  };

  const selected = sheet?.kind === 'photo' ? sheet.index : -1;

  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <T style={textStyles.lbl}>Fotos</T>
        <T style={{ fontSize: 12, color: colors.muted }}>
          {photos.length} de {MAX_PHOTOS}
        </T>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {room > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Adicionar foto"
            onPress={() => setSheet({ kind: 'add' })}
            style={{
              width: 88,
              height: 88,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              borderRadius: 10,
              borderWidth: 2,
              borderStyle: 'dashed',
              borderColor: colors.placeholder,
            }}
          >
            <IconPlus size={22} color={colors.navy} />
            <T style={{ fontSize: 12, fontWeight: '600', color: colors.navy }}>Adicionar</T>
          </Pressable>
        )}
        {photos.map((p, i) => (
          <Pressable
            key={p.key}
            accessibilityRole="button"
            accessibilityLabel={i === 0 ? 'Foto principal. Toque para opções' : `Foto ${i + 1}. Toque para opções`}
            onPress={() => setSheet({ kind: 'photo', index: i })}
            style={{ width: 88, height: 88 }}
          >
            <Photo source={p.source} style={{ width: 88, height: 88, borderRadius: 10 }} />
            {i === 0 && (
              <View
                style={{
                  position: 'absolute',
                  left: 4,
                  bottom: 4,
                  paddingVertical: 2,
                  paddingHorizontal: 6,
                  borderRadius: 6,
                  backgroundColor: colors.navy,
                }}
              >
                <T style={{ fontSize: 10, fontWeight: '700', color: colors.white }}>Principal</T>
              </View>
            )}
          </Pressable>
        ))}
        {photos.length === 0 && (
          <View style={{ width: 88, height: 88, borderRadius: 10, backgroundColor: colors.photo, alignItems: 'center', justifyContent: 'center' }}>
            <T style={{ fontSize: 12, color: colors.muted }}>Foto 1</T>
          </View>
        )}
      </ScrollView>

      <T style={{ fontSize: 12, color: colors.muted }}>
        A primeira foto aparece no catálogo. Toque numa foto para torná-la principal ou removê-la.
      </T>
      {(error || notice) && (
        <T style={{ fontSize: 13, fontWeight: '600', color: '#B3261E' }} accessibilityRole="alert">
          {error ?? notice}
        </T>
      )}

      {sheet?.kind === 'add' && (
        <Dialog label="Adicionar foto" placement="sheet" onClose={() => setSheet(null)}>
          <T style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>Adicionar foto</T>
          <Button label="Escolher da galeria" height={48} fontSize={15} onPress={pickFromDevice} />
          <Button
            label="Usar ilustração do protótipo"
            variant="outline"
            height={48}
            fontSize={15}
            onPress={() => setSheet({ kind: 'library' })}
          />
          <Button label="Cancelar" variant="outline" height={48} fontSize={15} onPress={() => setSheet(null)} />
        </Dialog>
      )}

      {sheet?.kind === 'library' && (
        <Dialog label="Ilustrações do protótipo" placement="sheet" onClose={() => setSheet(null)}>
          <T style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>Ilustrações do protótipo</T>
          <T style={{ fontSize: 13, color: colors.muted }}>Toque para adicionar. Você pode escolher mais de uma.</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {photoLibrary.map((it) => (
              <Pressable
                key={it.id}
                accessibilityRole="button"
                accessibilityLabel={`Adicionar ilustração ${it.id}`}
                onPress={() => {
                  if (photos.length < MAX_PHOTOS) add([it.source]);
                }}
                style={{ width: 68, height: 68, borderRadius: 10, overflow: 'hidden', backgroundColor: colors.photo }}
              >
                <Image
                  source={it.source}
                  resizeMode="cover"
                  accessibilityIgnoresInvertColors
                  style={{ width: '100%', height: '100%' }}
                />
              </Pressable>
            ))}
          </View>
          <Button label="Concluir" height={48} fontSize={15} onPress={() => setSheet(null)} />
        </Dialog>
      )}

      {selected >= 0 && photos[selected] && (
        <Dialog label="Opções da foto" placement="sheet" onClose={() => setSheet(null)}>
          <T style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>
            {selected === 0 ? 'Foto principal' : `Foto ${selected + 1}`}
          </T>
          {selected > 0 && <Button label="Tornar principal" height={48} fontSize={15} onPress={() => makeMain(selected)} />}
          <Button label="Remover foto" variant="outline" height={48} fontSize={15} onPress={() => remove(selected)} />
          <Button label="Cancelar" variant="outline" height={48} fontSize={15} onPress={() => setSheet(null)} />
        </Dialog>
      )}
    </View>
  );
}
