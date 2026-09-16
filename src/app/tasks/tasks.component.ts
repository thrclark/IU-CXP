import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from 'espd-common/button';
import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { AdminHeaderModule } from 'espd-common/admin-header';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

import { TaskCardComponent } from '../task-card/task-card.component';
import { CollectionCardComponent } from '../collection-card/collection-card.component';
import { CampusService } from '../campus-services/campus-service';
import { HomeService } from '../home/home.service';
import { NavStateService } from '../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../identity-menu/identity-menu.component';
import { MainSearchComponent } from '../main-search/main-search.component';
import { TaskCollectionsService } from '../task-collections/task-collections.service';
import { TaskCollection } from '../task-collections/task-collection';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, ButtonComponent, HeaderModule, ShellModule, SidenavModule, AdminHeaderModule, FooterComponent, IconDirective, TaskCardComponent, CollectionCardComponent, IdentityMenuComponent, MainSearchComponent], // <-- Added AdminHeaderModule to fix NG8001 for <espd-admin-header>
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  protected navState = inject(NavStateService);

  constructor(
    private homeService: HomeService,
    protected collectionsService: TaskCollectionsService,
  ) { }

  /** Services currently pinned to "My Home". */
  get campusServices(): CampusService[] {
    return this.homeService.homeServices;
  }

  /** Curated task collections currently surfaced on this page (not yet dismissed). */
  get taskCollections(): TaskCollection[] {
    return this.collectionsService.activeCollections;
  }

  collectionServices(collection: TaskCollection): CampusService[] {
    return this.collectionsService.servicesFor(collection);
  }

  dismissCollection(slug: string): void {
    this.collectionsService.dismiss(slug);
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
