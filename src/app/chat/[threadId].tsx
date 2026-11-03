import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import type { ScrollViewInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSend, IconVerified } from '../../components/Icons';
import { BackButton, Screen } from '../../components/Layout';
import { T } from '../../components/Text';
import { Tap, lh, textStyles } from '../../components/ui';
import { animals, ongs } from '../../data/animals';
import { getThread } from '../../data/chat';
import { sendMessage, useSentMessages } from '../../data/store';
import { colors } from '../../theme/colors';

/** Tela 09 · Chat: conversa aberta. */
export default function Conversa() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const thread = getThread(threadId);
  const extra = useSentMessages(thread?.id);
  const [draft, setDraft] = useState('');
  const [focused, setFocused] = useState(false);
  const listRef = useRef<ScrollViewInstance>(null);

  if (!thread) return <Redirect href="/chat" />;

  const ong = ongs[thread.ongId];
  const pet = animals.find((a) => a.name === thread.pet);
  const messages = [...thread.messages, ...extra];

  const send = (text: string) => sendMessage(thread.id, text);
  const submit = () => {
    if (!draft.trim()) return;
    send(draft);
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
        <BackButton fallback="/chat" onPress={() => (router.canGoBack() ? router.back() : router.replace('/chat'))} />
        <Tap href={`/ongs/${ong.id}`} label={`Ver perfil da ${ong.name}`} style={{ flex: 1, gap: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <T style={{ fontSize: 16, fontWeight: '700', color: colors.ink }} numberOfLines={1}>
              {ong.name}
            </T>
            <IconVerified size={15} />
          </View>
          <T style={textStyles.hint} numberOfLines={1}>
            Sobre {pet?.sex === 'Macho' ? 'o' : 'a'} {thread.pet} · responde em {ong.responseTime}
          </T>
        </Tap>
        <Tap href="/processo" label="Ver processo" style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 10 }}>
          <T style={{ fontSize: 13, fontWeight: '600', color: colors.navy }}>Ver processo</T>
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
          <T style={textStyles.hint}>{thread.dateNote}</T>
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
          {thread.quick.map((q) => (
            <Pressable
              key={q.label}
              accessibilityRole="button"
              onPress={() => send(q.message)}
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
