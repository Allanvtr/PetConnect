// Estado compartilhado mínimo (sem biblioteca): mensagens enviadas no chat.
// Fica fora dos componentes para que a conversa continue ao sair e voltar à tela.
import { useSyncExternalStore } from 'react';
import type { Message } from './chat';

const EMPTY: Message[] = [];
let sent: Record<string, Message[]> = {};
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function sendMessage(threadId: string, text: string) {
  const clean = text.trim();
  if (!clean) return;
  sent = { ...sent, [threadId]: [...(sent[threadId] ?? EMPTY), { from: 'me', text: clean }] };
  listeners.forEach((l) => l());
}

export function useSentMessages(threadId: string | undefined): Message[] {
  return useSyncExternalStore(
    subscribe,
    () => (threadId ? sent[threadId] ?? EMPTY : EMPTY),
    () => EMPTY,
  );
}
