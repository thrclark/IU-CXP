import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';
import { ButtonComponent } from 'espd-common/button';

import { CampusService } from '../campus-services/campus-service';
import { TaskCollection } from '../task-collections/task-collection';
import { TaskCollectionsService } from '../task-collections/task-collections.service';
import { CollectionIconCell } from '../collection-card/collection-card.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { HomeService } from '../home/home.service';
import { NavStateService } from '../nav-state/nav-state.service';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [
    RouterLink,
    HeaderModule,
    ShellModule,
    SidenavModule,
    FooterComponent,
    IconDirective,
    ButtonComponent,
    TaskCardComponent,
  ],
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit, OnDestroy {
  protected navState = inject(NavStateService);

  collection?: TaskCollection;
  services: CampusService[] = [];

  /** Same fixed 2x2 mosaic used on the collection card, scaled up for the detail header. */
  get iconGridCells(): CollectionIconCell[] {
    return Array.from({ length: 4 }, (_, i) => ({ service: this.services[i] ?? null }));
  }

  private paramSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private collectionsService: TaskCollectionsService,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.collection = this.collectionsService.findBySlug(params.get('slug'));
      this.services = this.collection ? this.collectionsService.servicesFor(this.collection) : [];
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

  isOnHome(slug: string): boolean {
    return this.homeService.isOnHome(slug);
  }

  toggleHome(slug: string): void {
    this.homeService.toggle(slug);
  }

  /** Whether every task in this collection is already pinned to Home. */
  get allOnHome(): boolean {
    return this.services.length > 0 && this.services.every(service => this.isOnHome(service.slug));
  }

  /** Adds every task in this collection to Home in one action, or removes them all if they're all already there. */
  toggleAllOnHome(): void {
    const shouldAdd = !this.allOnHome;
    for (const service of this.services) {
      if (shouldAdd && !this.isOnHome(service.slug)) {
        this.homeService.add(service.slug);
      } else if (!shouldAdd && this.isOnHome(service.slug)) {
        this.homeService.remove(service.slug);
      }
    }
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
