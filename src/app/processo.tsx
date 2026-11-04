import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { IconChat } from '../components/Icons';
import { Dialog, Footer, Screen, TopBar } from '../components/Layout';
import { T } from '../components/Text';
import { Button, LinkText, Photo, Pill, RoundButton, card, lh, textStyles } from '../components/ui';
import { petPhoto, usePhotosRevision } from '../data/images';
import { colors } from '../theme/colors';

type StepState = 'done' | 'now' | 'todo';

const STEPS: { title: string; when: string; state: StepState }[] = [
  { title: 'Interesse enviado', when: '23/10/2026', state: 'done' },
  { title: 'Perfil em análise pela ONG', when: 'Desde 24/10/2026', state: 'now' },
  { title: 'Conversa e agendamento de visita', when: 'Previsto após a análise', state: 'todo' },
  { title: 'Visita ao animal', when: 'A combinar pelo chat', state: 'todo' },
  { title: 'Adoção concluída', when: 'Termo assinado na entrega', state: 'todo' },
];

/** Tela 08 · Detalhe do processo. */
export default function Processo() {
  usePhotosRevision(); // atualiza quando a ONG troca as fotos
  const router = useRouter();
  const [giveUp, setGiveUp] = useState(false);

  return (
    <Screen>
      <TopBar title="Detalhes do processo" fallback="/processos" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, gap: 20 }}>
        <View style={[card, { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 }]}>
          <Photo source={petPhoto('skye')} alt="Ilustração de Skye" style={{ width: 64, height: 64, borderRadius: 10 }} />
          <View style={{ flex: 1, gap: 4 }}>
            <T style={{ fontSize: 17, fontWeight: '700', color: colors.ink }}>Skye</T>
            <T style={textStyles.muted}>Cão · Fêmea · ONG ABC</T>
            <Pill tone="soft">Em análise</Pill>
          </View>
          <RoundButton label="Abrir chat com a ONG" href="/chat/abc">
            <IconChat size={20} color={colors.navy} />
          </RoundButton>
        </View>

        <View style={{ gap: 12 }}>
          <T style={textStyles.h2}>Linha do tempo</T>
          <View>
            {STEPS.map((s, i) => {
              const done = s.state === 'done';
              const now = s.state === 'now';
              const last = i === STEPS.length - 1;
              return (
                <View key={s.title} style={{ flexDirection: 'row', gap: 14 }}>
                  <View style={{ width: 24, alignItems: 'center' }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: done ? colors.navy : now ? colors.tint : colors.white,
                        borderWidth: 2,
                        borderColor: done || now ? colors.navy : colors.lineStrong,
                      }}
                    >
                      {done && <T style={{ fontSize: 12, fontWeight: '700', color: colors.white }}>✓</T>}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        width: 2,
                        minHeight: 28,
                        backgroundColor: last ? 'transparent' : done ? colors.navy : colors.line,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, paddingBottom: 16, gap: 2 }}>
                    <T
                      style={{
                        fontSize: 15,
                        fontWeight: now ? '700' : '600',
                        color: s.state === 'todo' ? colors.muted : colors.ink,
                      }}
                    >
                      {s.title}
                    </T>
                    <T style={textStyles.muted}>{s.when}</T>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, backgroundColor: colors.soft }}>
          <T style={{ fontSize: 13, lineHeight: lh(13), color: colors.body }}>
            <T style={{ fontWeight: '700' }}>Sem papelada.</T> Se a ONG precisar de algo mais, ela pede pelo chat e
            você responde ali mesmo.
          </T>
        </View>
      </ScrollView>

      <Footer style={{ gap: 8 }}>
        <Button label="Falar com a ONG" href="/chat/abc" />
        <LinkText
          label="Desistir do processo"
          size={14}
          color={colors.muted}
          underline
          onPress={() => setGiveUp(true)}
          style={{ alignItems: 'center', minHeight: 48 }}
        />
      </Footer>

      {giveUp && (
        <Dialog label="Desistir do processo" onClose={() => setGiveUp(false)}>
          <T style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>Desistir do processo com a Skye?</T>
          <T style={{ fontSize: 14, lineHeight: lh(14), color: colors.body }}>
            A ONG ABC será avisada e o seu perfil deixa de ser analisado para este animal. Você pode se candidatar de
            novo mais tarde.
          </T>
          <View style={{ flexDirection: 'row', gap: 8, paddingTop: 4 }}>
            <Button label="Cancelar" variant="outline" height={48} fontSize={15} onPress={() => setGiveUp(false)} style={{ flex: 1 }} />
            <Button
              label="Desistir"
              variant="dark"
              height={48}
              fontSize={15}
              style={{ flex: 1 }}
              onPress={() => {
                setGiveUp(false);
                router.navigate('/processos');
              }}
            />
          </View>
        </Dialog>
      )}
    </Screen>
  );
}
