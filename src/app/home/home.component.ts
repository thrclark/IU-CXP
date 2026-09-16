import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { AdminHeaderModule } from 'espd-common/admin-header';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

import { LargeTaskCardComponent } from '../large-task-card/large-task-card.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CampusEventsService } from '../campus-events/campus-events.service';
import { AcademicCalendarService } from '../academic-calendar/academic-calendar.service';
import { AcademicCalendarDate } from '../academic-calendar/academic-calendar-date';
import { KualiTimeService } from '../kuali-time/kuali-time.service';
import { formatElapsed } from '../kuali-time/kuali-time';
import { EptoService } from '../epto/epto.service';
import { YourPaycheckService } from '../your-paycheck/your-paycheck.service';
import { CampusEvent } from '../campus-events/campus-event';
import { CampusService } from '../campus-services/campus-service';
import { HomeService } from './home.service';
import { NavStateService } from '../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../identity-menu/identity-menu.component';
import { MainSearchComponent } from '../main-search/main-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, HeaderModule, ShellModule, SidenavModule, AdminHeaderModule, FooterComponent, IconDirective, LargeTaskCardComponent, TaskCardComponent, IdentityMenuComponent, MainSearchComponent], // <-- Added AdminHeaderModule to fix NG8001 for <espd-admin-header>
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  protected navState = inject(NavStateService);
  protected kualiTimeService = inject(KualiTimeService);
  protected eptoService = inject(EptoService);
  protected paycheckService = inject(YourPaycheckService);
  protected homeService = inject(HomeService);

  /** Ticks once a second so the Kuali Time widget's running timer stays live. */
  private now = new Date();
  private tickHandle?: ReturnType<typeof setInterval>;

  constructor(
    private campusEventsService: CampusEventsService,
    private academicCalendarService: AcademicCalendarService,
  ) { }

  ngOnInit(): void {
    this.tickHandle = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.tickHandle);
  }

  /** "H:MM:SS" elapsed since clocking in via Kuali Time, or null if clocked out. */
  get kualiElapsedLabel(): string | null {
    return formatElapsed(this.kualiTimeService.clockedInSince, this.now);
  }

  /**
   * A handful of upcoming campus events, skipping ones that have already
   * passed so the home page reads as forward-looking. This is a
   * lightweight prototype approximation -- event dates are display strings,
   * not real Date objects, so this isn't a true "after today" filter.
   */
  get upcomingEvents(): CampusEvent[] {
    return this.campusEventsService.upcomingEvents.slice(1, 4);
  }

  /** A handful of upcoming academic calendar dates for the compact widget below. */
  get upcomingAcademicDates(): AcademicCalendarDate[] {
    return this.academicCalendarService.upcomingDates(3);
  }

  /** Most recently issued pay stub, for the compact widget below. */
  get latestPaycheck() {
    return this.paycheckService.paychecks[0];
  }

  /** Services the user has pinned to Home, in the order they were added. */
  get homeServices(): CampusService[] {
    return this.homeService.homeServices;
  }

  isOnHome(slug: string): boolean {
    return this.homeService.isOnHome(slug);
  }

  toggleHome(slug: string): void {
    this.homeService.toggle(slug);
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
