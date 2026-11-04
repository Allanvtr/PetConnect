import { ScrollView, View } from 'react-native';
import { IconVerified } from '../../components/Icons';
import { BottomNav, Screen } from '../../components/Layout';
import { T } from '../../components/Text';
import { Photo, Tap, textStyles } from '../../components/ui';
import { ongs } from '../../data/animals';
import { ongLogos } from '../../data/images';
import { threads } from '../../data/chat';
import { useSentMessages } from '../../data/store';
import { colors } from '../../theme/colors';
import type { Thread } from '../../data/chat';

function Row({ thread }: { thread: Thread }) {
  const ong = ongs[thread.ongId];
  const mine = useSentMessages(thread.id);
  const last = mine.length ? mine[mine.length - 1].text : thread.last;
  return (
    <Tap
      href={`/chat/${thread.id}`}
      label={`Conversa com ${ong.name} sobre ${thread.pet}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
        backgroundColor: colors.white,
      }}
    >
      <Photo source={ongLogos[thread.ongId]} alt={`Logo da ${ong.name}`} style={{ width: 48, height: 48, borderRadius: 24, fontSize: 11 }}>
        Logo
      </Photo>
      <View style={{ flex: 1, minWidth: 0, gap: 3 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }}>
            <T style={{ fontSize: 15, fontWeight: '700', color: colors.ink }} numberOfLines={1}>
              {ong.name}
            </T>
            <IconVerified />
          </View>
          <T style={textStyles.hint}>{mine.length ? 'agora' : thread.time}</T>
        </View>
        <T style={textStyles.hint}>Sobre {thread.pet}</T>
        <T style={{ fontSize: 14, color: colors.body }} numberOfLines={1}>
          {last}
        </T>
      </View>
    </Tap>
  );
}

/** Tela 09 · Chat: lista de conversas. */
export default function ChatList() {
  return (
    <Screen tab>
      <T style={[textStyles.h1, { paddingTop: 20, paddingHorizontal: 16, paddingBottom: 12 }]} accessibilityRole="header">
        Chat
      </T>
      <ScrollView style={{ flex: 1 }}>
        {threads.map((t) => (
          <Row key={t.id} thread={t} />
        ))}
      </ScrollView>
      <BottomNav variant="adotante" active="chat" />
    </Screen>
  );
}
