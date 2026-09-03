import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';
import { BadgeComponent } from 'espd-common/badge';
import { ButtonComponent } from 'espd-common/button';
import { InlineAlertComponent } from 'espd-common/alert';

import { CampusBadge, resolveCampusBadges } from '../campus/campus-badges';
import { CampusService } from '../campus-services/campus-service';
import { findServiceBySlug } from '../campus-services/service-directory';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    HeaderModule,
    ShellModule,
    SidenavModule,
    FooterComponent,
    IconDirective,
    BadgeComponent,
    ButtonComponent,
    InlineAlertComponent,
  ],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  service?: CampusService;
  campusBadges: CampusBadge[] = [];

  feedbackText = '';
  feedbackSubmitted = false;

  private paramSubscription?: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.service = findServiceBySlug(params.get('slug'));
      this.campusBadges = this.service ? resolveCampusBadges(this.service.campuses) : [];
      this.feedbackText = '';
      this.feedbackSubmitted = false;
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

  submitFeedback(): void {
    if (!this.feedbackText.trim()) {
      return;
    }
    // Prototype only: nothing is sent anywhere yet, just acknowledged in the UI.
    this.feedbackSubmitted = true;
    this.feedbackText = '';
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
