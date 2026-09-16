import { Component, HostBinding, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [IconDirective, BadgeComponent, RouterLink],
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
   * When set, the info button navigates there.
   */
  @Input() slug?: string;
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

  @HostBinding('class.large-task-card-span-1')
  get isSingleColumn(): boolean {
    return this.columnSpan === 1;
  }

  get campusBadges(): CampusBadge[] {
    return resolveCampusBadges(this.campuses);
  }
}
