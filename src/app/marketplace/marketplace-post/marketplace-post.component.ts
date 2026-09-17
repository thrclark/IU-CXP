import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';
import { ButtonComponent } from 'espd-common/button';

import { MarketplaceService } from '../marketplace.service';
import { MARKETPLACE_CATEGORIES, MARKETPLACE_CATEGORY_PHOTO_SEEDS, MarketplaceCategory, marketplacePhotoUrl } from '../marketplace-listing';
import { PersonaService } from '../../persona/persona.service';
import { NavStateService } from '../../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../../identity-menu/identity-menu.component';
import { MainSearchComponent } from '../../main-search/main-search.component';

/** How the poster wants to price the listing -- drives which price field(s) show. */
type PriceMode = 'amount' | 'free' | 'contact';

/**
 * Curated photo choices for the hotlinked placeholder photo service (see
 * marketplacePhotoUrl) -- stands in for a photo, since this prototype has
 * no real photo upload. Each option's seed is combined with a per-form
 * random suffix (see photoSeedSuffix) so two listings posted with the same
 * choice still get different photos.
 */
const PHOTO_SEED_OPTIONS: { seed: string; label: string; icon: string }[] = [
  { seed: 'general-item', label: 'General item', icon: 'bag-shopping' },
  { seed: 'textbook', label: 'Book / textbook', icon: 'book' },
  { seed: 'furniture', label: 'Furniture', icon: 'couch' },
  { seed: 'couch', label: 'Couch', icon: 'couch' },
  { seed: 'bed', label: 'Bed', icon: 'bed' },
  { seed: 'kitchen-appliance', label: 'Kitchen / appliance', icon: 'kitchen-set' },
  { seed: 'bicycle', label: 'Bike', icon: 'bicycle' },
  { seed: 'electronics', label: 'Electronics / gaming', icon: 'gamepad' },
  { seed: 'instrument', label: 'Instrument', icon: 'guitar' },
  { seed: 'school-supplies', label: 'School supplies', icon: 'calculator' },
  { seed: 'housing', label: 'Housing', icon: 'building' },
  { seed: 'job-gig', label: 'Job / gig', icon: 'briefcase' },
  { seed: 'pet', label: 'Pet-related', icon: 'dog' },
  { seed: 'food-drink', label: 'Food & drink', icon: 'mug-hot' },
  { seed: 'service', label: 'Service', icon: 'toolbox' },
  { seed: 'giveaway', label: 'Free giveaway', icon: 'box-open' },
  { seed: 'moving-boxes', label: 'Moving / boxes', icon: 'boxes-stacked' },
];

/**
 * "Post a listing" form -- creates a new IU Marketplace listing and drops
 * it into MarketplaceService's in-memory feed (prototype only: it lives
 * for the rest of the session, same as everywhere else in this app).
 */
@Component({
  selector: 'app-marketplace-post',
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
    IdentityMenuComponent,
    MainSearchComponent,
  ],
  templateUrl: './marketplace-post.component.html',
  styleUrls: ['./marketplace-post.component.css']
})
export class MarketplacePostComponent {
  protected navState = inject(NavStateService);
  private marketplaceService = inject(MarketplaceService);
  private personaService = inject(PersonaService);
  private router = inject(Router);

  readonly categories: MarketplaceCategory[] = MARKETPLACE_CATEGORIES;
  readonly photoOptions = PHOTO_SEED_OPTIONS;

  title = '';
  category: MarketplaceCategory = MARKETPLACE_CATEGORIES[0];
  priceMode: PriceMode = 'amount';
  priceAmount: number | null = null;
  condition = '';
  location = '';
  description = '';
  photoSeed = PHOTO_SEED_OPTIONS[0].seed;
  /** Keeps this listing's photo distinct from another listing posted with the same photo choice. */
  private readonly photoSeedSuffix = Math.random().toString(36).slice(2, 8);

  sellerName = this.personaService.current?.displayName ?? '';
  sellerEmail = this.personaService.current ? `${this.personaService.current.username}@iu.edu` : '';

  submitted = false;

  /** Preview of the photo that will be used for this listing, shown next to the Photo field. */
  get photoPreviewUrl(): string {
    return marketplacePhotoUrl(`${this.photoSeed}-${this.photoSeedSuffix}`);
  }

  /** Icon fallback for the preview, shown if the hotlinked preview photo fails to load. */
  get photoPreviewIcon(): string {
    return this.photoOptions.find(option => option.seed === this.photoSeed)?.icon ?? 'bag-shopping';
  }

  /** Set once the hotlinked preview photo fails to load; reset whenever the photo choice changes. */
  photoPreviewFailed = false;

  onPhotoPreviewError(): void {
    this.photoPreviewFailed = true;
  }

  get isValid(): boolean {
    if (!this.title.trim() || !this.location.trim() || !this.description.trim()) {
      return false;
    }
    if (!this.sellerName.trim() || !this.sellerEmail.trim()) {
      return false;
    }
    if (this.priceMode === 'amount' && (this.priceAmount === null || this.priceAmount < 0)) {
      return false;
    }
    return true;
  }

  /** Switches the photo seed to the category's default whenever the poster picks a new category. */
  onCategoryChange(): void {
    this.photoSeed = MARKETPLACE_CATEGORY_PHOTO_SEEDS[this.category];
    this.photoPreviewFailed = false;
  }

  /** Resets the preview's failed state whenever the poster picks a different photo choice directly. */
  onPhotoSeedChange(): void {
    this.photoPreviewFailed = false;
  }

  submit(): void {
    this.submitted = true;
    if (!this.isValid) {
      return;
    }

    const price = this.priceMode === 'free' ? 0 : this.priceMode === 'contact' ? null : this.priceAmount;

    const listing = this.marketplaceService.add({
      title: this.title.trim(),
      category: this.category,
      price,
      condition: this.condition.trim() || undefined,
      description: this.description.trim(),
      photoUrl: this.photoPreviewUrl,
      location: this.location.trim(),
      sellerName: this.sellerName.trim(),
      sellerEmail: this.sellerEmail.trim(),
    });

    this.router.navigate(['/student-life/marketplace', listing.id]);
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
