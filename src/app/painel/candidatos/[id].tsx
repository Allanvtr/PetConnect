import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { IconChat } from '../../../components/Icons';
import { Dialog, Footer, Screen, TopBar } from '../../../components/Layout';
import { T } from '../../../components/Text';
import { Button, LinkText, Photo, RoundButton, card, lh, textStyles } from '../../../components/ui';
import { getCandidate } from '../../../data/ong';
import type { Candidate } from '../../../data/ong';
import { colors } from '../../../theme/colors';

const STAGES = ['Interesse', 'Análise', 'Visita', 'Adoção'];
const ADVANCE = ['Avançar para análise', 'Avançar para visita', 'Concluir adoção', 'Adoção concluída'];
const REASONS = [
  'Perfil de moradia incompatível',
  'Rotina incompatível com o animal',
  'Outro motivo (descrever no chat)',
];

function TriagemBody({ candidate }: { candidate: Candidate }) {
  const router = useRouter();
  const [stage, setStage] = useState(candidate.stage);
  const [refusing, setRefusing] = useState(false);
  const [reason, setReason] = useState(0);

  return (
    <Screen>
      <TopBar title="Triagem do candidato" fallback="/painel/candidatos" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, gap: 18 }}>
        <View style={{ gap: 2 }}>
          <T style={textStyles.muted}>Interesse em</T>
          <T style={{ fontSize: 22, fontWeight: '700', letterSpacing: -0.22, color: colors.ink }}>{candidate.pet}</T>
          <T style={textStyles.muted}>Enviado em {candidate.sentAt}</T>
        </View>

        <View style={[card, { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 }]}>
          <Photo style={{ width: 52, height: 52, borderRadius: 26, fontSize: 11 }} />
          <View style={{ flex: 1, gap: 2 }}>
            <T style={{ fontSize: 16, fontWeight: '700', color: colors.ink }}>{candidate.fullName}</T>
            <T style={textStyles.muted}>
              {candidate.city} · {candidate.age} anos
            </T>
          </View>
          <RoundButton label="Abrir chat com o candidato" href={`/painel/chat/${candidate.id}`}>
            <IconChat size={20} color={colors.navy} />
          </RoundButton>
        </View>

        <View style={{ gap: 8 }}>
          <T style={textStyles.h2}>Resumo do Formulário Universal</T>
          <View style={[card, { overflow: 'hidden' }]}>
            {candidate.answers.map(([k, v, ok], i) => (
              <View
                key={k}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  paddingVertical: 11,
                  paddingHorizontal: 14,
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: colors.divider,
                }}
              >
                <View
                  accessible
                  accessibilityLabel={ok ? 'Compatível' : 'Atenção'}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: ok ? colors.navy : colors.white,
                    borderColor: ok ? colors.navy : colors.placeholder,
                  }}
                >
                  <T style={{ fontSize: 13, fontWeight: '700', color: ok ? colors.white : colors.muted }}>
                    {ok ? '✓' : '×'}
                  </T>
                </View>
                <T style={{ flex: 1, fontSize: 14, color: colors.muted }}>{k}</T>
                <T style={{ flexShrink: 1, fontSize: 14, fontWeight: '600', textAlign: 'right', color: colors.ink }}>{v}</T>
              </View>
            ))}
          </View>
          <LinkText label="Ver formulário completo →" href="/formulario" />
        </View>

        <View style={{ gap: 10 }}>
          <T style={textStyles.h2}>Etapa do processo</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {STAGES.map((label, i) => (
              <View key={label} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                <View
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: i <= stage ? colors.navy : colors.line,
                  }}
                />
                <T
                  style={{
                    fontSize: 11,
                    fontWeight: i === stage ? '700' : '500',
                    color: i <= stage ? colors.ink : colors.muted,
                    textAlign: 'center',
                  }}
                >
                  {label}
                </T>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Footer style={{ flexDirection: 'row', gap: 8 }}>
        <Button label="Recusar" variant="neutral" onPress={() => setRefusing(true)} style={{ flex: 1 }} />
        <Button
          label={ADVANCE[Math.min(stage, 3)]}
          onPress={() => setStage(Math.min(3, stage + 1))}
          style={{ flex: 1 }}
        />
      </Footer>

      {refusing && (
        <Dialog label="Recusar candidato" placement="sheet" onClose={() => setRefusing(false)}>
          <T style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>Recusar este candidato?</T>
          <T style={{ fontSize: 14, lineHeight: lh(14), color: colors.body }}>
            Escolha um motivo. O candidato recebe uma mensagem respeitosa e pode se candidatar a outros animais.
          </T>
          <View style={{ gap: 6 }}>
            {REASONS.map((r, i) => (
              <Pressable
                key={r}
                accessibilityRole="button"
                aria-selected={reason === i}
                onPress={() => setReason(i)}
                style={{
                  minHeight: 48,
                  paddingHorizontal: 14,
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: reason === i ? colors.navy : colors.lineStrong,
                  backgroundColor: reason === i ? colors.tint : colors.white,
                }}
              >
                <T style={{ fontSize: 14, fontWeight: '500', color: colors.ink }}>{r}</T>
              </Pressable>
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: 8, paddingTop: 4 }}>
            <Button label="Cancelar" variant="outline" height={48} fontSize={15} onPress={() => setRefusing(false)} style={{ flex: 1 }} />
            <Button
              label="Confirmar recusa"
              variant="dark"
              height={48}
              fontSize={15}
              style={{ flex: 1 }}
              onPress={() => {
                setRefusing(false);
                router.navigate('/painel/candidatos');
              }}
            />
          </View>
        </Dialog>
      )}
    </Screen>
  );
}

/** Tela 14 · Triagem do candidato. */
export default function OngTriagem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const candidate = getCandidate(id);
  if (!candidate) return <Redirect href="/painel/candidatos" />;
  return <TriagemBody key={candidate.id} candidate={candidate} />;
}
