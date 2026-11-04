import { useRouter } from 'expo-router';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme/colors';
import { screens } from '../routes';
import type { Area } from '../routes';
import { Dialog } from './Layout';
import { T } from './Text';

const MenuContext = createContext<() => void>(() => {});

/** Abre o menu do protótipo (usado pelo toque longo no logo). */
export const useProtoMenu = () => useContext(MenuContext);

const GROUPS: { area: Area; title: string }[] = [
  { area: 'adotante', title: 'Visão do adotante' },
  { area: 'ong', title: 'Visão da ONG' },
];

/**
 * Menu de apoio ao teste do protótipo: salta direto para qualquer uma das 15 telas
 * e alterna entre a visão do adotante e a da ONG. Abre com toque longo no logo
 * "PetConnect" (catálogo) ou no cabeçalho do painel da ONG.
 */
export function ProtoMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const show = useCallback(() => setOpen(true), []);
  const value = useMemo(() => show, [show]);

  return (
    <MenuContext.Provider value={value}>
      {children}
      {open && (
        <Dialog label="Menu do protótipo" placement="sheet" onClose={() => setOpen(false)}>
          <View style={{ gap: 2 }}>
            <T style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>Menu do protótipo</T>
            <T style={{ fontSize: 13, lineHeight: 19, color: colors.muted }}>
              Abra qualquer tela ou troque de visão. Este menu não faz parte do app final.
            </T>
          </View>
          <ScrollView style={{ maxHeight: 440 }} contentContainerStyle={{ gap: 14 }}>
            {GROUPS.map((g) => (
              <View key={g.area} style={{ gap: 4 }}>
                <T
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    color: colors.muted,
                  }}
                >
                  {g.title}
                </T>
                {screens
                  .filter((s) => s.area === g.area)
                  .map((s) => (
                    <Pressable
                      key={s.n}
                      accessibilityRole="link"
                      accessibilityLabel={`${s.n} ${s.title}`}
                      onPress={() => {
                        setOpen(false);
                        router.navigate(s.to);
                      }}
                      style={({ pressed }) => ({
                        minHeight: 44,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        backgroundColor: pressed ? colors.soft : colors.white,
                      })}
                    >
                      <T style={{ width: 22, fontSize: 12, fontWeight: '700', color: colors.muted }}>{s.n}</T>
                      <T style={{ flex: 1, fontSize: 14, color: colors.ink }}>{s.title}</T>
                    </Pressable>
                  ))}
              </View>
            ))}
          </ScrollView>
          <Pressable
            accessibilityRole="button"
            onPress={() => setOpen(false)}
            style={{ height: 48, alignItems: 'center', justifyContent: 'center' }}
          >
            <T style={{ fontSize: 14, fontWeight: '600', color: colors.muted, textDecorationLine: 'underline' }}>
              Fechar
            </T>
          </Pressable>
        </Dialog>
      )}
    </MenuContext.Provider>
  );
}
