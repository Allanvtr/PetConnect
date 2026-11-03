import { useRouter } from 'expo-router';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Choice } from '../components/Controls';
import { Footer, Screen, TopBar } from '../components/Layout';
import { T } from '../components/Text';
import { Button, Field, Input, Select, ProgressBars, card, lh } from '../components/ui';
import { colors } from '../theme/colors';

const TITLES = ['Moradia', 'Rotina', 'Convivência'];

function Section({
  index,
  open,
  onOpen,
  children,
}: {
  index: number;
  open: number;
  onOpen: () => void;
  children: ReactNode;
}) {
  const done = index < open;
  const isOpen = index === open;
  const status = done ? 'Concluído' : isOpen ? 'Em andamento' : 'Pendente';
  return (
    <View style={[card, { overflow: 'hidden' }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${TITLES[index]}, ${status}`}
        aria-expanded={isOpen}
        onPress={onOpen}
        style={{ minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, backgroundColor: colors.white }}
      >
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 2,
            borderColor: colors.navy,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: done ? colors.navy : colors.white,
          }}
        >
          <T style={{ fontSize: 13, fontWeight: '700', color: done ? colors.white : colors.navy }}>
            {done ? '✓' : index + 1}
          </T>
        </View>
        <T style={{ flex: 1, fontSize: 16, fontWeight: '700', color: colors.ink }}>{TITLES[index]}</T>
        <T style={{ fontSize: 12, color: colors.muted }}>{status}</T>
      </Pressable>
      {isOpen && <View style={{ paddingTop: 4, paddingHorizontal: 14, paddingBottom: 16, gap: 16 }}>{children}</View>}
    </View>
  );
}

/** Tela 05 · Formulário Universal (perfil de adoção). */
export default function Formulario() {
  const router = useRouter();
  const [open, setOpen] = useState(0);
  const [ans, setAns] = useState<Record<string, string>>({});
  const set = (id: string) => (v: string) => setAns({ ...ans, [id]: v });

  return (
    <Screen keyboard>
      <TopBar title="Perfil de adoção" fallback="/cadastro" bordered={false}>
        <View style={{ flex: 1 }} />
        <T style={{ fontSize: 12, color: colors.muted, paddingRight: 8 }}>Salvo automaticamente</T>
      </TopBar>

      <View style={{ paddingHorizontal: 16, paddingBottom: 8, gap: 8 }}>
        <ProgressBars filled={2} />
        <T style={{ fontSize: 13, color: colors.muted }}>Passo 2 de 2 · {open} de 3 etapas concluídas</T>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 8, paddingHorizontal: 16, paddingBottom: 16, gap: 12 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, backgroundColor: colors.tint }}>
          <T style={{ fontSize: 13, lineHeight: lh(13), color: colors.ink }}>
            <T style={{ fontWeight: '700', color: colors.navy }}>Preencha uma única vez.</T> Este perfil vale para
            todas as ONGs parceiras, sem recomeçar a cada candidatura.
          </T>
        </View>

        <Section index={0} open={open} onOpen={() => setOpen(0)}>
          <Choice question="Tipo de moradia" options={['Casa', 'Apartamento']} value={ans.tipo} onChange={set('tipo')} />
          <Choice question="Tem quintal ou área externa?" options={['Sim', 'Não']} value={ans.quintal} onChange={set('quintal')} />
          <Choice question="O imóvel é" options={['Próprio', 'Alugado']} value={ans.imovel} onChange={set('imovel')} />
        </Section>

        <Section index={1} open={open} onOpen={() => setOpen(1)}>
          <Field label="Ocupação" gap={8}>
            <Select
              label="Ocupação"
              options={['Trabalho presencial', 'Home office', 'Híbrido', 'Estudante']}
              value={ans.ocupacao ?? ''}
              onChange={set('ocupacao')}
            />
          </Field>
          <Field label="Quanto tempo o animal ficaria sozinho por dia?" gap={8}>
            <Select
              label="Tempo sozinho por dia"
              options={['Até 4 horas', 'De 4 a 8 horas', 'Mais de 8 horas']}
              value={ans.sozinho ?? ''}
              onChange={set('sozinho')}
            />
          </Field>
          <Field label="Quem cuidará do dia a dia do animal?" gap={8}>
            <Input label="Quem cuidará do dia a dia do animal?" placeholder="Ex.: eu e minha mãe" />
          </Field>
        </Section>

        <Section index={2} open={open} onOpen={() => setOpen(2)}>
          <Choice question="Possui outros animais?" options={['Sim', 'Não']} value={ans.outros} onChange={set('outros')} />
          <Choice question="Mora com crianças?" options={['Sim', 'Não']} value={ans.criancas} onChange={set('criancas')} />
          <Choice
            question="Todos na casa concordam com a adoção?"
            options={['Sim', 'Não']}
            value={ans.acordo}
            onChange={set('acordo')}
          />
          <Field label="Observações (opcional)" gap={8}>
            <Input label="Observações" placeholder="Algo mais que a ONG deva saber" multiline height={72} />
          </Field>
        </Section>
      </ScrollView>

      <Footer style={{ gap: 8 }}>
        {open < 2 ? (
          <Button label="Continuar" onPress={() => setOpen(Math.min(2, open + 1))} />
        ) : (
          <Button label="Salvar perfil e ver animais" onPress={() => router.navigate('/')} />
        )}
      </Footer>
    </Screen>
  );
}
