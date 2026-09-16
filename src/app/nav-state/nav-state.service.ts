import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** The sidebar's top-level nav entries that can show the "selected" highlight. */
export type SidebarNavKey = 'home' | 'tasks' | 'events-calendars' | 'student-life' | 'employee-center' | 'maps' | 'notifications';

/** Top-level entries that are disclosure toggles (no route of their own), as opposed to routed pages. */
const MANUAL_OVERRIDE_KEYS: ReadonlySet<SidebarNavKey> = new Set(['events-calendars', 'student-life', 'employee-center']);

/**
 * Tracks which top-level sidebar item should show the accent-color
 * "selected" highlight, so exactly one of them has it at a time, and
 * which disclosure-toggle group (if any) has its sub-navigation panel
 * expanded, so at most one of those is ever open at once.
 *
 * Most items are routes, so their selected state normally just follows
 * the active route. "Events & Calendars", "Student Life", and "Employee Center" are
 * different: they're disclosure toggles rather than routes of their own,
 * so clicking one doesn't navigate. They're selected manually instead
 * (see `select()`), and -- unlike the routed items -- stay selected even
 * after their sub-navigation panel is collapsed again, until the user
 * actually navigates to a different top-level item.
 */
@Injectable({ providedIn: 'root' })
export class NavStateService {
  private key: SidebarNavKey | null;
  private expanded: SidebarNavKey | null;

  constructor(private router: Router) {
    const initial = this.deriveFromUrl(this.router.url);
    this.key = initial;
    this.expanded = this.toExpandedGroup(initial);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        const derived = this.deriveFromUrl(event.urlAfterRedirects);
        this.key = derived;
        // A real navigation always resolves which group (if any) should be
        // open -- into the group you just navigated into, or closed
        // entirely if you navigated to an unrelated top-level page.
        this.expanded = this.toExpandedGroup(derived);
      });
  }

  get selectedKey(): SidebarNavKey | null {
    return this.key;
  }

  /**
   * True when the current selection is one of the disclosure-toggle
   * groups ("Events & Calendars", "Student Life", "Employee Center") rather than a routed
   * page. Routed top-level items use this to give up their own
   * route-driven highlight when that happens -- otherwise, since
   * selecting a toggle group doesn't navigate, whatever routed item you
   * were already on would stay highlighted alongside it.
   */
  get isManualOverrideActive(): boolean {
    return this.key !== null && MANUAL_OVERRIDE_KEYS.has(this.key);
  }

  /**
   * Manually mark a top-level item as selected without navigating -- used
   * by "Events & Calendars", "Student Life", and "Employee Center", since clicking one only
   * opens/closes its sub-navigation panel rather than changing the route.
   */
  select(key: SidebarNavKey): void {
    this.key = key;
  }

  /** Which disclosure-toggle group (if any) currently has its sub-navigation panel expanded. */
  get expandedGroup(): SidebarNavKey | null {
    return this.expanded;
  }

  /**
   * Open or close a disclosure-toggle group's sub-navigation panel.
   * Only one such panel is ever open at a time, so opening one
   * automatically closes whichever other one was open.
   */
  toggleExpanded(key: SidebarNavKey): void {
    this.expanded = this.expanded === key ? null : key;
  }

  private toExpandedGroup(key: SidebarNavKey | null): SidebarNavKey | null {
    return key !== null && MANUAL_OVERRIDE_KEYS.has(key) ? key : null;
  }

  private deriveFromUrl(url: string): SidebarNavKey | null {
    const path = url.split('?')[0].split('#')[0];

    if (path === '/' || path.startsWith('/home')) {
      return 'home';
    }
    if (path.startsWith('/tasks')) {
      return 'tasks';
    }
    if (path.startsWith('/events-calendars')) {
      return 'events-calendars';
    }
    if (path.startsWith('/student-life')) {
      return 'student-life';
    }
    if (path.startsWith('/employee-center')) {
      return 'employee-center';
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
