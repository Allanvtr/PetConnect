import * as Clipboard from 'expo-clipboard';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import { IconCheck, IconCopy, IconPhone, IconPinSolid, IconVerified } from '../../components/Icons';
import { Footer, Screen, TopBar } from '../../components/Layout';
import { T } from '../../components/Text';
import { Button, Photo, card, lh, textStyles } from '../../components/ui';
import { ongs } from '../../data/animals';
import { ongLogos } from '../../data/images';
import { colors } from '../../theme/colors';

const iconBtn = { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' } as const;

/** Tela 03 · Perfil da ONG. */
export default function Ong() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const ong = id ? ongs[id] : undefined;

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  if (!ong) return <Redirect href="/" />;

  const copyAddress = async () => {
    try {
      await Clipboard.setStringAsync(ong.address);
    } catch {
      /* sem acesso à área de transferência: o feedback visual continua */
    }
    setCopied(true);
  };

  const call = () => {
    Linking.openURL(`tel:${ong.phone.replace(/\D/g, '')}`).catch(() => {});
  };

  const stats: [string, string][] = [
    [`★ ${ong.rating}`, `${ong.reviewsCount} avaliações`],
    [ong.responseTime, 'tempo de resposta'],
    [String(ong.adoptions), 'adoções concluídas'],
  ];

  return (
    <Screen>
      <TopBar title="Sobre a ONG" fallback="/" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, gap: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Photo source={ongLogos[ong.id]} alt={`Logo da ${ong.name}`} style={{ width: 64, height: 64, borderRadius: 32 }}>
            Logo
          </Photo>
          <View style={{ flex: 1, gap: 6 }}>
            <T style={{ fontSize: 22, fontWeight: '700', letterSpacing: -0.22, color: colors.ink }}>{ong.name}</T>
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingVertical: 4,
                paddingLeft: 8,
                paddingRight: 10,
                borderRadius: 14,
                backgroundColor: colors.tint,
              }}
            >
              <IconVerified size={16} label="" />
              <T style={{ fontSize: 12, fontWeight: '700', color: colors.navy }}>ONG verificada</T>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          {stats.map(([big, small]) => (
            <View key={small} style={[card, { flex: 1, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center' }]}>
              <T style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>{big}</T>
              <T style={{ fontSize: 11, color: colors.muted, textAlign: 'center' }}>{small}</T>
            </View>
          ))}
        </View>

        <View style={{ gap: 8 }}>
          <T style={textStyles.h2}>Dados validados</T>
          <View style={[card, { overflow: 'hidden' }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
                paddingVertical: 12,
                paddingHorizontal: 14,
              }}
            >
              <T style={{ fontSize: 14, color: colors.muted }}>CNPJ</T>
              <T style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>{ong.cnpj}</T>
            </View>
            <View style={contactRow}>
              <T style={{ flex: 1, fontSize: 14, fontWeight: '500', color: colors.ink }}>{ong.address}</T>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={copied ? 'Endereço copiado' : 'Copiar endereço'}
                onPress={copyAddress}
                style={iconBtn}
              >
                {copied ? <IconCheck size={20} color={colors.navy} /> : <IconCopy />}
              </Pressable>
            </View>
            <View style={contactRow}>
              <T style={{ flex: 1, fontSize: 14, fontWeight: '500', color: colors.ink }}>{ong.phone}</T>
              <Pressable accessibilityRole="button" accessibilityLabel="Ligar para a ONG" onPress={call} style={iconBtn}>
                <IconPhone />
              </Pressable>
            </View>
          </View>
          <T style={textStyles.hint}>
            Dados jurídicos conferidos pela equipe PetConnect em {ong.validatedAt}.
          </T>
        </View>

        <View style={{ gap: 8 }}>
          <T style={textStyles.h2}>Localização</T>
          <View
            style={{
              height: 140,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.line,
              backgroundColor: colors.photo,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconPinSolid />
            <View
              style={{
                position: 'absolute',
                left: 10,
                bottom: 10,
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.line,
                backgroundColor: colors.white,
              }}
            >
              <T style={{ fontSize: 12, fontWeight: '600', color: colors.ink }}>Mapa · a {ong.distanceKm} km de você</T>
            </View>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
            <T style={textStyles.h2}>Avaliações de adotantes</T>
            <T style={textStyles.hint}>Só de adoções concluídas</T>
          </View>
          {ong.reviews.map((r) => (
            <View key={r.who} style={[card, { paddingVertical: 12, paddingHorizontal: 14, gap: 4 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T style={{ fontSize: 13, fontWeight: '700', color: colors.ink }}>{r.who}</T>
                <T style={{ fontSize: 13, color: colors.muted }}>{r.stars}</T>
              </View>
              <T style={{ fontSize: 14, lineHeight: lh(14), color: colors.body }}>{r.text}</T>
            </View>
          ))}
        </View>
      </ScrollView>

      <Footer>
        <Button label={`Ver os ${ong.animalsCount} animais desta ONG`} variant="outline" href="/" />
      </Footer>
    </Screen>
  );
}

const contactRow = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  paddingVertical: 6,
  paddingLeft: 14,
  paddingRight: 6,
  borderTopWidth: 1,
  borderTopColor: colors.divider,
} as const;
