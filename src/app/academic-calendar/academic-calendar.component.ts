import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';
import { BadgeComponent } from 'espd-common/badge';

import { NavStateService } from '../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../identity-menu/identity-menu.component';
import { MainSearchComponent } from '../main-search/main-search.component';
import { CampusBadge, CAMPUS_NAMES, ALL_CAMPUS_CODES, resolveCampusBadges } from '../campus/campus-badges';
import { AcademicCalendarService, FilterValue } from './academic-calendar.service';
import { AcademicCalendarDate, Semester } from './academic-calendar-date';

/** One row in the campus filter dropdown. */
interface CampusOption {
  code: string;
  label: string;
}

/** Dates for a single semester, in display order -- what the template groups by. */
interface SemesterGroup {
  semester: Semester;
  dates: AcademicCalendarDate[];
}

@Component({
  selector: 'app-academic-calendar',
  standalone: true,
  imports: [RouterLink, FormsModule, HeaderModule, ShellModule, SidenavModule, FooterComponent, IconDirective, BadgeComponent, IdentityMenuComponent, MainSearchComponent],
  templateUrl: './academic-calendar.component.html',
  styleUrls: ['./academic-calendar.component.css']
})
export class AcademicCalendarComponent {
  protected navState = inject(NavStateService);

  /** Every semester represented in the calendar, in chronological order, for the semester dropdown. */
  readonly semesterOptions: Semester[];
  /** Every IU campus, for the campus dropdown. */
  readonly campusOptions: CampusOption[] = ALL_CAMPUS_CODES.map(code => ({ code, label: CAMPUS_NAMES[code] }));

  selectedSemester: FilterValue = 'all';
  selectedCampus: FilterValue = 'all';

  constructor(private academicCalendarService: AcademicCalendarService) {
    this.semesterOptions = this.academicCalendarService.semesters;
  }

  /** Dates matching the current semester + campus filters, chronological. */
  private get filteredDates(): AcademicCalendarDate[] {
    return this.academicCalendarService.filter(this.selectedSemester, this.selectedCampus);
  }

  /**
   * Filtered dates grouped by semester, in the order semesters occur --
   * lets the template show a semester heading whenever "All Semesters" is
   * selected, without a heading repeating or appearing out of order.
   */
  get groupedDates(): SemesterGroup[] {
    const groups: SemesterGroup[] = [];
    for (const date of this.filteredDates) {
      const currentGroup = groups.at(-1);
      if (currentGroup?.semester === date.semester) {
        currentGroup.dates.push(date);
      } else {
        groups.push({ semester: date.semester, dates: [date] });
      }
    }
    return groups;
  }

  /** Whether any date matches the current filters -- drives the empty state. */
  get hasResults(): boolean {
    return this.filteredDates.length > 0;
  }

  campusBadges(date: AcademicCalendarDate): CampusBadge[] {
    return resolveCampusBadges(date.campuses);
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
    if (this.notificationsOpen && !(event.target as HTMLElement).closest('.notification-menu')) {
      this.notificationsOpen = false;
    }
  }
}
