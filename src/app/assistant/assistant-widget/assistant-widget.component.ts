import { AfterViewChecked, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IconDirective } from 'espd-common/icon';

import { HomeService } from '../../home/home.service';
import { AssistantReplyService } from '../assistant-reply.service';
import { Conversation } from '../conversation.model';
import { ConversationService } from '../conversation.service';

/**
 * Minimum time the "Thinking…" spinner stays up before a reply appears.
 * Purely cosmetic — the real search/reply logic is fast enough that
 * without this, replies would pop in instantly, which reads as less
 * "AI" and more "instant lookup". Real latency (if any) is respected:
 * the spinner shows for max(actual reply time, this delay), not the sum.
 */
const SIMULATED_THINKING_MS = 2000;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Extra breathing room to leave between the widget and the footer once they'd otherwise overlap. */
const FOOTER_GAP_PX = 16;

/**
 * Floating "Ask IU" chat widget, mounted once in app.html so it's available
 * on every page. Conversation state/history lives in ConversationService;
 * reply text comes from AssistantReplyService (a scripted assistant grounded
 * in SemanticSearchService — see that service's docstring for why it's
 * scripted rather than a real language model, and what the upgrade path
 * looks like).
 */
@Component({
  selector: 'app-assistant-widget',
  standalone: true,
  imports: [FormsModule, IconDirective],
  templateUrl: './assistant-widget.component.html',
  styleUrls: ['./assistant-widget.component.css'],
})
export class AssistantWidgetComponent implements AfterViewChecked {
  @ViewChild('messageList') private messageListRef?: ElementRef<HTMLDivElement>;
  @ViewChild('widgetRoot') private widgetRootRef?: ElementRef<HTMLDivElement>;

  private positionRafId: number | null = null;

  panelOpen = false;
  historyOpen = false;
  draft = '';
  sending = false;

  constructor(
    private conversationService: ConversationService,
    private replyService: AssistantReplyService,
    private homeService: HomeService,
  ) {}

  get conversation(): Conversation | undefined {
    return this.conversationService.active;
  }

  get history(): Conversation[] {
    return this.conversationService.all;
  }

  ngAfterViewChecked(): void {
    const el = this.messageListRef?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
    // Cheap enough to run every check — also catches the footer changing
    // out from under us on route navigation, without needing a Router dep.
    this.updateFooterOffset();
  }

  /**
   * Keeps the widget from sitting on top of the page footer. The footer
   * (<espd-footer>, present on every page) is outside this component's own
   * DOM subtree, so this is a plain imperative style write off the real
   * layout — not an Angular binding — both because that's the only way to
   * reach a sibling element's geometry and because writing to a
   * template-bound property from ngAfterViewChecked would trip Angular's
   * "expression changed after it was checked" check in dev mode.
   */
  private updateFooterOffset(): void {
    const wrap = this.widgetRootRef?.nativeElement;
    if (!wrap) {
      return;
    }

    const footer = document.querySelector('espd-footer');
    if (!footer) {
      wrap.style.bottom = '';
      return;
    }

    const overlap = window.innerHeight - footer.getBoundingClientRect().top;
    wrap.style.bottom = overlap > 0 ? `${overlap + FOOTER_GAP_PX}px` : '';
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (this.positionRafId !== null) {
      return;
    }
    this.positionRafId = requestAnimationFrame(() => {
      this.positionRafId = null;
      this.updateFooterOffset();
    });
  }

  togglePanel(): void {
    this.panelOpen = !this.panelOpen;
    if (this.panelOpen) {
      this.historyOpen = false;
    }
  }

  toggleHistory(): void {
    this.historyOpen = !this.historyOpen;
  }

  startNew(): void {
    this.conversationService.startNew();
    this.historyOpen = false;
  }

  switchTo(id: string): void {
    this.conversationService.switchTo(id);
    this.historyOpen = false;
  }

  deleteConversation(event: Event, id: string): void {
    event.stopPropagation();
    this.conversationService.deleteConversation(id);
  }

  isOnHome(slug: string): boolean {
    return this.homeService.isOnHome(slug);
  }

  toggleHome(slug: string): void {
    this.homeService.toggle(slug);
  }

  async send(): Promise<void> {
    const text = this.draft.trim();
    const conversation = this.conversation;
    if (!text || !conversation || this.sending) {
      return;
    }

    this.draft = '';
    this.conversationService.addMessage(conversation.id, {
      id: crypto.randomUUID(),
      role: 'user',
      text,
      timestamp: Date.now(),
    });

    this.sending = true;
    try {
      const [reply] = await Promise.all([
        this.replyService.reply(text, conversation),
        delay(SIMULATED_THINKING_MS),
      ]);
      this.conversationService.addMessage(conversation.id, {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: reply.text,
        timestamp: Date.now(),
        referencedServices: reply.referencedServices,
      });
    } finally {
      this.sending = false;
    }
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  relativeTime(timestamp: number): string {
    const minutes = Math.round((Date.now() - timestamp) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.round(hours / 24)}d ago`;
  }
}
