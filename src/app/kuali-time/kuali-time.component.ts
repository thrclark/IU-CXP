import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
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
import { KualiTimeService } from './kuali-time.service';
import { CURRENT_PAY_PERIOD_ID, EARN_CODE_LABELS, EarnCode, EntryStatus, PayPeriod, TimeEntry, formatElapsed } from './kuali-time';

type KualiTimeTab = 'clock' | 'time-detail' | 'leave-accrual';

interface MissedPunchForm {
  assignmentId: string;
  date: string;
  timeIn: string;
  timeOut: string;
  note: string;
}

function isoDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

@Component({
  selector: 'app-kuali-time',
  standalone: true,
  imports: [RouterLink, FormsModule, HeaderModule, ShellModule, SidenavModule, FooterComponent, IconDirective, BadgeComponent, IdentityMenuComponent],
  templateUrl: './kuali-time.component.html',
  styleUrls: ['./kuali-time.component.css']
})
export class KualiTimeComponent implements OnInit, OnDestroy {
  protected navState = inject(NavStateService);
  protected kualiTime = inject(KualiTimeService);

  activeTab: KualiTimeTab = 'clock';

  /** Ticks once a second so the running clock-in timer stays live. */
  private now = new Date();
  private tickHandle?: ReturnType<typeof setInterval>;

  missedPunchOpen = false;
  missedPunchForm: MissedPunchForm = this.freshMissedPunchForm();

  ngOnInit(): void {
    this.tickHandle = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.tickHandle);
  }

  setTab(tab: KualiTimeTab): void {
    this.activeTab = tab;
  }

  clockIn(assignmentId: string): void {
    this.kualiTime.clockIn(assignmentId);
  }

  clockOut(): void {
    this.kualiTime.clockOut();
  }

  /** "H:MM:SS" elapsed since the current clock-in, or null if clocked out. */
  get elapsedLabel(): string | null {
    return formatElapsed(this.kualiTime.clockedInSince, this.now);
  }

  /** Today's logged entries, so clocking out visibly lands somewhere on the Clock tab too. */
  get todaysEntries(): TimeEntry[] {
    const today = isoDate(this.now);
    return this.kualiTime.entriesForPeriod(this.kualiTime.selectedPayPeriodId)
      .filter(entry => entry.date === today);
  }

  get selectedPeriodEntries(): TimeEntry[] {
    return this.kualiTime.entriesForPeriod(this.kualiTime.selectedPayPeriodId);
  }

  get selectedPeriodTotalHours(): number {
    return this.kualiTime.totalHoursForPeriod(this.kualiTime.selectedPayPeriodId);
  }

  earnCodeLabel(code: EarnCode): string {
    return EARN_CODE_LABELS[code];
  }

  earnCodeBadgeColor(code: EarnCode): 'primary' | 'warning' | 'info' | 'dark' | 'light' {
    const colors: Record<EarnCode, 'primary' | 'warning' | 'info' | 'dark' | 'light'> = {
      RGH: 'primary',
      OVT: 'warning',
      VAC: 'info',
      SCK: 'dark',
      PER: 'light',
    };
    return colors[code];
  }

  statusBadgeColor(status: EntryStatus): 'light' | 'info' | 'success' {
    const colors: Record<EntryStatus, 'light' | 'info' | 'success'> = {
      Saved: 'light',
      Enroute: 'info',
      Final: 'success',
    };
    return colors[status];
  }

  periodOptionLabel(period: PayPeriod): string {
    return period.id === CURRENT_PAY_PERIOD_ID ? `${period.label} (current)` : period.label;
  }

  openMissedPunch(): void {
    this.missedPunchForm = this.freshMissedPunchForm();
    this.missedPunchOpen = true;
  }

  cancelMissedPunch(): void {
    this.missedPunchOpen = false;
  }

  submitMissedPunch(): void {
    const { assignmentId, date, timeIn, timeOut, note } = this.missedPunchForm;
    if (!date || !timeIn || !timeOut || timeOut <= timeIn) {
      return;
    }
    this.kualiTime.reportMissedPunch({ assignmentId, date, timeIn, timeOut, note });
    this.missedPunchOpen = false;
  }

  private freshMissedPunchForm(): MissedPunchForm {
    return {
      assignmentId: this.kualiTime.selectedAssignmentId,
      date: isoDate(this.now),
      timeIn: '',
      timeOut: '',
      note: '',
    };
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
