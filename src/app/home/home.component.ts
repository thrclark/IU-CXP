import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { AdminHeaderModule } from 'espd-common/admin-header';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

import { LargeTaskCardComponent } from '../large-task-card/large-task-card.component';
import { CampusEventsService } from '../campus-events/campus-events.service';
import { CampusEvent } from '../campus-events/campus-event';
import { NavStateService } from '../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../identity-menu/identity-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderModule, ShellModule, SidenavModule, AdminHeaderModule, FooterComponent, IconDirective, LargeTaskCardComponent, IdentityMenuComponent], // <-- Added AdminHeaderModule to fix NG8001 for <espd-admin-header>
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  protected navState = inject(NavStateService);

  constructor(private campusEventsService: CampusEventsService) { }

  /**
   * A handful of upcoming campus events, skipping ones that have already
   * passed so the home page reads as forward-looking. This is a
   * lightweight prototype approximation -- event dates are display strings,
   * not real Date objects, so this isn't a true "after today" filter.
   */
  get upcomingEvents(): CampusEvent[] {
    return this.campusEventsService.upcomingEvents.slice(1, 4);
  }

  footerHtml = `
    <footer class="rbt-footer mt-auto">
      <img src="https://sd-prd-images.s3.amazonaws.com/prd/test-uisapp2/20150702T0521168403962_trident-small.png" alt="Indiana University" width="20" height="25" class="mr-3">
      <ul class="rbt-footer-aux-links">
        <li class="rbt-footer-aux-item"><a href="https://accessibility.iu.edu/assistance/" rel="nofollow">Accessibility </a></li>
        <li class="rbt-footer-aux-item"><a href="https://espd.apps.iu.edu/privacyStatement.html" rel="nofollow">Privacy Notice</a></li>
        <li class="rbt-footer-aux-item"><a href="https://www.iu.edu/copyright/index.html" rel="nofollow">Copyright</a> © 2026 The Trustees of <a href="https://www.iu.edu" rel="nofollow"> Indiana University </a></li>
      </ul>
    </footer>
  `;

  // --- Notification bell prototype ---
  notificationsOpen = false;

  toggleNotifications(event: Event): void {
    event.stopPropagation();
    this.notificationsOpen = !this.notificationsOpen;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.notificationsOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.notificationsOpen && !target.closest('.notification-menu')) {
      this.notificationsOpen = false;
    }
  }
}
