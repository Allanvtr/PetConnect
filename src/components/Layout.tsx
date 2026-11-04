import { Stack, useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOngUnreadTotal } from '../data/store';
import { colors } from '../theme/colors';
import { IconBack, IconChat, IconDoc, IconGrid, IconHome, IconPaw, IconPeople, IconUser } from './Icons';
import { T } from './Text';

/* ------------------------------------------------------------------ Tela */

interface ScreenProps {
  children: ReactNode;
  /** Aplica a área segura do topo. Desligue quando a tela começa com uma imagem de ponta a ponta. */
  topInset?: boolean;
  /** Sobe o conteúdo quando o teclado abre (telas com campos de texto). */
  keyboard?: boolean;
  /** Tela raiz de uma aba: sem animação de entrada e sem gesto de voltar. */
  tab?: boolean;
}

export function Screen({ children, topInset = true, keyboard = false, tab = false }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const body = (
    <View style={[styles.screen, { paddingTop: topInset ? insets.top : 0 }]}>
      {tab && <Stack.Screen options={{ animation: 'none', gestureEnabled: false }} />}
      {children}
    </View>
  );
  if (!keyboard) return body;
  return (
    <KeyboardAvoidingView style={styles.flex} behavior="padding">
      {body}
    </KeyboardAvoidingView>
  );
}

/* ----------------------------------------------------------- Barra superior */

/** Volta à tela anterior; se a tela foi aberta direto, vai para `fallback`. */
export function BackButton({
  fallback = '/',
  onPress,
  floating = false,
}: {
  fallback?: string;
  onPress?: () => void;
  floating?: boolean;
}) {
  const router = useRouter();
  const handle = () => {
    if (onPress) return onPress();
    if (router.canGoBack()) router.back();
    else router.replace(fallback);
  };
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Voltar"
      onPress={handle}
      style={[styles.iconBtn, floating && styles.floatingBack]}
    >
      <IconBack />
    </Pressable>
  );
}

interface TopBarProps {
  title: string;
  fallback?: string;
  bordered?: boolean;
  children?: ReactNode;
}

export function TopBar({ title, fallback, bordered = true, children }: TopBarProps) {
  return (
    <View style={[styles.topbar, bordered && styles.topbarBordered]}>
      <BackButton fallback={fallback} />
      <T style={styles.topbarTitle} accessibilityRole="header">
        {title}
      </T>
      {children}
    </View>
  );
}

/* ------------------------------------------------------------------ Rodapé */

export function Footer({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const insets = useSafeAreaInsets();
  return <View style={[styles.footer, { paddingBottom: Math.max(16, insets.bottom) }, style]}>{children}</View>;
}

/* ------------------------------------------------------ Navegação inferior */

type NavItem = { key: string; to: string; label: string; icon: typeof IconHome };

const adopterTabs: NavItem[] = [
  { key: 'inicio', to: '/', label: 'Início', icon: IconHome },
  { key: 'processos', to: '/processos', label: 'Processos', icon: IconDoc },
  { key: 'chat', to: '/chat', label: 'Chat', icon: IconChat },
  { key: 'perfil', to: '/formulario', label: 'Perfil', icon: IconUser },
];

const ongTabs: NavItem[] = [
  { key: 'painel', to: '/painel', label: 'Painel', icon: IconGrid },
  { key: 'animais', to: '/painel/animais', label: 'Animais', icon: IconPaw },
  { key: 'candidatos', to: '/painel/candidatos', label: 'Candidatos', icon: IconPeople },
  { key: 'chat', to: '/painel/chat', label: 'Chat', icon: IconChat },
];

export function BottomNav({ variant, active }: { variant: 'adotante' | 'ong'; active: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabs = variant === 'ong' ? ongTabs : adopterTabs;
  const unread = useOngUnreadTotal();
  return (
    <View style={[styles.nav, { paddingBottom: Math.max(11, insets.bottom) }]} accessibilityRole="tablist">
      {tabs.map((t) => {
        const on = t.key === active;
        const Icon = t.icon;
        return (
          <Pressable
            key={t.key}
            accessibilityRole="tab"
            accessibilityLabel={t.label}
            aria-selected={on}
            onPress={() => {
              if (!on) router.navigate(t.to);
            }}
            style={styles.navItem}
          >
            <View>
              <Icon color={on ? colors.navy : colors.muted} />
              {variant === 'ong' && t.key === 'chat' && unread > 0 && (
                <View accessible accessibilityLabel={`${unread} mensagens não lidas`} style={styles.badge}>
                  <T style={styles.badgeText}>{unread}</T>
                </View>
              )}
            </View>
            <T style={[styles.navLabel, { color: on ? colors.navy : colors.muted, fontWeight: on ? '700' : '500' }]}>
              {t.label}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ------------------------------------------------------------------ Diálogo */

/** Janela de confirmação sobre a tela (centro ou folha inferior). */
export function Dialog({
  label,
  placement = 'center',
  onClose,
  children,
}: {
  label: string;
  placement?: 'center' | 'sheet';
  onClose: () => void;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const sheet = placement === 'sheet';
  return (
    <Modal
      transparent
      visible
      animationType={sheet ? 'slide' : 'fade'}
      onRequestClose={onClose}
      statusBarTranslucent
      navigationBarTranslucent
      supportedOrientations={['portrait']}
    >
      <View style={[styles.overlay, sheet ? styles.overlaySheet : styles.overlayCenter]}>
        <View
          accessibilityViewIsModal
          accessibilityLabel={label}
          style={[
            styles.dialog,
            sheet
              ? [styles.dialogSheet, { paddingBottom: Math.max(20, insets.bottom + 8) }]
              : styles.dialogCenter,
            Platform.OS === 'web' && { maxWidth: 420 },
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: colors.white },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  floatingBack: {
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  topbar: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
  topbarBordered: { borderBottomWidth: 1, borderBottomColor: colors.line },
  topbarTitle: { fontSize: 17, fontWeight: '700', color: colors.ink },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.white,
  },
  nav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.white,
  },
  navItem: { flex: 1, alignItems: 'center', gap: 3, paddingTop: 9, minHeight: 56 },
  navLabel: { fontSize: 11 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.white,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: colors.white },
  overlay: { flex: 1, backgroundColor: colors.overlay },
  overlayCenter: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  overlaySheet: { justifyContent: 'flex-end' },
  dialog: { width: '100%', gap: 12, backgroundColor: colors.white },
  dialogCenter: { padding: 20, borderRadius: 16 },
  dialogSheet: { paddingTop: 20, paddingHorizontal: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
});
