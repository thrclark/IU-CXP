import { Injectable } from '@angular/core';

import { ChatMessage, Conversation } from './conversation.model';

const STORAGE_KEY = 'iu-cxp.assistant.conversations';
/** Cap on stored conversations, so localStorage doesn't grow without bound in this prototype. */
const MAX_CONVERSATIONS = 50;

/**
 * Holds every "Ask IU" conversation and which one is active, and persists
 * them to localStorage so a student's chat history survives a page reload.
 * Prototype-only: this is per-browser storage, not synced across devices or
 * tied to a real account — a production version would need a backend for
 * that. See AssistantReplyService for how replies get composed.
 */
@Injectable({ providedIn: 'root' })
export class ConversationService {
  private conversations: Conversation[] = [];
  private activeId: string | null = null;

  constructor() {
    this.hydrate();
    if (!this.conversations.length) {
      this.startNew();
    } else {
      this.activeId = this.conversations[0].id;
    }
  }

  get all(): Conversation[] {
    // Most recently updated first, so the history list reads like a normal chat app.
    return [...this.conversations].sort((a, b) => b.updatedAt - a.updatedAt);
  }

  get active(): Conversation | undefined {
    return this.conversations.find(c => c.id === this.activeId);
  }

  startNew(): Conversation {
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: 'New conversation',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.conversations = [conversation, ...this.conversations].slice(0, MAX_CONVERSATIONS);
    this.activeId = conversation.id;
    this.persist();
    return conversation;
  }

  switchTo(id: string): void {
    if (this.conversations.some(c => c.id === id)) {
      this.activeId = id;
    }
  }

  deleteConversation(id: string): void {
    this.conversations = this.conversations.filter(c => c.id !== id);
    if (this.activeId === id) {
      this.activeId = this.conversations[0]?.id ?? null;
    }
    if (!this.conversations.length) {
      this.startNew();
    } else {
      this.persist();
    }
  }

  addMessage(conversationId: string, message: ChatMessage): void {
    const conversation = this.conversations.find(c => c.id === conversationId);
    if (!conversation) {
      return;
    }
    conversation.messages = [...conversation.messages, message];
    conversation.updatedAt = message.timestamp;
    if (conversation.title === 'New conversation' && message.role === 'user') {
      conversation.title = deriveTitle(message.text);
    }
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.conversations));
    } catch (error) {
      // Private browsing, storage quota, etc. — chat still works for this session, it just won't survive a reload.
      console.warn('Could not persist assistant conversations:', error);
    }
  }

  private hydrate(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.conversations = JSON.parse(raw) as Conversation[];
      }
    } catch (error) {
      console.warn('Could not load saved assistant conversations:', error);
      this.conversations = [];
    }
  }
}

function deriveTitle(text: string): string {
  const trimmed = text.trim().replace(/\s+/g, ' ');
  const MAX_TITLE_LENGTH = 48;
  return trimmed.length > MAX_TITLE_LENGTH ? `${trimmed.slice(0, MAX_TITLE_LENGTH)}…` : trimmed || 'New conversation';
}
