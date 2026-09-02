import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

interface MapFilter {
  key: string;
  label: string;
  description: string;
  icon: string;
  enabled: boolean;
}

/**
 * No-API-key Google Maps embed (the "output=embed" query form), centered on
 * the IU Bloomington campus. Swap this for the Google Maps JavaScript API +
 * a Places/marker data source if per-category pins ever need to render for
 * real — the embed below can't take live layer toggles from the page.
 */
const IU_BLOOMINGTON_MAP_EMBED_URL =
  'https://www.google.com/maps?q=Indiana+University+Bloomington,+Bloomington,+IN&z=15&output=embed';

@Component({
  selector: 'app-maps-page',
  standalone: true,
  imports: [RouterLink, FormsModule, HeaderModule, ShellModule, SidenavModule, FooterComponent, IconDirective],
  templateUrl: './maps-page.component.html',
  styleUrls: ['./maps-page.component.css']
})
export class MapsPageComponent {
  mapUrl: SafeResourceUrl;

  filters: MapFilter[] = [
    {
      key: 'buildings',
      label: 'Campus Buildings',
      description: 'Academic buildings, residence halls, and administrative offices.',
      icon: 'rvt-building',
      enabled: true,
    },
    {
      key: 'dining',
      label: 'Dining Locations',
      description: 'Dining halls, cafes, and campus restaurants.',
      icon: 'rvt-heart',
      enabled: true,
    },
    {
      key: 'amenities',
      label: 'Other Amenities',
      description: 'Parking, libraries, recreation centers, and other campus services.',
      icon: 'rvt-star',
      enabled: true,
    },
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(IU_BLOOMINGTON_MAP_EMBED_URL);
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
