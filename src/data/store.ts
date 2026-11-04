// Estado compartilhado mínimo (sem biblioteca): mensagens enviadas no chat e conversas já lidas.
// Fica fora dos componentes para que a conversa continue ao sair e voltar à tela.
import { useSyncExternalStore } from 'react';
import { ongThreads } from './chat';
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

const notify = () => listeners.forEach((l) => l());

export function sendMessage(threadId: string, text: string) {
  const clean = text.trim();
  if (!clean) return;
  sent = { ...sent, [threadId]: [...(sent[threadId] ?? EMPTY), { from: 'me', text: clean }] };
  notify();
}

export function useSentMessages(threadId: string | undefined): Message[] {
  return useSyncExternalStore(
    subscribe,
    () => (threadId ? sent[threadId] ?? EMPTY : EMPTY),
    () => EMPTY,
  );
}

/* ---------------------------------------------- Conversas lidas (lado da ONG) */

const NO_READ: Record<string, true> = {};
let read: Record<string, true> = NO_READ;

/** Marca a conversa da ONG com o candidato como lida. */
export function markOngThreadRead(candidateId: string) {
  if (read[candidateId]) return;
  read = { ...read, [candidateId]: true };
  notify();
}

/** Quantas mensagens não lidas a conversa tem (zero depois de aberta). */
export const ongUnreadOf = (candidateId: string) =>
  read[candidateId] ? 0 : ongThreads.find((t) => t.id === candidateId)?.unread ?? 0;

/** Faz a tela refazer a renderização quando alguma conversa for lida. */
export function useOngReadState(): Record<string, true> {
  return useSyncExternalStore(subscribe, () => read, () => NO_READ);
}

/** Total de mensagens não lidas da ONG (selo da aba Chat). */
export function useOngUnreadTotal(): number {
  return useSyncExternalStore(
    subscribe,
    () => ongThreads.reduce((sum, t) => sum + ongUnreadOf(t.id), 0),
    () => 0,
  );
}

/** Chave usada para guardar as mensagens enviadas pela ONG a cada candidato. */
export const ongThreadKey = (candidateId: string) => `ong:${candidateId}`;
