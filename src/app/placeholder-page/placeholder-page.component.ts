import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

import { CardComponent } from '../card/card.component';
import { NavStateService } from '../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../identity-menu/identity-menu.component';
import { MainSearchComponent } from '../main-search/main-search.component';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [RouterLink, HeaderModule, ShellModule, SidenavModule, FooterComponent, IconDirective, CardComponent, IdentityMenuComponent, MainSearchComponent],
  templateUrl: './placeholder-page.component.html',
  styleUrls: ['./placeholder-page.component.css']
})
export class PlaceholderPageComponent {
  protected navState = inject(NavStateService);

  title: string;
  icon: string;

  constructor(route: ActivatedRoute) {
    this.title = route.snapshot.data['title'] ?? 'Page';
    this.icon = route.snapshot.data['icon'] ?? 'rvt-file';
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
