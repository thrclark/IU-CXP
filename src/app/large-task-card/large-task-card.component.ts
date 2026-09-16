import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CdkDragHandle } from '@angular/cdk/drag-drop';

import { IconDirective } from 'espd-common/icon';
import { BadgeComponent } from 'espd-common/badge';

import { CampusBadge, resolveCampusBadges } from '../campus/campus-badges';

/**
 * A 2x2 variant of app-task-card for widgets that pull in personalized or
 * public data — a class schedule, a list of important dates, and similar —
 * rather than just linking out to an external service. The body is an open
 * <ng-content> area instead of a fixed short description, since the shape
 * of that data varies from widget to widget.
 */
@Component({
  selector: 'app-large-task-card',
  standalone: true,
  imports: [IconDirective, BadgeComponent, RouterLink, CdkDragHandle],
  templateUrl: './large-task-card.component.html',
  styleUrls: ['./large-task-card.component.css']
})
export class LargeTaskCardComponent {
  /** Name of the widget/service, e.g. "My Class Schedule". */
  @Input() title = '';
  /** Category the widget belongs to, e.g. "Academics". */
  @Input() category?: string;
  /** espd icon name shown in the identity swatch when no imageIcon is provided. */
  @Input() icon = 'rvt-grid';
  /** Image URL shown in the identity swatch instead of the icon font. */
  @Input() imageIcon?: string;
  /** Where the title links out to. Opens in a new window/tab. Optional. */
  @Input() launchUrl?: string;
  /** IU campus codes (e.g. ['IUB', 'IUK']) this widget's data applies to. Optional. */
  @Input() campuses: string[] = [];
  /**
   * Slug identifying this widget's dedicated detail page (/services/:slug).
   * When set (and infoRoute isn't), the info button navigates there.
   */
  @Input() slug?: string;
  /**
   * Route for the info button when it shouldn't go to the default
   * /services/:slug page -- e.g. the Home screen's widget cards, which
   * each link to their own dedicated page instead. Takes precedence over
   * `slug` when both are set.
   */
  @Input() infoRoute?: string | unknown[];
  /**
   * Flags the widget as pulling in signed-in-user data (e.g. a personal class
   * schedule), as opposed to data that's the same for every viewer (e.g. a
   * university-wide list of important dates).
   */
  @Input() personalized = false;
  /**
   * How many columns of the surrounding .card-grid this widget occupies:
   * 2 (default) for the card's traditional 2x2 footprint, or 1 to shrink it
   * to a single column while keeping the same 2-row height.
   */
  @Input() columnSpan: 1 | 2 = 2;
  /**
   * Shows a drag handle in the card's corner for reordering. Off by
   * default so pages that reuse this card outside the Home screen's
   * drag-and-drop grid (Tasks, Collection Detail, Service Detail) are
   * unaffected.
   */
  @Input() dragHandle = false;
  /**
   * Shows the favorite (pin-to-Home) heart button in the footer. Off by
   * default so pages that reuse this card outside the Home screen are
   * unaffected.
   */
  @Input() showFavoriteAction = false;
  /** Whether this card is currently favorited/pinned to Home (controls the heart icon's state). */
  @Input() favorite = false;
  /** Emitted when the favorite/heart button is clicked. */
  @Output() favoriteToggle = new EventEmitter<void>();

  @HostBinding('class.large-task-card-span-1')
  get isSingleColumn(): boolean {
    return this.columnSpan === 1;
  }

  get campusBadges(): CampusBadge[] {
    return resolveCampusBadges(this.campuses);
  }

  /** Where the info button should navigate, or null to hide it. */
  get resolvedInfoRoute(): string | unknown[] | null {
    if (this.infoRoute) {
      return this.infoRoute;
    }
    return this.slug ? ['/services', this.slug] : null;
  }
}
