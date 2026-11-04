import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Conversation } from '../../../components/Conversation';
import { T } from '../../../components/Text';
import { Tap, textStyles } from '../../../components/ui';
import { getOngThread } from '../../../data/chat';
import { markOngThreadRead, ongThreadKey, sendMessage, useSentMessages } from '../../../data/store';
import { colors } from '../../../theme/colors';

/** Tela 15 · Chat da ONG: conversa aberta com um candidato. */
export default function ConversaOng() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const thread = getOngThread(threadId);
  const extra = useSentMessages(thread && ongThreadKey(thread.id));

  useEffect(() => {
    if (thread) markOngThreadRead(thread.id);
  }, [thread]);

  if (!thread) return <Redirect href="/painel/chat" />;

  return (
    <Conversation
      backTo="/painel/chat"
      header={
        <Tap href={`/painel/candidatos/${thread.id}`} label={`Ver triagem de ${thread.who}`} style={{ gap: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <T style={{ fontSize: 16, fontWeight: '700', color: colors.ink }} numberOfLines={1}>
              {thread.who}
            </T>
          </View>
          <T style={textStyles.hint} numberOfLines={1}>
            Quer adotar {thread.pet} · {thread.chip}
          </T>
        </Tap>
      }
      action={{ label: 'Ver triagem', href: `/painel/candidatos/${thread.id}` }}
      dateNote={thread.dateNote}
      messages={[...thread.messages, ...extra]}
      quick={thread.quick}
      onSend={(text) => sendMessage(ongThreadKey(thread.id), text)}
    />
  );
}
