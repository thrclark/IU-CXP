import { Injectable } from '@angular/core';

import { CampusService } from '../campus-services/campus-service';
import { ALL_SERVICES } from '../campus-services/service-directory';
import { SemanticSearchService } from '../campus-services/semantic-search.service';
import { Conversation } from './conversation.model';

export interface AssistantReply {
  text: string;
  referencedServices?: CampusService[];
}

const GREETING_PATTERN = /^\s*(hi|hello|hey|good (morning|afternoon|evening)|yo|sup)\b/i;
const THANKS_PATTERN = /\b(thanks|thank you|thx|appreciate it)\b/i;
const MORE_INFO_PATTERN = /\b(tell me more|more info|more details|what about it|details please)\b/i;
const ORDINAL_WORDS: Record<string, number> = {
  first: 0, '1st': 0, one: 0,
  second: 1, '2nd': 1, two: 1,
  third: 2, '3rd': 2, three: 2,
};

/** How many service cards to show under a single reply. */
const MAX_REFERENCED = 3;

const GREETINGS = [
  "Hi! What are you trying to get done today?",
  "Hey there — what can I help you find?",
  "Hello! Tell me what you're looking for and I'll point you to the right service.",
];

const ACKNOWLEDGEMENTS = [
  "You're welcome! Anything else you're trying to track down?",
  "Happy to help — let me know if there's anything else.",
  "Glad that helped!",
];

const NOTHING_FOUND =
  "I couldn't find a service that matches that. Try rephrasing, or reach out to the UITS Support Center for help.";

/**
 * Composes the assistant's side of the conversation. This is a scripted
 * assistant, not a real language model: it detects a few conversational
 * patterns (greetings, thanks, "tell me more about the first one") and
 * otherwise grounds its reply entirely in SemanticSearchService + exact
 * catalog matches, the same search used on the dashboard. That's a
 * deliberate prototype tradeoff — see the semantic search build notes for
 * the alternatives (an in-browser LLM, or a backend-hosted one) and why
 * this one was chosen first.
 */
@Injectable({ providedIn: 'root' })
export class AssistantReplyService {
  constructor(private semanticSearch: SemanticSearchService) {}

  async reply(userText: string, conversation: Conversation): Promise<AssistantReply> {
    const trimmed = userText.trim();
    const normalized = trimmed.toLowerCase();

    if (GREETING_PATTERN.test(normalized) && normalized.split(/\s+/).length <= 4) {
      return { text: pick(GREETINGS) };
    }
    if (THANKS_PATTERN.test(normalized)) {
      return { text: pick(ACKNOWLEDGEMENTS) };
    }

    const followUp = this.tryFollowUp(normalized, conversation);
    if (followUp) {
      return followUp;
    }

    return this.searchReply(trimmed);
  }

  /** Handles references back to services the assistant already showed, e.g. "tell me more about the first one". */
  private tryFollowUp(normalized: string, conversation: Conversation): AssistantReply | null {
    const lastWithServices = [...conversation.messages]
      .reverse()
      .find(m => m.role === 'assistant' && !!m.referencedServices?.length);
    const options = lastWithServices?.referencedServices;
    if (!options?.length) {
      return null;
    }

    let target: CampusService | undefined;

    for (const [word, index] of Object.entries(ORDINAL_WORDS)) {
      if (normalized.includes(word) && options[index]) {
        target = options[index];
        break;
      }
    }

    if (!target) {
      target = options.find(service => normalized.includes(service.title.toLowerCase()));
    }

    if (!target && options.length === 1 && MORE_INFO_PATTERN.test(normalized)) {
      target = options[0];
    }

    if (!target) {
      return null;
    }

    const links = target.supportLinks.map(link => link.label).join(', ');
    const text = links
      ? `${target.extendedDescription} For more help: ${links}.`
      : target.extendedDescription;

    return { text, referencedServices: [target] };
  }

  private async searchReply(query: string): Promise<AssistantReply> {
    if (!query) {
      return { text: "I didn't quite catch that — what are you trying to do?" };
    }

    const normalizedQuery = query.toLowerCase();
    const exact = ALL_SERVICES.filter(service =>
      service.title.toLowerCase().includes(normalizedQuery) ||
      service.category.toLowerCase().includes(normalizedQuery),
    );
    const semantic = await this.semanticSearch.search(query, 5).catch(() => []);

    const seen = new Set<string>();
    const candidates: CampusService[] = [];
    for (const service of [...exact, ...semantic]) {
      if (!seen.has(service.slug)) {
        seen.add(service.slug);
        candidates.push(service);
      }
    }

    if (!candidates.length) {
      return { text: NOTHING_FOUND };
    }

    // Treat any exact title/category hit as confident enough to answer directly
    // rather than asking the user to disambiguate.
    const confident = exact.length > 0 || candidates.length === 1;
    const top = candidates[0];

    return {
      text: confident
        ? `It looks like you're after ${top.title}. ${top.description}`
        : "I found a few things that might match — did you mean one of these?",
      referencedServices: candidates.slice(0, MAX_REFERENCED),
    };
  }
}

function pick(options: string[]): string {
  return options[Math.floor(Math.random() * options.length)];
}
