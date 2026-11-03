import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { IconPin, IconVerified } from '../components/Icons';
import { BottomNav, Screen } from '../components/Layout';
import { useProtoMenu } from '../components/ProtoMenu';
import { T } from '../components/Text';
import { Chip, ChipRow, LinkText, Photo, SearchBox, Tag, Tap, card } from '../components/ui';
import { animalMeta, animals, ongs } from '../data/animals';
import { colors } from '../theme/colors';

const CHIPS = [
  { id: 'caes', label: 'Cães' },
  { id: 'gatos', label: 'Gatos' },
  { id: 'macho', label: 'Macho' },
  { id: 'femea', label: 'Fêmea' },
  { id: 'filtros', label: 'Mais filtros' },
];

/** Tela 01 · Catálogo de animais. */
export default function Catalogo() {
  const [sel, setSel] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState('');
  const openMenu = useProtoMenu();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 12) / 2;

  const filterActive = query.trim() !== '' || !!(sel.caes || sel.gatos || sel.macho || sel.femea);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return animals.filter((a) => {
      if (sel.caes && !sel.gatos && a.species !== 'Cão') return false;
      if (sel.gatos && !sel.caes && a.species !== 'Gato') return false;
      if (sel.macho && !sel.femea && a.sex !== 'Macho') return false;
      if (sel.femea && !sel.macho && a.sex !== 'Fêmea') return false;
      if (q && !`${a.name} ${a.species} ${ongs[a.ongId].name}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [sel, query]);

  // Sem filtro, o cabeçalho mostra o total simulado (24); com filtro, os resultados da amostra.
  const count = filterActive ? visible.length : 24;

  return (
    <Screen tab keyboard>
      <View style={{ paddingTop: 16, paddingHorizontal: 16, paddingBottom: 8, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onLongPress={openMenu} delayLongPress={600} accessibilityRole="header" accessibilityHint="Toque longo abre o menu do protótipo">
            <T style={{ fontSize: 20, fontWeight: '700', letterSpacing: -0.2, color: colors.navy }}>PetConnect</T>
          </Pressable>
          <LinkText label="Criar conta" href="/cadastro" style={{ paddingHorizontal: 4 }} />
        </View>

        <SearchBox
          label="Buscar animais"
          placeholder="Buscar por nome, raça ou ONG"
          value={query}
          onChangeText={setQuery}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <IconPin />
            <T style={{ fontSize: 14, fontWeight: '500', color: colors.ink }}>São Carlos, SP · até 10 km</T>
          </View>
          <LinkText label="Alterar" />
        </View>

        <ChipRow>
          {CHIPS.map((c) => (
            <Chip
              key={c.id}
              label={c.label}
              selected={!!sel[c.id]}
              onPress={() => setSel({ ...sel, [c.id]: !sel[c.id] })}
            />
          ))}
        </ChipRow>
      </View>

      <View
        style={{
          paddingTop: 4,
          paddingHorizontal: 16,
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <T style={{ fontSize: 14, color: colors.muted }}>
          <T style={{ fontWeight: '700', color: colors.ink }}>
            {count} {count === 1 ? 'animal' : 'animais'}
          </T>{' '}
          perto de você
        </T>
        <T style={{ fontSize: 13, color: colors.muted }}>Mais próximos ▾</T>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {visible.map((a) => {
          const ong = ongs[a.ongId];
          return (
            <Tap
              key={a.id}
              href={`/animal/${a.id}`}
              label={`${a.name}, ${animalMeta(a)}, ${ong.name}`}
              style={[card, { width: cardWidth, overflow: 'hidden', backgroundColor: colors.white }]}
            >
              <Photo style={{ height: 120, fontSize: 13 }} />
              <View style={{ padding: 10, gap: 6 }}>
                <T style={{ fontSize: 16, fontWeight: '700', color: colors.ink }}>{a.name}</T>
                <T style={{ fontSize: 13, color: colors.muted }}>{animalMeta(a)}</T>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                  <Tag>{a.tags[0]}</Tag>
                  <Tag>{a.tags[1]}</Tag>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <IconVerified />
                  <T style={{ flex: 1, fontSize: 12, color: colors.muted }} numberOfLines={1}>
                    {ong.name} · {ong.distanceKm} km
                  </T>
                </View>
              </View>
            </Tap>
          );
        })}
        {visible.length === 0 && (
          <T style={{ width: '100%', paddingVertical: 24, paddingHorizontal: 8, textAlign: 'center', fontSize: 14, color: colors.muted }}>
            Nenhum animal encontrado com esses filtros.
          </T>
        )}
      </ScrollView>

      <BottomNav variant="adotante" active="inicio" />
    </Screen>
  );
}
