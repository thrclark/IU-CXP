import { CampusService } from '../campus-services/campus-service';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
  /** Services the assistant is pointing to for this message, shown as cards under the text. */
  referencedServices?: CampusService[];
}

export interface Conversation {
  id: string;
  /** Derived from the first user message; falls back to "New conversation". */
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}
