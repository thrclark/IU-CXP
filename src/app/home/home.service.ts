import { Injectable } from '@angular/core';

import { CampusService } from '../campus-services/campus-service';
import { findServiceBySlug } from '../campus-services/service-directory';

/** Slugs shown on "My Home" when the app first loads. */
const DEFAULT_HOME_SLUGS = [
  'one-iu-registration',
  'canvas',
  'duo-two-step-login',
  'health-center-portal',
  'handshake',
  'bursar-billing',
];

/**
 * Tracks which services the user has pinned to "My Home". Prototype-only:
 * state lives in memory for the session and isn't persisted anywhere.
 */
@Injectable({ providedIn: 'root' })
export class HomeService {
  private slugs: string[] = [...DEFAULT_HOME_SLUGS];

  /** Full service records for everything currently on Home, in add order. */
  get homeServices(): CampusService[] {
    return this.slugs
      .map(slug => findServiceBySlug(slug))
      .filter((service): service is CampusService => !!service);
  }

  isOnHome(slug: string): boolean {
    return this.slugs.includes(slug);
  }

  add(slug: string): void {
    if (!this.slugs.includes(slug)) {
      this.slugs = [...this.slugs, slug];
    }
  }

  remove(slug: string): void {
    this.slugs = this.slugs.filter(existing => existing !== slug);
  }

  toggle(slug: string): void {
    if (this.isOnHome(slug)) {
      this.remove(slug);
    } else {
      this.add(slug);
    }
  }
}
