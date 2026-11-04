import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CheckRow, Option } from '../../../components/Controls';
import { Dialog, Screen, TopBar } from '../../../components/Layout';
import { PhotosEditor, toItems } from '../../../components/PhotosEditor';
import type { PhotoItem } from '../../../components/PhotosEditor';
import { T } from '../../../components/Text';
import { Button, Chip, Field, Input, LinkText, Select, lh, textStyles } from '../../../components/ui';
import { getPetPhotos, setPetPhotos } from '../../../data/images';
import { getOngPet } from '../../../data/ong';
import type { OngPet } from '../../../data/ong';
import { colors } from '../../../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PERSONALITIES = ['Caseira', 'Carinhosa', 'Calma', 'Brincalhona', 'Dócil', 'Agitada'];

const HEALTH: { id: 'castrada' | 'vacinas' | 'microchip' | 'verm'; label: string }[] = [
  { id: 'castrada', label: 'Castrada' },
  { id: 'vacinas', label: 'Vacinas em dia' },
  { id: 'microchip', label: 'Microchip' },
  { id: 'verm', label: 'Vermifugada' },
];

function FormBody({ pet }: { pet?: OngPet }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [sex, setSex] = useState<string | undefined>(pet?.sex);
  const [species, setSpecies] = useState<string>(pet?.species ?? 'Cão');
  const [size, setSize] = useState<string>(pet?.size ?? 'Médio');
  const [personality, setPersonality] = useState<Record<string, boolean>>(
    Object.fromEntries((pet?.personality ?? []).map((p) => [p, true])),
  );
  const [health, setHealth] = useState({
    castrada: pet?.castrada ?? false,
    vacinas: pet?.vacinas ?? false,
    microchip: pet?.microchip ?? false,
    verm: pet?.verm ?? false,
  });
  const [confirming, setConfirming] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>(() => toItems(getPetPhotos(pet?.id)));
  const [photoError, setPhotoError] = useState<string>();
  const isNew = !pet;
  const back = () => router.navigate('/painel/animais');
  const changePhotos = (next: PhotoItem[]) => {
    setPhotos(next);
    setPhotoError(undefined);
  };
  /** Grava as fotos no animal (se já existe) e volta para a lista. */
  const save = (publish: boolean) => {
    if (publish && photos.length === 0) {
      setPhotoError('Adicione ao menos uma foto para publicar.');
      return;
    }
    if (pet) setPetPhotos(pet.id, photos.map((p) => p.source));
    back();
  };

  return (
    <Screen keyboard>
      <TopBar title={isNew ? 'Cadastrar animal' : 'Editar animal'} fallback="/painel/animais" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 18 }}
        keyboardShouldPersistTaps="handled"
      >
        <PhotosEditor photos={photos} onChange={changePhotos} error={photoError} />

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <Field label="Nome" style={half}>
            <Input label="Nome" defaultValue={pet?.name} placeholder="Nome do animal" paddingX={12} />
          </Field>
          <Field label="Idade" style={half}>
            <Input label="Idade" defaultValue={pet?.age} placeholder="Ex.: 2 anos" paddingX={12} />
          </Field>
          <Field label="Espécie" style={half}>
            <Select label="Espécie" options={['Cão', 'Gato']} value={species} onChange={setSpecies} paddingX={12} />
          </Field>
          <Field label="Porte" style={half}>
            <Select label="Porte" options={['Pequeno', 'Médio', 'Grande']} value={size} onChange={setSize} paddingX={12} />
          </Field>
          <Field label="Sexo" style={half}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {['Fêmea', 'Macho'].map((s) => (
                <Option key={s} label={s} selected={sex === s} onPress={() => setSex(s)} />
              ))}
            </View>
          </Field>
          <Field label="Peso (kg)" style={half}>
            <Input
              label="Peso (kg)"
              defaultValue={pet?.weight}
              placeholder="Ex.: 12"
              keyboardType="decimal-pad"
              paddingX={12}
            />
          </Field>
        </View>

        <View style={{ gap: 8 }}>
          <T style={textStyles.lbl}>Personalidade</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {PERSONALITIES.map((p) => (
              <Chip
                key={p}
                label={p}
                selected={!!personality[p]}
                onPress={() => setPersonality({ ...personality, [p]: !personality[p] })}
              />
            ))}
          </View>
        </View>

        <View style={{ gap: 4 }}>
          <T style={[textStyles.lbl, { paddingBottom: 4 }]}>Saúde</T>
          {HEALTH.map((h) => (
            <CheckRow
              key={h.id}
              label={h.label}
              checked={health[h.id]}
              onChange={() => setHealth({ ...health, [h.id]: !health[h.id] })}
            />
          ))}
          <View style={{ gap: 6, paddingTop: 8 }}>
            <T style={{ fontSize: 13, color: colors.muted }}>Data do último check-up veterinário</T>
            <Input
              label="Data do último check-up veterinário"
              defaultValue={pet?.checkup}
              placeholder="dd/mm/aaaa"
              keyboardType="numbers-and-punctuation"
              paddingX={12}
            />
          </View>
        </View>

        <Field label="História">
          <Input
            label="História"
            multiline
            height={96}
            defaultValue={pet?.story}
            placeholder="Conte como o animal chegou à ONG e como ele é no dia a dia"
            style={{ lineHeight: lh(15, 1.3) }}
          />
        </Field>
      </ScrollView>

      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 16,
          paddingBottom: Math.max(14, insets.bottom),
          gap: 6,
          borderTopWidth: 1,
          borderTopColor: colors.line,
          backgroundColor: colors.white,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button label="Salvar rascunho" variant="outline" height={48} fontSize={15} onPress={() => save(false)} style={{ flex: 1 }} />
          <Button label="Publicar" height={48} fontSize={15} onPress={() => save(true)} style={{ flex: 1 }} />
        </View>
        {!isNew && (
          <LinkText
            label="Excluir animal"
            size={14}
            color={colors.muted}
            underline
            onPress={() => setConfirming(true)}
            style={{ alignItems: 'center' }}
          />
        )}
      </View>

      {confirming && pet && (
        <Dialog label="Confirmar exclusão" onClose={() => setConfirming(false)}>
          <T style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>
            Excluir {pet.sex === 'Fêmea' ? 'a' : 'o'} {pet.name}?
          </T>
          <T style={{ fontSize: 14, lineHeight: lh(14), color: colors.body }}>
            O perfil sai do catálogo e os {pet.interested} processos abertos serão encerrados. Os interessados
            recebem um aviso automático.
          </T>
          <View style={{ flexDirection: 'row', gap: 8, paddingTop: 4 }}>
            <Button label="Cancelar" variant="outline" height={48} fontSize={15} onPress={() => setConfirming(false)} style={{ flex: 1 }} />
            <Button
              label="Excluir"
              variant="dark"
              height={48}
              fontSize={15}
              style={{ flex: 1 }}
              onPress={() => {
                setConfirming(false);
                back();
              }}
            />
          </View>
        </Dialog>
      )}
    </Screen>
  );
}

const half = { flexBasis: '45%', flexGrow: 1 } as const;

/** Tela 12 · Cadastro e edição de animal (rota `novo` ou id do animal). */
export default function OngAnimalForm() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isNew = id === 'novo';
  const pet = id && !isNew ? getOngPet(id) : undefined;
  if (!isNew && !pet) return <Redirect href="/painel/animais" />;
  return <FormBody key={id} pet={pet} />;
}
