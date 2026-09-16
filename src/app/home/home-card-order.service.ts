import { Injectable, inject } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';

import { HomeService } from './home.service';
import { CardRef, DEFAULT_WIDGET_ORDER, WidgetId } from './home-card-order';

/**
 * Tracks the single drag-and-drop order of every card in the "My Home"
 * grid -- both the fixed widget cards (My Classes, Kuali Time, ...) and
 * the variable set of pinned service cards from HomeService -- so the
 * user can freely interleave them. Also tracks which widget cards the
 * user has "unfavorited" (removed from Home via the heart icon), mirroring
 * how HomeService tracks pinned/un-pinned service cards.
 *
 * Prototype-only: order and favorite state live in memory for the session
 * and aren't persisted anywhere.
 */
@Injectable({ providedIn: 'root' })
export class HomeCardOrderService {
  private homeService = inject(HomeService);

  /** Manually-set order, seeded with the widget cards only. Reconciled
   *  against HomeService's live pinned list by the `cards` getter below,
   *  so this array is allowed to drift out of sync with which services
   *  are actually pinned -- it just records position, not membership. */
  private order: CardRef[] = DEFAULT_WIDGET_ORDER.map(id => ({ kind: 'widget', id }) as CardRef);

  /** Widget ids the user has un-favorited (heart off), so they're hidden
   *  from the Home grid until favorited again. Empty = everything shown,
   *  matching the page's default state. */
  private hiddenWidgets = new Set<WidgetId>();

  /**
   * The full, ordered list of cards to render. Self-heals each time it's
   * read: drops service cards for services that have since been
   * un-pinned and widget cards that have since been un-favorited, then
   * appends (in that order) any newly-pinned service or newly-favorited
   * widget that isn't already in the order.
   */
  get cards(): CardRef[] {
    const pinnedSlugs = new Set(this.homeService.homeServices.map(service => service.slug));

    const reconciled = this.order.filter(card =>
      card.kind === 'service' ? pinnedSlugs.has(card.slug) : !this.hiddenWidgets.has(card.id),
    );

    const knownSlugs = new Set(
      reconciled.filter(card => card.kind === 'service').map(card => (card as { slug: string }).slug),
    );
    const newlyPinned: CardRef[] = this.homeService.homeServices
      .filter(service => !knownSlugs.has(service.slug))
      .map(service => ({ kind: 'service', slug: service.slug }) as CardRef);

    const knownWidgetIds = new Set(
      reconciled.filter(card => card.kind === 'widget').map(card => (card as { id: WidgetId }).id),
    );
    const newlyFavorited: CardRef[] = DEFAULT_WIDGET_ORDER
      .filter(id => !this.hiddenWidgets.has(id) && !knownWidgetIds.has(id))
      .map(id => ({ kind: 'widget', id }) as CardRef);

    this.order = [...reconciled, ...newlyPinned, ...newlyFavorited];
    return this.order;
  }

  /** Unique, stable key for a card, suitable for an @for track expression. */
  cardKey(card: CardRef): string {
    return card.kind === 'widget' ? `widget:${card.id}` : `service:${card.slug}`;
  }

  /** Reorders the card at `previousIndex` to `currentIndex`, in place. */
  moveCard(previousIndex: number, currentIndex: number): void {
    // Read through `cards` first so the order array is fully reconciled
    // before we splice it -- otherwise a drag that happens to coincide
    // with a pin/unpin elsewhere could move the wrong entry.
    const current = this.cards;
    moveItemInArray(current, previousIndex, currentIndex);
    this.order = current;
  }

  /** Whether a widget card is currently favorited (shown on Home). */
  isWidgetFavorited(id: WidgetId): boolean {
    return !this.hiddenWidgets.has(id);
  }

  /** Toggles a widget card's favorited (pinned-to-Home) state. */
  toggleWidgetFavorite(id: WidgetId): void {
    if (this.hiddenWidgets.has(id)) {
      this.hiddenWidgets.delete(id);
    } else {
      this.hiddenWidgets.add(id);
    }
  }
}
