import { createContext, useContext } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import type { TextProps } from 'react-native';

/** Famílias da Inter carregadas em `app/_layout.tsx`, por peso. */
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

function familyFor(weight: unknown): string {
  switch (String(weight)) {
    case '500':
      return fonts.medium;
    case '600':
      return fonts.semibold;
    case '700':
    case '800':
    case '900':
    case 'bold':
      return fonts.bold;
    default:
      return fonts.regular;
  }
}

// Texto aninhado herda a família do pai, a menos que declare o próprio peso.
const NestedText = createContext(false);

/**
 * Texto do app. No React Native o peso da fonte não escolhe a variante de uma
 * fonte personalizada, então `fontWeight` é convertido na família Inter certa.
 * Assim os estilos podem usar `fontWeight: '700'` como no CSS do protótipo.
 */
export function T({ style, children, ...rest }: TextProps) {
  const nested = useContext(NestedText);
  const flat = StyleSheet.flatten(style) ?? {};
  const { fontWeight, ...other } = flat;
  const family = fontWeight !== undefined ? familyFor(fontWeight) : nested ? undefined : fonts.regular;

  return (
    <NestedText.Provider value>
      <RNText
        maxFontSizeMultiplier={1.3}
        {...rest}
        style={family ? [other, { fontFamily: family }] : other}
      >
        {children}
      </RNText>
    </NestedText.Provider>
  );
}
