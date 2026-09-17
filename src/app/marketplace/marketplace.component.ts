import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';
import { ButtonComponent } from 'espd-common/button';

import { MarketplaceListingCardComponent } from './marketplace-listing-card/marketplace-listing-card.component';
import { MarketplaceService } from './marketplace.service';
import { MARKETPLACE_CATEGORIES, MarketplaceCategory, MarketplaceListing } from './marketplace-listing';
import { NavStateService } from '../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../identity-menu/identity-menu.component';
import { MainSearchComponent } from '../main-search/main-search.component';

/** "All" plus every real category, for the filter chip row. */
type MarketplaceFilter = 'All' | MarketplaceCategory;

/**
 * The IU Marketplace browse view -- a prototype of IU Classifieds
 * (OneStart Classifieds): a searchable, filterable feed of listings across
 * six categories, with a save/heart action and a "Post a listing" entry
 * point. See MarketplaceService for how listing and saved-state data
 * behaves in this prototype.
 */
@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    HeaderModule,
    ShellModule,
    SidenavModule,
    FooterComponent,
    IconDirective,
    ButtonComponent,
    MarketplaceListingCardComponent,
    IdentityMenuComponent,
    MainSearchComponent,
  ],
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent {
  protected navState = inject(NavStateService);
  private marketplaceService = inject(MarketplaceService);

  /** Category chips shown above the grid, "All" first. */
  readonly filters: MarketplaceFilter[] = ['All', ...MARKETPLACE_CATEGORIES];

  searchQuery = '';
  activeFilter: MarketplaceFilter = 'All';
  /** When true, the grid shows only the user's saved listings instead of the full feed. */
  savedOnly = false;

  /** Listings currently shown in the grid, after the saved-only, category, and search filters are applied. */
  get listings(): MarketplaceListing[] {
    const source = this.savedOnly ? this.marketplaceService.savedListings : this.marketplaceService.allListings;
    const query = this.searchQuery.trim().toLowerCase();

    return source.filter(listing => {
      if (this.activeFilter !== 'All' && listing.category !== this.activeFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      return listing.title.toLowerCase().includes(query)
        || listing.description.toLowerCase().includes(query)
        || listing.location.toLowerCase().includes(query);
    });
  }

  get savedCount(): number {
    return this.marketplaceService.savedListings.length;
  }

  setFilter(filter: MarketplaceFilter): void {
    this.activeFilter = filter;
  }

  toggleSavedOnly(): void {
    this.savedOnly = !this.savedOnly;
  }

  isSaved(id: string): boolean {
    return this.marketplaceService.isSaved(id);
  }

  toggleSaved(id: string): void {
    this.marketplaceService.toggleSaved(id);
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
