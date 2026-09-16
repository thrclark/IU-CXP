import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { IconDirective } from 'espd-common/icon';

import { CampusService } from '../campus-services/campus-service';
import { ALL_SERVICES } from '../campus-services/service-directory';
import { HomeService } from '../home/home.service';
import { HomeCardOrderService } from '../home/home-card-order.service';
import { HomeWidgetInfo, HOME_WIDGET_INFO } from '../home/home-widget-info';
import { SemanticSearchService } from '../campus-services/semantic-search.service';
import { TaskCollectionsService } from '../task-collections/task-collections.service';
import { TaskCollection } from '../task-collections/task-collection';
import { CollectionIconCell } from '../collection-card/collection-card.component';

/** Cap on how many search results render at once, just to keep the results list tidy. */
const MAX_SEARCH_RESULTS = 30;
/** How long to wait after the user stops typing before running semantic search. */
const SEARCH_DEBOUNCE_MS = 200;
/**
 * Home screen widgets that should be discoverable from the main search,
 * so a user can find and pin them without already being on the Home
 * screen. Recent Notifications is deliberately left out -- it isn't a
 * distinct feature someone would search for by name.
 */
const SEARCHABLE_WIDGETS: HomeWidgetInfo[] = HOME_WIDGET_INFO.filter(widget => widget.id !== 'recent-notifications');

/**
 * The app's main search bar: an omnibox-style input with a live results
 * overlay (curated task collections and individual services, with
 * pin-to-Home actions) that runs everywhere -- originally built for the
 * All Services page, now dropped into every view's <espd-shell-stage> so
 * it's always available, not just there.
 *
 * Self-contained: injects its own HomeService / SemanticSearchService /
 * TaskCollectionsService rather than relying on the host page for state,
 * so it behaves identically no matter which page it's dropped into.
 */
@Component({
  selector: 'app-main-search',
  standalone: true,
  imports: [FormsModule, RouterLink, IconDirective],
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css'],
})
export class MainSearchComponent {
  private homeService = inject(HomeService);
  private cardOrder = inject(HomeCardOrderService);
  private semanticSearch = inject(SemanticSearchService);
  protected collectionsService = inject(TaskCollectionsService);

  searchQuery = '';
  /** Whether the search results overlay is currently shown below the search bar. */
  searchOverlayOpen = false;
  /** Services matching the current search query: exact matches first, semantic matches merged in as they resolve. */
  searchResults: CampusService[] = [];
  /** Whether a semantic search request is currently in flight. */
  searchLoading = false;

  private searchSubject = new Subject<string>();

  constructor() {
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

  /** Task collections matching the current search query, shown ahead of individual services. */
  get searchCollectionResults(): TaskCollection[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }
    return this.collectionsService.activeCollections.filter(collection =>
      collection.title.toLowerCase().includes(query) ||
      collection.eyebrow.toLowerCase().includes(query));
  }

  /** Home screen widgets (My Classes, Kuali Time, ...) matching the current search query. */
  get searchWidgetResults(): HomeWidgetInfo[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }
    return SEARCHABLE_WIDGETS.filter(widget =>
      widget.title.toLowerCase().includes(query) ||
      widget.category.toLowerCase().includes(query));
  }

  /** Same fixed 2x2 mosaic used on the collection card, reused for a collection's search-result row. */
  collectionIconCells(collection: TaskCollection): CollectionIconCell[] {
    const services = this.collectionsService.servicesFor(collection);
    return Array.from({ length: 4 }, (_, i) => ({ service: services[i] ?? null }));
  }

  /** Fast, synchronous substring match against title/category -- shown immediately while semantic search runs. */
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

  /** Whether a widget is currently favorited/pinned to Home (see HomeCardOrderService). */
  isWidgetFavorited(id: HomeWidgetInfo['id']): boolean {
    return this.cardOrder.isWidgetFavorited(id);
  }

  /** Pins/un-pins a widget to Home from the search results. */
  toggleWidgetFavorite(id: HomeWidgetInfo['id']): void {
    this.cardOrder.toggleWidgetFavorite(id);
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

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.searchOverlayOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.searchOverlayOpen && !target.closest('.main-search-wrap')) {
      this.searchOverlayOpen = false;
    }
  }
}
