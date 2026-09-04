import { Injectable } from '@angular/core';

import { CampusEvent, CAMPUS_EVENTS } from './campus-event';

/**
 * Mock campus events service. Prototype-only: data is a static, in-memory
 * list standing in for a future campus events feed/API.
 */
@Injectable({ providedIn: 'root' })
export class CampusEventsService {
  private readonly events: CampusEvent[] = CAMPUS_EVENTS;

  /** All upcoming campus events, in chronological order. */
  get upcomingEvents(): CampusEvent[] {
    return [...this.events];
  }

  getById(id: string | null | undefined): CampusEvent | undefined {
    return id ? this.events.find(event => event.id === id) : undefined;
  }

  /** Events happening at a given IU campus (e.g. 'IUB'). */
  forCampus(campus: string): CampusEvent[] {
    return this.events.filter(event => event.campuses.includes(campus));
  }
}
