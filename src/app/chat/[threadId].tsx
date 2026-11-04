import { Redirect, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Conversation } from '../../components/Conversation';
import { IconVerified } from '../../components/Icons';
import { T } from '../../components/Text';
import { Tap, textStyles } from '../../components/ui';
import { animals, ongs } from '../../data/animals';
import { getThread } from '../../data/chat';
import { sendMessage, useSentMessages } from '../../data/store';
import { colors } from '../../theme/colors';

/** Tela 09 · Chat: conversa aberta (visão do adotante). */
export default function Conversa() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const thread = getThread(threadId);
  const extra = useSentMessages(thread?.id);

  if (!thread) return <Redirect href="/chat" />;

  const ong = ongs[thread.ongId];
  const pet = animals.find((a) => a.name === thread.pet);

  return (
    <Conversation
      backTo="/chat"
      header={
        <Tap href={`/ongs/${ong.id}`} label={`Ver perfil da ${ong.name}`} style={{ gap: 1 }}>
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
      }
      action={{ label: 'Ver processo', href: '/processo' }}
      dateNote={thread.dateNote}
      messages={[...thread.messages, ...extra]}
      quick={thread.quick}
      onSend={(text) => sendMessage(thread.id, text)}
    />
  );
}
