import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';
import { ButtonComponent } from 'espd-common/button';

import { HomeWidgetInfo, findHomeWidgetInfo } from '../home-widget-info';
import { NavStateService } from '../../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../../identity-menu/identity-menu.component';
import { MainSearchComponent } from '../../main-search/main-search.component';

/**
 * "More information" page for one of the 7 Home screen widget cards,
 * reached via each card's info button (/home/widgets/:id). Mirrors
 * ServiceDetailComponent's layout, but reads from the lighter
 * HomeWidgetInfo data model instead of the CampusService catalog, since
 * these widgets are custom-built features of this app rather than
 * external One.IU services.
 */
@Component({
  selector: 'app-widget-detail',
  standalone: true,
  imports: [
    RouterLink,
    HeaderModule,
    ShellModule,
    SidenavModule,
    FooterComponent,
    IconDirective,
    ButtonComponent,
    IdentityMenuComponent,
    MainSearchComponent,
  ],
  templateUrl: './widget-detail.component.html',
  styleUrls: ['./widget-detail.component.css']
})
export class WidgetDetailComponent implements OnInit, OnDestroy {
  protected navState = inject(NavStateService);

  widget?: HomeWidgetInfo;

  private paramSubscription?: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.widget = findHomeWidgetInfo(params.get('id'));
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
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
