import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { ButtonComponent } from 'espd-common/button';
import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { AdminHeaderModule } from 'espd-common/admin-header';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

import { TaskCardComponent } from '../task-card/task-card.component';
import { CollectionCardComponent, CollectionIconCell } from '../collection-card/collection-card.component';
import { CampusService } from '../campus-services/campus-service';
import { ALL_SERVICES } from '../campus-services/service-directory';
import { HomeService } from '../home/home.service';
import { NavStateService } from '../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../identity-menu/identity-menu.component';
import { SemanticSearchService } from '../campus-services/semantic-search.service';
import { TaskCollectionsService } from '../task-collections/task-collections.service';
import { TaskCollection } from '../task-collections/task-collection';

/** Cap on how many search results render at once, just to keep the results grid tidy. */
const MAX_SEARCH_RESULTS = 30;
/** How long to wait after the user stops typing before running semantic search. */
const SEARCH_DEBOUNCE_MS = 200;

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, FormsModule, ButtonComponent, HeaderModule, ShellModule, SidenavModule, AdminHeaderModule, FooterComponent, IconDirective, TaskCardComponent, CollectionCardComponent, IdentityMenuComponent], // <-- Added AdminHeaderModule to fix NG8001 for <espd-admin-header>
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  protected navState = inject(NavStateService);

  constructor(
    private homeService: HomeService,
    private semanticSearch: SemanticSearchService,
    protected collectionsService: TaskCollectionsService,
  ) {
    // Exact/substring matches render instantly; semantic matches (which
    // need a model + embedding round trip) stream in a moment later and get
    // merged into the same list. See SemanticSearchService for why this
    // works without a backend.
    this.searchSubject.pipe(
      debounceTime(SEARCH_DEBOUNCE_MS),
      switchMap(query => {
        const trimmed = query.trim();
        this.searchResults = this.exactMatches(trimmed);

        if (!trimmed) {
          this.searchLoading = false;
          return of<CampusService[]>([]);
        }

        this.searchLoading = true;
        return this.semanticSearch.search(trimmed, MAX_SEARCH_RESULTS);
      }),
    ).subscribe(semanticResults => {
      this.searchLoading = false;
      if (semanticResults.length) {
        this.searchResults = this.mergeUniqueBySlug(this.searchResults, semanticResults, MAX_SEARCH_RESULTS);
      }
    });
  }

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

  /** Same fixed 2x2 mosaic used on the collection card, reused for a collection's search-result row. */
  collectionIconCells(collection: TaskCollection): CollectionIconCell[] {
    const services = this.collectionServices(collection);
    return Array.from({ length: 4 }, (_, i) => ({ service: services[i] ?? null }));
  }

  dismissCollection(slug: string): void {
    this.collectionsService.dismiss(slug);
  }

  // --- Home search ---
  searchQuery = '';
  /** Whether the search results overlay is currently shown below the search bar. */
  searchOverlayOpen = false;
  /** Services matching the current search query: exact matches first, semantic matches merged in as they resolve. */
  searchResults: CampusService[] = [];
  /** Whether a semantic search request is currently in flight. */
  searchLoading = false;

  private searchSubject = new Subject<string>();

  /** Fast, synchronous substring match against title/category — shown immediately while semantic search runs. */
  private exactMatches(query: string): CampusService[] {
    const normalized = query.toLowerCase();
    if (!normalized) {
      return [];
    }
    return ALL_SERVICES
      .filter(service =>
        service.title.toLowerCase().includes(normalized) ||
        service.category.toLowerCase().includes(normalized))
      .slice(0, MAX_SEARCH_RESULTS);
  }

  /** Task collections matching the current search query, shown ahead of individual services. */
  get searchCollectionResults(): TaskCollection[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }
    return this.taskCollections.filter(collection =>
      collection.title.toLowerCase().includes(query) ||
      collection.eyebrow.toLowerCase().includes(query));
  }

  /** Appends services from `extra` that aren't already in `primary`, up to `limit` total. */
  private mergeUniqueBySlug(primary: CampusService[], extra: CampusService[], limit: number): CampusService[] {
    const merged = [...primary];
    const seen = new Set(primary.map(service => service.slug));
    for (const service of extra) {
      if (merged.length >= limit) break;
      if (seen.has(service.slug)) continue;
      seen.add(service.slug);
      merged.push(service);
    }
    return merged;
  }

  isOnHome(slug: string): boolean {
    return this.homeService.isOnHome(slug);
  }

  toggleHome(slug: string): void {
    this.homeService.toggle(slug);
  }

  onSearchInput(): void {
    this.searchOverlayOpen = this.searchQuery.trim().length > 0;
    this.searchSubject.next(this.searchQuery);
  }

  onSearchFocus(): void {
    if (this.searchQuery.trim()) {
      this.searchOverlayOpen = true;
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
    this.searchOverlayOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.notificationsOpen && !target.closest('.notification-menu')) {
      this.notificationsOpen = false;
    }
    if (this.searchOverlayOpen && !target.closest('.main-search-wrap')) {
      this.searchOverlayOpen = false;
    }
  }
}
