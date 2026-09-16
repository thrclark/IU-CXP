import { Component, HostListener, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

import { NavStateService } from '../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../identity-menu/identity-menu.component';
import { MainSearchComponent } from '../main-search/main-search.component';
import { YourPaycheckService } from './your-paycheck.service';
import { Paycheck } from './your-paycheck';

@Component({
  selector: 'app-your-paycheck',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe, HeaderModule, ShellModule, SidenavModule, FooterComponent, IconDirective, IdentityMenuComponent, MainSearchComponent],
  templateUrl: './your-paycheck.component.html',
  styleUrls: ['./your-paycheck.component.css']
})
export class YourPaycheckComponent {
  protected navState = inject(NavStateService);
  protected paycheck = inject(YourPaycheckService);

  get selected(): Paycheck {
    return this.paycheck.selectedPaycheck;
  }

  /** e.g. "Aug 1, 2026". */
  formatDate(iso: string): string {
    return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
