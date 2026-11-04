import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Switch } from '../../components/Controls';
import { IconCheck, IconCheckCircle } from '../../components/Icons';
import { Footer, Screen, TopBar } from '../../components/Layout';
import { T } from '../../components/Text';
import { Button, Field, Input, LinkText, Photo, card, lh, textStyles } from '../../components/ui';
import { animalMeta, getAnimal, ongs } from '../../data/animals';
import { petPhoto, usePhotosRevision } from '../../data/images';
import { colors } from '../../theme/colors';

const STEPS = [
  'A ONG analisa seu perfil, em até 2 dias úteis.',
  'Você recebe a resposta aqui e no chat.',
  'Se avançar, vocês combinam uma visita pelo chat.',
];

/** Tela 06 · Confirmar interesse (e estado de sucesso). */
export default function Confirmar() {
  usePhotosRevision(); // atualiza quando a ONG troca as fotos
  const { id } = useLocalSearchParams<{ id: string }>();
  const [sent, setSent] = useState(false);
  const [shareCity, setShareCity] = useState(true);
  const animal = getAnimal(id);
  if (!animal) return <Redirect href="/" />;
  const ong = ongs[animal.ongId];

  const shares = [
    { label: 'Nome e foto', note: 'Obrigatório para a análise', on: true, locked: true, toggle: undefined },
    {
      label: 'Bairro e cidade',
      note: 'Ajuda a ONG a avaliar a distância',
      on: shareCity,
      locked: false,
      toggle: () => setShareCity(!shareCity),
    },
    { label: 'Respostas do formulário', note: 'Obrigatório para a análise', on: true, locked: true, toggle: undefined },
    { label: 'Telefone e endereço completo', note: 'Liberado só após confirmação mútua', on: false, locked: true, toggle: undefined },
  ];

  if (sent) {
    return (
      <Screen>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 48, paddingHorizontal: 16, paddingBottom: 16, alignItems: 'center', gap: 20 }}
        >
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: colors.tint,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconCheck size={44} stroke={2.2} color={colors.navy} />
          </View>
          <View style={{ gap: 8, alignItems: 'center' }}>
            <T style={[textStyles.h1, { textAlign: 'center' }]} accessibilityRole="header">
              Interesse enviado!
            </T>
            <T style={{ fontSize: 15, lineHeight: lh(15), textAlign: 'center', color: colors.muted }}>
              {ong.article} {ong.name} {ong.article === 'As' ? 'receberam' : 'recebeu'} seu perfil para análise. Você
              será avisado por aqui e pelo chat.
            </T>
          </View>
          <View style={[card, { alignSelf: 'stretch', padding: 14, gap: 12 }]}>
            <T style={{ fontSize: 14, fontWeight: '700', color: colors.ink }}>Próximos passos</T>
            {STEPS.map((t, i) => (
              <View key={t} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: colors.tint,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <T style={{ fontSize: 12, fontWeight: '700', color: colors.navy }}>{i + 1}</T>
                </View>
                <T style={{ flex: 1, fontSize: 14, lineHeight: lh(14, 1.4), color: colors.ink }}>{t}</T>
              </View>
            ))}
          </View>
        </ScrollView>
        <Footer style={{ gap: 8 }}>
          <Button label="Acompanhar processo" href="/processos" />
          <Button label="Continuar explorando" variant="outline" height={48} fontSize={15} href="/" />
        </Footer>
      </Screen>
    );
  }

  return (
    <Screen keyboard>
      <TopBar title="Confirmar interesse" fallback={`/animal/${animal.id}`} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 18 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[card, { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 }]}>
          <Photo source={petPhoto(animal.id)} alt={`Ilustração de ${animal.name}`} style={{ width: 64, height: 64, borderRadius: 10 }} />
          <View style={{ flex: 1, gap: 3 }}>
            <T style={{ fontSize: 17, fontWeight: '700', color: colors.ink }}>{animal.name}</T>
            <T style={textStyles.muted}>{animalMeta(animal)}</T>
            <T style={textStyles.muted}>{ong.name} · verificada</T>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <T style={textStyles.h2}>Seu perfil</T>
          <View style={[card, { overflow: 'hidden' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 14 }}>
              <IconCheckCircle />
              <T style={{ flex: 1, fontSize: 14, fontWeight: '600', color: colors.ink }}>Cadastro</T>
              <T style={{ fontSize: 14, color: colors.muted }}>Completo</T>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingVertical: 2,
                paddingHorizontal: 14,
                borderTopWidth: 1,
                borderTopColor: colors.divider,
              }}
            >
              <IconCheckCircle />
              <T style={{ flex: 1, fontSize: 14, fontWeight: '600', color: colors.ink }}>Formulário Universal</T>
              <LinkText label="Revisar" href="/formulario" />
            </View>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <T style={textStyles.h2}>O que a ONG poderá ver</T>
          <View style={[card, { overflow: 'hidden' }]}>
            {shares.map((s, i) => (
              <View
                key={s.label}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: colors.divider,
                }}
              >
                <View style={{ flex: 1, gap: 2 }}>
                  <T style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>{s.label}</T>
                  <T style={textStyles.hint}>{s.note}</T>
                </View>
                <Switch on={s.on} label={s.label} locked={s.locked} onToggle={s.toggle} />
              </View>
            ))}
          </View>
        </View>

        <Field label="Mensagem para a ONG (opcional)" gap={8}>
          <Input
            label="Mensagem para a ONG"
            multiline
            height={76}
            placeholder={`Conte por que você quer adotar ${animal.sex === 'Fêmea' ? 'a' : 'o'} ${animal.name}`}
          />
        </Field>
      </ScrollView>

      <Footer style={{ gap: 6 }}>
        <Button label="Confirmar interesse" onPress={() => setSent(true)} />
        <T style={{ textAlign: 'center', fontSize: 12, color: colors.muted }}>
          Você pode retirar o interesse a qualquer momento.
        </T>
      </Footer>
    </Screen>
  );
}
