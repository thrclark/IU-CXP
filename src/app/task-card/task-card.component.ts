import { Component, Input } from '@angular/core';

import { IconDirective } from 'espd-common/icon';
import { BadgeComponent } from 'espd-common/badge';

interface CampusBadge {
  /** Unique key for *ngFor tracking. */
  key: string;
  /** Text shown on the badge itself. */
  label: string;
  /** Full name shown as a tooltip / read to assistive tech. */
  title: string;
}

/** Short codes IU uses for its system campuses, mapped to their full names. */
const CAMPUS_NAMES: Record<string, string> = {
  IUB: 'IU Bloomington',
  IUI: 'IU Indianapolis',
  IUE: 'IU East',
  IUK: 'IU Kokomo',
  IUN: 'IU Northwest',
  IUS: 'IU Southeast',
  IUSB: 'IU South Bend',
  IUFW: 'IU Fort Wayne',
  IUC: 'IU Columbus',
};

const ALL_CAMPUS_CODES = Object.keys(CAMPUS_NAMES);

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [IconDirective, BadgeComponent],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  private static nextId = 0;

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
  /** Extra plain-text detail shown when the card is expanded. Richer content can be projected instead. */
  @Input() details?: string;
  /** IU campus codes (e.g. ['IUB', 'IUK']) this service is available at. */
  @Input() campuses: string[] = [];

  /** Unique id linking the expand toggle button to its detail panel. */
  readonly detailsId = `task-card-details-${TaskCardComponent.nextId++}`;

  expanded = false;

  get campusBadges(): CampusBadge[] {
    const codes = Array.from(new Set(this.campuses.map(code => code.toUpperCase())));

    // Collapse to a single pill once every known IU campus is represented,
    // rather than listing each one out individually.
    const coversAllCampuses = ALL_CAMPUS_CODES.length > 0
      && ALL_CAMPUS_CODES.every(code => codes.includes(code));

    if (coversAllCampuses) {
      return [{ key: 'ALL', label: 'All Campuses', title: 'Available at every IU campus' }];
    }

    return codes.map(code => ({
      key: code,
      label: code,
      title: CAMPUS_NAMES[code] ?? code,
    }));
  }

  toggleExpanded(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
}
