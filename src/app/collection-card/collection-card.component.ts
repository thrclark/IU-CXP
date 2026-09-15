import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconDirective } from 'espd-common/icon';

import { CampusService } from '../campus-services/campus-service';
import { TaskCollectionKind } from '../task-collections/task-collection';

/** Fixed 2x2 layout: up to 4 member-task icons are shown, one per grid cell. */
const ICON_GRID_SIZE = 4;

/** One cell of the 2x2 identity-swatch mosaic: the service it represents, or null for an unused trailing cell. */
export interface CollectionIconCell {
  service: CampusService | null;
}

/**
 * Same footprint as app-task-card (a single dashboard grid cell). Where
 * app-task-card shows one service's icon in its identity swatch, this
 * shows a 2x2 mosaic of the collection's member-task icons in that same
 * square, so a collection reads as "a bundle of tasks" at a glance without
 * taking up any more room on the dashboard than a single task does.
 */
@Component({
  selector: 'app-collection-card',
  standalone: true,
  imports: [IconDirective, RouterLink],
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent {
  /** URL-friendly identifier used to link to the collection's detail page (/collections/:slug). */
  @Input() slug = '';
  @Input() title = '';
  @Input() kind: TaskCollectionKind = 'role';
  /** Short "why am I seeing this" line shown where app-task-card shows its category. */
  @Input() eyebrow = '';
  /** Short summary shown in the card body, same slot as app-task-card's description. */
  @Input() description?: string;
  /** Full set of services in this collection, in display order. */
  @Input() services: CampusService[] = [];
  /** Emitted when the dismiss ("x") button is activated. */
  @Output() dismissed = new EventEmitter<void>();

  /** Always exactly 4 cells, so the mosaic grid stays a fixed 2x2 whether the collection has 2 tasks or 20. */
  get iconGridCells(): CollectionIconCell[] {
    return Array.from({ length: ICON_GRID_SIZE }, (_, i) => ({ service: this.services[i] ?? null }));
  }
}
