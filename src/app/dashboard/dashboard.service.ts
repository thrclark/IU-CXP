import { Injectable } from '@angular/core';

import { CampusService } from '../campus-services/campus-service';
import { findServiceBySlug } from '../campus-services/service-directory';

/** Slugs shown on "My Dashboard" when the app first loads. */
const DEFAULT_DASHBOARD_SLUGS = [
  'one-iu-registration',
  'canvas',
  'duo-two-step-login',
  'health-center-portal',
  'handshake',
  'bursar-billing',
];

/**
 * Tracks which services the user has pinned to "My Dashboard". Prototype-only:
 * state lives in memory for the session and isn't persisted anywhere.
 */
@Injectable({ providedIn: 'root' })
export class DashboardService {
  private slugs: string[] = [...DEFAULT_DASHBOARD_SLUGS];

  /** Full service records for everything currently on the dashboard, in add order. */
  get dashboardServices(): CampusService[] {
    return this.slugs
      .map(slug => findServiceBySlug(slug))
      .filter((service): service is CampusService => !!service);
  }

  isOnDashboard(slug: string): boolean {
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
    if (this.isOnDashboard(slug)) {
      this.remove(slug);
    } else {
      this.add(slug);
    }
  }
}
