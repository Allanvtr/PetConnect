import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { IconPencil, IconPlus } from '../../../components/Icons';
import { BottomNav, Screen } from '../../../components/Layout';
import { T } from '../../../components/Text';
import { Button, Photo, RoundButton, Segmented, card, textStyles } from '../../../components/ui';
import { useRouter } from 'expo-router';
import { ongPetMeta, ongPets } from '../../../data/ong';
import type { PetStatus } from '../../../data/ong';
import { colors } from '../../../theme/colors';

const TABS: { id: PetStatus; label: string }[] = [
  { id: 'disponivel', label: 'Disponíveis · 24' },
  { id: 'processo', label: 'Em processo · 4' },
  { id: 'adotado', label: 'Adotados' },
];

/** Tela 11 · Animais da ONG. */
export default function OngAnimais() {
  const router = useRouter();
  const [tab, setTab] = useState<PetStatus>('disponivel');
  const list = ongPets.filter((p) => p.status === tab);

  return (
    <Screen tab>
      <View style={{ paddingTop: 20, paddingHorizontal: 16, paddingBottom: 12, gap: 12 }}>
        <T style={textStyles.h1} accessibilityRole="header">
          Animais
        </T>
        <Segmented tabs={TABS} value={tab} onChange={setTab} tight />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12, gap: 10 }}>
        {list.map((p) => (
          <View key={p.id} style={[card, { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 10 }]}>
            <Photo style={{ width: 60, height: 60, borderRadius: 10, fontSize: 11 }} />
            <View style={{ flex: 1, minWidth: 0, gap: 4 }}>
              <T style={{ fontSize: 16, fontWeight: '700', color: colors.ink }}>{p.name}</T>
              <T style={textStyles.muted}>{ongPetMeta(p)}</T>
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={`${p.interested} interessados em ${p.name}`}
                onPress={() => router.push('/painel/candidatos')}
                style={{
                  alignSelf: 'flex-start',
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                  borderRadius: 12,
                  backgroundColor: colors.tint,
                }}
              >
                <T style={{ fontSize: 12, fontWeight: '700', color: colors.navy }}>{p.interested} interessados</T>
              </Pressable>
            </View>
            <RoundButton label={`Editar ${p.name}`} href={`/painel/animais/${p.id}`}>
              <IconPencil />
            </RoundButton>
          </View>
        ))}
      </ScrollView>

      <View style={{ paddingTop: 10, paddingHorizontal: 16, paddingBottom: 12 }}>
        <Button label="Adicionar animal" href="/painel/animais/novo" leading={<IconPlus color={colors.white} />} />
      </View>

      <BottomNav variant="ong" active="animais" />
    </Screen>
  );
}
