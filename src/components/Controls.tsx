import { Pressable, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { IconCheck } from './Icons';
import { T } from './Text';

/** Caixa de marcação de 22 px (sem o alvo de toque). */
export function CheckBoxMark({ checked }: { checked: boolean }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.navy,
        backgroundColor: checked ? colors.navy : colors.white,
      }}
    >
      {checked && <IconCheck />}
    </View>
  );
}

/** Caixa de seleção (22 px) dentro de um alvo de toque de 44 px. */
export function CheckBox({
  checked,
  onChange,
  label,
  style,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      aria-checked={checked}
      onPress={onChange}
      style={[{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }, style]}
    >
      <CheckBoxMark checked={checked} />
    </Pressable>
  );
}

/** Linha com caixa de seleção e texto, tocável por inteiro. */
export function CheckRow({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      aria-checked={checked}
      onPress={onChange}
      style={{ minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 12 }}
    >
      <CheckBoxMark checked={checked} />
      <T style={{ fontSize: 15, color: colors.ink }}>{label}</T>
    </Pressable>
  );
}

/** Interruptor. Quando `locked`, mostra o estado mas não permite alterar. */
export function Switch({
  on,
  label,
  locked = false,
  onToggle,
}: {
  on: boolean;
  label: string;
  locked?: boolean;
  onToggle?: () => void;
}) {
  const bg = on ? (locked ? '#8FA3BD' : colors.navy) : colors.white;
  const bd = on ? (locked ? '#8FA3BD' : colors.navy) : colors.placeholder;
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      aria-checked={on}
      aria-disabled={locked}
      onPress={() => {
        if (!locked) onToggle?.();
      }}
      style={{ width: 52, height: 44, alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        style={{
          width: 44,
          height: 26,
          padding: 3,
          flexDirection: 'row',
          justifyContent: on ? 'flex-end' : 'flex-start',
          alignItems: 'center',
          borderRadius: 13,
          borderWidth: 2,
          backgroundColor: bg,
          borderColor: bd,
        }}
      >
        <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: on ? colors.white : colors.placeholder }} />
      </View>
    </Pressable>
  );
}

/** Botão de opção (Sim / Não, Fêmea / Macho). */
export function Option({
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
        flex: 1,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: selected ? colors.navy : colors.white,
        borderColor: selected ? colors.navy : colors.lineStrong,
      }}
    >
      <T style={{ fontSize: 14, fontWeight: '600', color: selected ? colors.white : colors.ink }}>{label}</T>
    </Pressable>
  );
}

/** Pergunta com duas opções lado a lado (ex.: Sim / Não). */
export function Choice({
  question,
  options,
  value,
  onChange,
}: {
  question: string;
  options: [string, string];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <View style={{ gap: 8 }}>
      <T style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>{question}</T>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {options.map((o) => (
          <Option key={o} label={o} selected={value === o} onPress={() => onChange(o)} />
        ))}
      </View>
    </View>
  );
}
