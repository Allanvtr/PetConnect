import { Pressable, ScrollView, View } from 'react-native';
import { IconPlus, IconVerified } from '../../components/Icons';
import { BottomNav, Screen } from '../../components/Layout';
import { useProtoMenu } from '../../components/ProtoMenu';
import { T } from '../../components/Text';
import { Button, LinkText, Photo, Pill, Tap, card, textStyles } from '../../components/ui';
import { candidates } from '../../data/ong';
import { colors } from '../../theme/colors';

const METRICS = [
  { n: '28', label: 'animais cadastrados', accent: false },
  { n: '6', label: 'novos interessados', accent: true },
  { n: '7', label: 'processos em andamento', accent: false },
];

/** Tela 10 · Painel da ONG. */
export default function OngPainel() {
  const openMenu = useProtoMenu();
  const recent = candidates.filter((c) => c.group !== 'recusado');

  return (
    <Screen tab>
      <Pressable
        onLongPress={openMenu}
        delayLongPress={600}
        accessibilityRole="header"
        accessibilityHint="Toque longo abre o menu do protótipo"
        style={{ paddingTop: 20, paddingHorizontal: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}
      >
        <Photo style={{ width: 48, height: 48, borderRadius: 24, fontSize: 11 }}>Logo</Photo>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <T style={{ fontSize: 20, fontWeight: '700', letterSpacing: -0.2, color: colors.ink }}>ONG ABC</T>
            <IconVerified size={16} />
          </View>
          <T style={textStyles.muted}>Painel · resposta média ~2 h · ★ 4,9</T>
        </View>
      </Pressable>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12, gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {METRICS.map((k) => (
            <View key={k.label} style={[card, { flex: 1, paddingVertical: 12, paddingHorizontal: 8, alignItems: 'center' }]}>
              <T style={{ fontSize: 26, fontWeight: '700', letterSpacing: -0.26, color: k.accent ? colors.navy : colors.ink }}>
                {k.n}
              </T>
              <T style={{ fontSize: 12, lineHeight: 16, textAlign: 'center', color: colors.muted }}>{k.label}</T>
            </View>
          ))}
        </View>

        <Button label="Cadastrar novo animal" href="/painel/animais/novo" leading={<IconPlus color={colors.white} />} />

        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <T style={textStyles.h2}>Interessados recentes</T>
            <LinkText label="Ver todos" size={13} href="/painel/candidatos" />
          </View>
          {recent.map((r) => (
            <Tap
              key={r.id}
              href={`/painel/candidatos/${r.id}`}
              label={`${r.short}, interesse em ${r.pet}`}
              style={[card, { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, paddingHorizontal: 12 }]}
            >
              <Photo style={{ width: 40, height: 40, borderRadius: 20, fontSize: 10 }} />
              <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
                <T style={{ fontSize: 14, fontWeight: '700', color: colors.ink }}>
                  {r.short} <T style={{ fontWeight: '500', color: colors.muted }}>→ {r.pet}</T>
                </T>
                <T style={textStyles.hint}>{r.city}</T>
              </View>
              <Pill tone={r.group === 'novo' ? 'solid' : 'soft'}>{r.chip}</Pill>
            </Tap>
          ))}
        </View>
      </ScrollView>

      <BottomNav variant="ong" active="painel" />
    </Screen>
  );
}
