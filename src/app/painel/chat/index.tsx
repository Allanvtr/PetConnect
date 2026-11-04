import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { BottomNav, Screen } from '../../../components/Layout';
import { T } from '../../../components/Text';
import { Chip, ChipRow, Photo, Tap, textStyles } from '../../../components/ui';
import { ongThreads } from '../../../data/chat';
import type { OngThread } from '../../../data/chat';
import { ongThreadKey, ongUnreadOf, useOngReadState, useSentMessages } from '../../../data/store';
import { colors } from '../../../theme/colors';

type Tab = 'todas' | 'naolidas';

function Row({ thread }: { thread: OngThread }) {
  const mine = useSentMessages(ongThreadKey(thread.id));
  const unread = ongUnreadOf(thread.id);
  const sentNow = mine.length > 0;
  const lastFromMe = sentNow || thread.messages[thread.messages.length - 1].from === 'me';
  const last = sentNow ? mine[mine.length - 1].text : thread.last;

  return (
    <Tap
      href={`/painel/chat/${thread.id}`}
      label={`Conversa com ${thread.who} sobre ${thread.pet}${unread ? `, ${unread} não lidas` : ''}`}
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
      <Photo style={{ width: 48, height: 48, borderRadius: 24, fontSize: 10 }} />
      <View style={{ flex: 1, minWidth: 0, gap: 3 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <T style={{ flexShrink: 1, fontSize: 15, fontWeight: '700', color: colors.ink }} numberOfLines={1}>
            {thread.who}
          </T>
          <T style={[textStyles.hint, unread > 0 && { color: colors.navy, fontWeight: '700' }]}>
            {sentNow ? 'agora' : thread.time}
          </T>
        </View>
        <T style={textStyles.hint}>
          Quer adotar {thread.pet} · {thread.chip}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <T
            style={{
              flex: 1,
              fontSize: 14,
              color: unread > 0 ? colors.ink : colors.body,
              fontWeight: unread > 0 ? '600' : '400',
            }}
            numberOfLines={1}
          >
            {lastFromMe ? 'Você: ' : ''}
            {last}
          </T>
          {unread > 0 && (
            <View
              accessible
              accessibilityLabel={`${unread} não lidas`}
              style={{
                minWidth: 22,
                height: 22,
                paddingHorizontal: 6,
                borderRadius: 11,
                backgroundColor: colors.navy,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T style={{ fontSize: 12, fontWeight: '700', color: colors.white }}>{unread}</T>
            </View>
          )}
        </View>
      </View>
    </Tap>
  );
}

/** Tela 15 · Chat da ONG: lista de conversas com os candidatos. */
export default function ChatOng() {
  const [tab, setTab] = useState<Tab>('todas');
  useOngReadState(); // atualiza a lista quando uma conversa é aberta
  const unreadThreads = ongThreads.filter((t) => ongUnreadOf(t.id) > 0);
  const threads = tab === 'todas' ? ongThreads : unreadThreads;

  return (
    <Screen tab>
      <View style={{ paddingTop: 20, paddingHorizontal: 16, paddingBottom: 8, gap: 12 }}>
        <T style={textStyles.h1} accessibilityRole="header">
          Chat
        </T>
        <ChipRow>
          <Chip label={`Todas (${ongThreads.length})`} selected={tab === 'todas'} onPress={() => setTab('todas')} />
          <Chip
            label={`Não lidas (${unreadThreads.length})`}
            selected={tab === 'naolidas'}
            onPress={() => setTab('naolidas')}
          />
        </ChipRow>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {threads.map((t) => (
          <Row key={t.id} thread={t} />
        ))}
        {threads.length === 0 && (
          <T style={{ paddingVertical: 32, paddingHorizontal: 16, textAlign: 'center', fontSize: 14, color: colors.muted }}>
            Nenhuma conversa não lida.
          </T>
        )}
      </ScrollView>
      <BottomNav variant="ong" active="chat" />
    </Screen>
  );
}
