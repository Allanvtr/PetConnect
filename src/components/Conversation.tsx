import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import type { ScrollViewInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Message, QuickReply } from '../data/chat';
import { colors } from '../theme/colors';
import { IconSend } from './Icons';
import { BackButton, Screen } from './Layout';
import { T } from './Text';
import { Tap, lh, textStyles } from './ui';

/**
 * Conversa aberta, usada pelo adotante (com a ONG) e pela ONG (com o candidato).
 * `me` é sempre quem está usando o app: as mensagens dele ficam à direita.
 */
export function Conversation({
  backTo,
  header,
  action,
  dateNote,
  messages,
  quick,
  onSend,
}: {
  /** Para onde voltar quando a conversa foi aberta direto (sem tela anterior). */
  backTo: string;
  /** Área central da barra superior: nome e subtítulo. */
  header: ReactNode;
  /** Atalho à direita da barra superior (ex.: "Ver processo"). */
  action: { label: string; href: string };
  dateNote: string;
  messages: Message[];
  quick: QuickReply[];
  onSend: (text: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState('');
  const [focused, setFocused] = useState(false);
  const listRef = useRef<ScrollViewInstance>(null);

  const submit = () => {
    if (!draft.trim()) return;
    onSend(draft);
    setDraft('');
  };

  return (
    <Screen keyboard>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          padding: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.line,
        }}
      >
        <BackButton fallback={backTo} />
        <View style={{ flex: 1, minWidth: 0 }}>{header}</View>
        <Tap href={action.href} label={action.label} style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 10 }}>
          <T style={{ fontSize: 13, fontWeight: '600', color: colors.navy }}>{action.label}</T>
        </Tap>
      </View>

      <ScrollView
        ref={listRef}
        style={{ flex: 1, backgroundColor: colors.soft }}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      >
        <View style={{ alignSelf: 'center', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10, backgroundColor: colors.photo }}>
          <T style={textStyles.hint}>{dateNote}</T>
        </View>
        {messages.map((m, i) => {
          const me = m.from === 'me';
          return (
            <View
              key={i}
              style={{
                maxWidth: '80%',
                alignSelf: me ? 'flex-end' : 'flex-start',
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: me ? colors.navy : colors.line,
                backgroundColor: me ? colors.navy : colors.white,
              }}
            >
              <T style={{ fontSize: 14, lineHeight: lh(14), color: me ? colors.white : colors.ink }}>{m.text}</T>
            </View>
          );
        })}
      </ScrollView>

      <View style={{ paddingTop: 10, paddingHorizontal: 16, gap: 8, borderTopWidth: 1, borderTopColor: colors.line }}>
        <T style={textStyles.hint}>Respostas rápidas</T>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginRight: -16, flexGrow: 0 }}
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          {quick.map((q) => (
            <Pressable
              key={q.label}
              accessibilityRole="button"
              onPress={() => onSend(q.message)}
              style={{
                height: 44,
                paddingHorizontal: 14,
                borderRadius: 22,
                borderWidth: 1,
                borderColor: colors.navy,
                backgroundColor: colors.white,
                justifyContent: 'center',
              }}
            >
              <T style={{ fontSize: 14, fontWeight: '600', color: colors.navy }}>{q.label}</T>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingTop: 10,
          paddingHorizontal: 16,
          paddingBottom: Math.max(16, insets.bottom),
        }}
      >
        <View
          style={{
            flex: 1,
            height: 48,
            justifyContent: 'center',
            paddingHorizontal: 14,
            borderWidth: focused ? 2 : 1,
            borderColor: focused ? colors.navy : colors.lineStrong,
            borderRadius: 24,
          }}
        >
          <TextInput
            accessibilityLabel="Mensagem"
            placeholder="Escreva uma mensagem"
            placeholderTextColor={colors.placeholder}
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={submit}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            returnKeyType="send"
            submitBehavior="submit"
            style={{ fontSize: 15, color: colors.ink, fontFamily: 'Inter_400Regular', padding: 0 }}
          />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Enviar"
          onPress={submit}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.navy,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconSend />
        </Pressable>
      </View>
    </Screen>
  );
}
