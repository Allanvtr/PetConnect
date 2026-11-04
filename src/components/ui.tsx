import { useRouter } from 'expo-router';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import type { ImageSourcePropType, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { Dialog } from './Layout';
import { IconChevronDown, IconSearch } from './Icons';
import { T } from './Text';

/* ----------------------------------------------------------- Estilos comuns */

/** Cartão com borda fina, usado em quase todas as telas. */
export const card: ViewStyle = { borderWidth: 1, borderColor: colors.line, borderRadius: 12 };

export const textStyles = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: '700', letterSpacing: -0.24, color: colors.ink },
  h2: { fontSize: 16, fontWeight: '700', color: colors.ink },
  lbl: { fontSize: 14, fontWeight: '600', color: colors.ink },
  muted: { fontSize: 13, color: colors.muted },
  hint: { fontSize: 12, color: colors.muted },
});

/** Linha de altura de texto corrido (o CSS usava valores sem unidade). */
export const lh = (size: number, ratio = 1.45) => Math.round(size * ratio);

/* ----------------------------------------------------------------- Botões */

type Variant = 'primary' | 'outline' | 'dark' | 'neutral';

interface ButtonProps {
  label: string;
  variant?: Variant;
  href?: string;
  onPress?: () => void;
  height?: number;
  fontSize?: number;
  leading?: ReactNode;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const buttonLook: Record<Variant, { bg: string; fg: string; border?: string }> = {
  primary: { bg: colors.navy, fg: colors.white },
  outline: { bg: colors.white, fg: colors.navy, border: colors.navy },
  dark: { bg: colors.ink, fg: colors.white },
  neutral: { bg: colors.white, fg: colors.ink, border: colors.muted },
};

export function Button({
  label,
  variant = 'primary',
  href,
  onPress,
  height = 52,
  fontSize = 16,
  leading,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const router = useRouter();
  const look = buttonLook[variant];
  return (
    <Pressable
      accessibilityRole={href ? 'link' : 'button'}
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={() => (href ? router.push(href) : onPress?.())}
      style={({ pressed }) => [
        {
          height,
          minWidth: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          borderRadius: 12,
          backgroundColor: look.bg,
          borderWidth: look.border ? 2 : 0,
          borderColor: look.border,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {leading}
      <T style={{ fontSize, fontWeight: '700', color: look.fg }} numberOfLines={1}>
        {label}
      </T>
    </Pressable>
  );
}

/** Texto clicável (links e ações secundárias), com alvo de toque de 44 px. */
export function LinkText({
  label,
  href,
  onPress,
  size = 14,
  color = colors.navy,
  underline = false,
  style,
}: {
  label: string;
  href?: string;
  onPress?: () => void;
  size?: number;
  color?: string;
  underline?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const router = useRouter();
  return (
    <Pressable
      accessibilityRole={href ? 'link' : 'button'}
      onPress={() => (href ? router.push(href) : onPress?.())}
      style={[{ minHeight: 44, justifyContent: 'center' }, style]}
      hitSlop={4}
    >
      <T
        style={{
          fontSize: size,
          fontWeight: '600',
          color,
          textDecorationLine: underline ? 'underline' : 'none',
        }}
      >
        {label}
      </T>
    </Pressable>
  );
}

/** Botão redondo de 44 px com ícone (chat, editar). */
export function RoundButton({
  children,
  label,
  href,
  onPress,
}: {
  children: ReactNode;
  label: string;
  href?: string;
  onPress?: () => void;
}) {
  const router = useRouter();
  return (
    <Pressable
      accessibilityRole={href ? 'link' : 'button'}
      accessibilityLabel={label}
      onPress={() => (href ? router.push(href) : onPress?.())}
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.lineStrong,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Pressable>
  );
}

/** Toque que leva a outra tela (cartões, linhas de lista). */
export function Tap({
  href,
  onPress,
  label,
  style,
  children,
}: {
  href?: string;
  onPress?: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <Pressable
      accessibilityRole={href ? 'link' : 'button'}
      accessibilityLabel={label}
      onPress={() => (href ? router.push(href) : onPress?.())}
      style={({ pressed }) => [style, pressed && { opacity: 0.85 }]}
    >
      {children}
    </Pressable>
  );
}

/* ------------------------------------------------------ Fotos, selos, tags */

/**
 * Foto do animal ou da ONG. Sem `source`, mostra o bloco cinza rotulado do protótipo
 * de média fidelidade (usado onde ainda não há imagem).
 */
export function Photo({
  children = 'Foto',
  style,
  source,
  alt,
}: {
  children?: ReactNode;
  style?: ViewStyle & { fontSize?: number };
  source?: ImageSourcePropType;
  /** Descrição da imagem para leitores de tela. */
  alt?: string;
}) {
  const { fontSize = 12, ...box } = style ?? {};
  return (
    <View
      style={[
        { backgroundColor: colors.photo, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
        box,
      ]}
    >
      {source ? (
        <Image
          source={source}
          accessible={!!alt}
          accessibilityLabel={alt}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          // Largura e altura explícitas: a imagem local traz o tamanho original como padrão.
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
        />
      ) : children ? (
        <T style={{ fontSize, color: colors.muted }}>{children}</T>
      ) : null}
    </View>
  );
}

export type PillTone = 'soft' | 'solid' | 'muted';

const pillLook: Record<PillTone, { bg: string; fg: string; border: string }> = {
  soft: { bg: colors.tint, fg: colors.navy, border: colors.tint },
  solid: { bg: colors.navy, fg: colors.white, border: colors.navy },
  muted: { bg: colors.white, fg: colors.muted, border: colors.lineStrong },
};

export function Pill({ tone = 'soft', children }: { tone?: PillTone; children: string }) {
  const look = pillLook[tone];
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: look.bg,
        borderColor: look.border,
      }}
    >
      <T style={{ fontSize: 12, fontWeight: '700', color: look.fg }}>{children}</T>
    </View>
  );
}

export function Tag({ children, large = false }: { children: string; large?: boolean }) {
  return (
    <View
      style={{
        paddingVertical: large ? 4 : 2,
        paddingHorizontal: large ? 10 : 8,
        borderRadius: large ? 12 : 10,
        backgroundColor: colors.tint,
      }}
    >
      <T style={{ fontSize: large ? 12 : 11, fontWeight: '600', color: colors.navy }}>{children}</T>
    </View>
  );
}

/* ----------------------------------------------------- Chips e segmentados */

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      aria-selected={selected}
      onPress={onPress}
      style={{
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 22,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? colors.navy : colors.white,
        borderColor: selected ? colors.navy : colors.lineStrong,
      }}
    >
      <T style={{ fontSize: 14, fontWeight: '500', color: selected ? colors.white : colors.ink }}>{label}</T>
    </Pressable>
  );
}

/** Linha de chips com rolagem horizontal que sangra até a borda direita. */
export function ChipRow({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginRight: -16, flexGrow: 0 }}
      contentContainerStyle={{ gap: 8, paddingRight: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

export function Segmented<Id extends string>({
  tabs,
  value,
  onChange,
  tight = false,
}: {
  tabs: { id: Id; label: string }[];
  value: Id;
  onChange: (id: Id) => void;
  tight?: boolean;
}) {
  return (
    <View
      accessibilityRole="tablist"
      style={{ flexDirection: 'row', gap: 4, padding: 4, borderRadius: 12, backgroundColor: colors.soft }}
    >
      {tabs.map((t) => {
        const on = t.id === value;
        return (
          <Pressable
            key={t.id}
            accessibilityRole="tab"
            aria-selected={on}
            onPress={() => onChange(t.id)}
            style={{
              flexGrow: 1,
              flexBasis: 0,
              minWidth: 0,
              minHeight: 40,
              paddingHorizontal: 4,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 9,
              borderWidth: 1,
              borderColor: on ? colors.line : 'transparent',
              backgroundColor: on ? colors.white : 'transparent',
            }}
          >
            <T
              numberOfLines={1}
              adjustsFontSizeToFit={tight}
              style={{
                fontSize: tight ? 13 : 14,
                fontWeight: on ? '700' : '500',
                color: on ? colors.ink : colors.muted,
                textAlign: 'center',
              }}
            >
              {t.label}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ---------------------------------------------------------------- Campos */

interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  /** Altura da caixa (campos de várias linhas passam um valor maior). */
  height?: number;
  paddingX?: number;
  style?: StyleProp<TextStyle>;
}

export function Input({ label, height = 48, paddingX = 14, style, multiline, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      accessibilityLabel={label}
      placeholderTextColor={colors.placeholder}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
      style={[
        {
          width: '100%',
          height,
          paddingHorizontal: paddingX,
          paddingVertical: multiline ? 12 : 0,
          borderWidth: focused ? 2 : 1,
          borderColor: focused ? colors.navy : colors.lineStrong,
          borderRadius: 10,
          backgroundColor: colors.white,
          color: colors.ink,
          fontSize: 15,
          fontFamily: 'Inter_400Regular',
        },
        style,
      ]}
    />
  );
}

/** Rótulo + controle + dica, empilhados. */
export function Field({
  label,
  hint,
  gap = 6,
  style,
  children,
}: {
  label: string;
  hint?: string;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  return (
    <View style={[{ gap }, style]}>
      <T style={textStyles.lbl}>{label}</T>
      {children}
      {hint ? <T style={textStyles.hint}>{hint}</T> : null}
    </View>
  );
}

/** Campo de busca com ícone de lupa. */
export function SearchBox({
  value,
  onChangeText,
  placeholder,
  label,
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  label: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={{
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        borderWidth: focused ? 2 : 1,
        borderColor: focused ? colors.navy : colors.lineStrong,
        borderRadius: 10,
        backgroundColor: colors.soft,
      }}
    >
      <IconSearch />
      <TextInput
        accessibilityLabel={label}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
        autoCorrect={false}
        style={{ flex: 1, minWidth: 0, fontSize: 15, color: colors.ink, fontFamily: 'Inter_400Regular', padding: 0 }}
      />
    </View>
  );
}

/** Lista de escolha em folha inferior, no lugar do <select> da web. */
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Selecione',
  paddingX = 14,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  paddingX?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value || placeholder}`}
        onPress={() => setOpen(true)}
        style={{
          height: 48,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingHorizontal: paddingX,
          borderWidth: 1,
          borderColor: colors.lineStrong,
          borderRadius: 10,
          backgroundColor: colors.white,
        }}
      >
        <T style={{ flex: 1, fontSize: 15, color: value ? colors.ink : colors.placeholder }} numberOfLines={1}>
          {value || placeholder}
        </T>
        <IconChevronDown />
      </Pressable>
      {open && (
        <Dialog label={label} placement="sheet" onClose={() => setOpen(false)}>
          <T style={{ fontSize: 18, fontWeight: '700', color: colors.ink }}>{label}</T>
          <View style={{ gap: 6 }}>
            {options.map((o) => {
              const on = o === value;
              return (
                <Pressable
                  key={o}
                  accessibilityRole="button"
                  aria-selected={on}
                  onPress={() => {
                    onChange(o);
                    setOpen(false);
                  }}
                  style={{
                    minHeight: 48,
                    paddingHorizontal: 14,
                    justifyContent: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: on ? colors.navy : colors.lineStrong,
                    backgroundColor: on ? colors.tint : colors.white,
                  }}
                >
                  <T style={{ fontSize: 14, fontWeight: '500', color: colors.ink }}>{o}</T>
                </Pressable>
              );
            })}
          </View>
        </Dialog>
      )}
    </>
  );
}

/** Barra de progresso em segmentos (cadastro e formulário). */
export function ProgressBars({ filled, total = 2 }: { filled: number; total?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i < filled ? colors.navy : colors.line }}
        />
      ))}
    </View>
  );
}
