import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconDirective } from 'espd-common/icon';
import { BadgeComponent } from 'espd-common/badge';

import { CampusBadge, resolveCampusBadges } from '../campus/campus-badges';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [IconDirective, BadgeComponent, RouterLink],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  /** Name of the service, e.g. "Complete Course Registration". */
  @Input() title = '';
  /** Category the service belongs to, e.g. "Enrollment". */
  @Input() category?: string;
  /** Short description of what the service does. */
  @Input() description?: string;
  /** espd icon name shown in the identity swatch when no imageIcon is provided. */
  @Input() icon = 'rvt-grid';
  /** Image URL shown in the identity swatch instead of the icon font. */
  @Input() imageIcon?: string;
  /** Where the service launches when the card is activated. Opens in a new window/tab. */
  @Input() launchUrl?: string;
  /** IU campus codes (e.g. ['IUB', 'IUK']) this service is available at. */
  @Input() campuses: string[] = [];
  /**
   * Slug identifying this service's dedicated detail page (/services/:slug).
   * When set, the info button navigates there instead of rendering.
   */
  @Input() slug?: string;

  get campusBadges(): CampusBadge[] {
    return resolveCampusBadges(this.campuses);
  }
}
