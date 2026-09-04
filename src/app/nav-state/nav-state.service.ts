import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** The sidebar's top-level nav entries that can show the "selected" highlight. */
export type SidebarNavKey = 'dashboard' | 'events-calendars' | 'maps' | 'notifications';

/**
 * Tracks which top-level sidebar item should show the accent-color
 * "selected" highlight, so exactly one of them has it at a time.
 *
 * Most items are routes, so their selected state normally just follows
 * the active route. "Events & Calendars" is different: it's a disclosure
 * toggle rather than a route of its own, so clicking it doesn't navigate.
 * It's selected manually instead (see `select()`), and -- unlike the
 * routed items -- stays selected even after the sub-navigation panel is
 * collapsed again, until the user actually navigates to a different
 * top-level item.
 */
@Injectable({ providedIn: 'root' })
export class NavStateService {
  private key: SidebarNavKey | null;

  constructor(private router: Router) {
    this.key = this.deriveFromUrl(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.key = this.deriveFromUrl(event.urlAfterRedirects);
      });
  }

  get selectedKey(): SidebarNavKey | null {
    return this.key;
  }

  /**
   * Manually mark a top-level item as selected without navigating -- used
   * by "Events & Calendars", since clicking it only opens/closes the
   * sub-navigation panel rather than changing the route.
   */
  select(key: SidebarNavKey): void {
    this.key = key;
  }

  private deriveFromUrl(url: string): SidebarNavKey | null {
    const path = url.split('?')[0].split('#')[0];

    if (path === '/' || path.startsWith('/dashboard')) {
      return 'dashboard';
    }
    if (path.startsWith('/events-calendars')) {
      return 'events-calendars';
    }
    if (path.startsWith('/maps')) {
      return 'maps';
    }
    if (path.startsWith('/notifications')) {
      return 'notifications';
    }
    return null;
  }
}
