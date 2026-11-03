import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconChevronRight, IconVerified } from '../../components/Icons';
import { BackButton, Footer, Screen } from '../../components/Layout';
import { T } from '../../components/Text';
import { Button, Photo, Tag, Tap, card, lh, textStyles } from '../../components/ui';
import { animalMeta, getAnimal, ongs } from '../../data/animals';
import { colors } from '../../theme/colors';

const PHOTO_COUNT = 4;

/** Tela 02 · Perfil do animal. */
export default function Animal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [photo, setPhoto] = useState(0);
  const animal = getAnimal(id);
  if (!animal) return <Redirect href="/" />;
  const ong = ongs[animal.ongId];

  return (
    <Screen topInset={false}>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Photo style={{ height: 240 + insets.top, paddingTop: insets.top, fontSize: 14 }}>Foto do animal</Photo>
          <View style={{ position: 'absolute', top: 12 + insets.top, left: 12 }}>
            <BackButton fallback="/" floating />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              backgroundColor: colors.ink,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 12,
            }}
          >
            <T style={{ fontSize: 12, fontWeight: '600', color: colors.white }}>
              {photo + 1} / {PHOTO_COUNT}
            </T>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 8, paddingTop: 10, paddingHorizontal: 16 }}>
          {Array.from({ length: PHOTO_COUNT }, (_, i) => (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={`Ver foto ${i + 1}`}
              aria-selected={photo === i}
              onPress={() => setPhoto(i)}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 8,
                borderWidth: 2,
                backgroundColor: colors.photo,
                borderColor: photo === i ? colors.navy : 'transparent',
              }}
            />
          ))}
        </View>

        <View style={{ padding: 16, gap: 18 }}>
          <View style={{ gap: 4 }}>
            <T style={{ fontSize: 26, fontWeight: '700', letterSpacing: -0.26, color: colors.ink }}>{animal.name}</T>
            <T style={{ fontSize: 14, color: colors.muted }}>
              {animalMeta(animal)} · {animal.size} · {animal.weight}
            </T>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
              {animal.personality.map((p) => (
                <Tag key={p} large>
                  {p}
                </Tag>
              ))}
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <T style={textStyles.h2}>Saúde</T>
            <View style={[card, { overflow: 'hidden' }]}>
              {animal.health.map(([k, v], i) => (
                <View
                  key={k}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: colors.divider,
                  }}
                >
                  <T style={{ fontSize: 14, color: colors.muted }}>{k}</T>
                  <T style={{ flex: 1, fontSize: 14, fontWeight: '600', textAlign: 'right', color: colors.ink }}>{v}</T>
                </View>
              ))}
            </View>
            <T style={textStyles.hint}>Ficha preenchida pela ONG responsável.</T>
          </View>

          <View style={{ gap: 6 }}>
            <T style={textStyles.h2}>História</T>
            <T style={{ fontSize: 14, lineHeight: lh(14, 1.5), color: colors.body }}>{animal.story}</T>
          </View>

          <Tap
            href={`/ongs/${ong.id}`}
            label={`Ver perfil da ${ong.name}`}
            style={[card, { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 }]}
          >
            <Photo style={{ width: 48, height: 48, borderRadius: 24, fontSize: 11 }}>Logo</Photo>
            <View style={{ flex: 1, gap: 2 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <T style={{ fontSize: 15, fontWeight: '700', color: colors.ink }}>{ong.name}</T>
                <IconVerified size={16} />
              </View>
              <T style={{ fontSize: 13, color: colors.muted }}>
                ★ {ong.rating} · a {ong.distanceKm} km de você · responde em {ong.responseTime}
              </T>
            </View>
            <IconChevronRight />
          </Tap>
        </View>
      </ScrollView>

      <Footer style={{ gap: 6 }}>
        <Button label="Tenho interesse" href={`/confirmar/${animal.id}`} />
        <T style={{ textAlign: 'center', fontSize: 12, color: colors.muted }}>
          Seu perfil só é enviado depois da sua confirmação.
        </T>
      </Footer>
    </Screen>
  );
}
