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
import { EptoService } from './epto.service';
import { DocumentStatus, LEAVE_CODE_LABELS, LeaveCode } from './epto';
import { isoDate } from '../shared/date-format';

type EptoTab = 'monthly-calendar' | 'time-off-detail';

interface AddDatesForm {
  startDate: string;
  endDate: string;
  code: LeaveCode;
  hoursPerDay: number;
  description: string;
}

const BASIC_LEAVE_CODES: LeaveCode[] = ['PTO', 'SCK', 'HOL', 'HON'];

@Component({
  selector: 'app-epto',
  standalone: true,
  imports: [RouterLink, FormsModule, HeaderModule, ShellModule, SidenavModule, FooterComponent, IconDirective, BadgeComponent, IdentityMenuComponent],
  templateUrl: './epto.component.html',
  styleUrls: ['./epto.component.css']
})
export class EptoComponent {
  protected navState = inject(NavStateService);
  protected epto = inject(EptoService);

  activeTab: EptoTab = 'monthly-calendar';
  readonly basicLeaveCodes = BASIC_LEAVE_CODES;

  addDatesOpen = false;
  addDatesForm: AddDatesForm = this.freshAddDatesForm();

  setTab(tab: EptoTab): void {
    this.activeTab = tab;
  }

  openAddDates(): void {
    this.addDatesForm = this.freshAddDatesForm();
    this.addDatesOpen = true;
  }

  cancelAddDates(): void {
    this.addDatesOpen = false;
  }

  submitAddDates(): void {
    const { startDate, endDate, code, hoursPerDay, description } = this.addDatesForm;
    if (!startDate || !endDate || endDate < startDate || hoursPerDay <= 0) {
      return;
    }
    const added = this.epto.addDates({ startDate, endDate, code, hoursPerDay, description });
    if (added.length) {
      this.addDatesOpen = false;
    }
  }

  removeEntry(entryId: string): void {
    this.epto.removeEntry(entryId);
  }

  submitMonth(): void {
    this.epto.submitCurrentMonth();
  }

  leaveCodeLabel(code: LeaveCode): string {
    return LEAVE_CODE_LABELS[code];
  }

  leaveCodeBadgeColor(code: LeaveCode): 'primary' | 'dark' | 'info' | 'warning' | 'light' {
    const colors: Record<LeaveCode, 'primary' | 'dark' | 'info' | 'warning' | 'light'> = {
      PTO: 'primary',
      SCK: 'dark',
      HOL: 'info',
      HON: 'warning',
      OTH: 'light',
    };
    return colors[code];
  }

  statusBadgeColor(status: DocumentStatus): 'light' | 'info' | 'success' {
    const colors: Record<DocumentStatus, 'light' | 'info' | 'success'> = {
      'Not Submitted': 'light',
      'Submitted': 'info',
      'Approved': 'success',
    };
    return colors[status];
  }

  private freshAddDatesForm(): AddDatesForm {
    const today = isoDate(new Date());
    return {
      startDate: today,
      endDate: today,
      code: 'PTO',
      hoursPerDay: 8,
      description: '',
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
