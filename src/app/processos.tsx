import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { IconChat } from '../components/Icons';
import { BottomNav, Screen } from '../components/Layout';
import { T } from '../components/Text';
import { Photo, Pill, RoundButton, Segmented, Tap, card, textStyles } from '../components/ui';
import { processes } from '../data/ong';
import { colors } from '../theme/colors';

const TABS = [
  { id: 'andamento', label: 'Em andamento · 3' },
  { id: 'encerrados', label: 'Encerrados · 1' },
] as const;

type TabId = (typeof TABS)[number]['id'];

/** Tela 07 · Meus processos. */
export default function Processos() {
  const [tab, setTab] = useState<TabId>('andamento');
  const list = processes.filter((p) => p.closed === (tab === 'encerrados'));

  return (
    <Screen tab>
      <View style={{ paddingTop: 20, paddingHorizontal: 16, paddingBottom: 12, gap: 12 }}>
        <T style={textStyles.h1} accessibilityRole="header">
          Meus processos
        </T>
        <Segmented tabs={[...TABS]} value={tab} onChange={setTab} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12, gap: 12 }}>
        {list.map((p) => (
          <View key={p.id} style={[card, { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 }]}>
            <Tap
              href={p.to}
              label={`${p.name}, ${p.status}`}
              style={{ flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <Photo style={{ width: 64, height: 64, borderRadius: 10 }} />
              <View style={{ flex: 1, minWidth: 0, gap: 4 }}>
                <T style={{ fontSize: 16, fontWeight: '700', color: colors.ink }}>
                  {p.name} <T style={{ fontSize: 13, fontWeight: '500', color: colors.muted }}>· {p.meta}</T>
                </T>
                <T style={textStyles.muted}>{p.ong}</T>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Pill tone={p.tone}>{p.status}</Pill>
                  <T style={textStyles.hint}>{p.when}</T>
                </View>
              </View>
            </Tap>
            <RoundButton label="Abrir chat com a ONG" href={p.chatTo}>
              <IconChat size={20} color={colors.navy} />
            </RoundButton>
          </View>
        ))}
      </ScrollView>

      <BottomNav variant="adotante" active="processos" />
    </Screen>
  );
}
