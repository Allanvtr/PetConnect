import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { BottomNav, Screen } from '../../../components/Layout';
import { T } from '../../../components/Text';
import { Chip, ChipRow, Photo, Pill, Tap, card, textStyles } from '../../../components/ui';
import { candidates } from '../../../data/ong';
import { colors } from '../../../theme/colors';

type Tab = 'todos' | 'novo' | 'andamento' | 'recusado';

const count = (g: Tab) => (g === 'todos' ? candidates.length : candidates.filter((c) => c.group === g).length);

const TABS: { id: Tab; label: string }[] = [
  { id: 'todos', label: `Todos (${count('todos')})` },
  { id: 'novo', label: `Novos (${count('novo')})` },
  { id: 'andamento', label: `Em andamento (${count('andamento')})` },
  { id: 'recusado', label: `Recusados (${count('recusado')})` },
];

/** Tela 13 · Interessados (candidatos) da ONG. */
export default function OngInteressados() {
  const [tab, setTab] = useState<Tab>('todos');
  const people = tab === 'todos' ? candidates : candidates.filter((c) => c.group === tab);

  return (
    <Screen tab>
      <View style={{ paddingTop: 20, paddingHorizontal: 16, paddingBottom: 8, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <T style={textStyles.h1} accessibilityRole="header">
            Candidatos
          </T>
          <T style={textStyles.muted}>Todos os animais ▾</T>
        </View>
        <ChipRow>
          {TABS.map((t) => (
            <Chip key={t.id} label={t.label} selected={tab === t.id} onPress={() => setTab(t.id)} />
          ))}
        </ChipRow>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 4, paddingHorizontal: 16, paddingBottom: 12, gap: 10 }}>
        {people.map((p) => (
          <Tap
            key={p.id}
            href={`/painel/candidatos/${p.id}`}
            label={`${p.short}, quer adotar ${p.pet}, ${p.chip}`}
            style={[card, { gap: 10, padding: 12, backgroundColor: colors.white }]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Photo style={{ width: 44, height: 44, borderRadius: 22, fontSize: 10 }} />
              <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
                <T style={{ fontSize: 15, fontWeight: '700', color: colors.ink }}>{p.short}</T>
                <T style={textStyles.hint}>
                  {p.city} · quer adotar {p.pet}
                </T>
              </View>
              <Pill tone={p.group === 'novo' ? 'solid' : p.group === 'andamento' ? 'soft' : 'muted'}>{p.chip}</Pill>
            </View>
            <View style={{ paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, backgroundColor: colors.soft }}>
              <T style={{ fontSize: 13, color: colors.body }}>{p.resumo}</T>
            </View>
          </Tap>
        ))}
        {people.length === 0 && (
          <T style={{ paddingVertical: 24, paddingHorizontal: 8, textAlign: 'center', fontSize: 14, color: colors.muted }}>
            Nenhum candidato nesta categoria.
          </T>
        )}
      </ScrollView>

      <BottomNav variant="ong" active="candidatos" />
    </Screen>
  );
}
