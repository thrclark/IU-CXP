import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';
import { ButtonComponent } from 'espd-common/button';
import { InlineAlertComponent } from 'espd-common/alert';

import { MarketplaceService } from '../marketplace.service';
import { MarketplaceListing, marketplacePhotoIcon, marketplacePostedLabel, marketplacePriceLabel } from '../marketplace-listing';
import { NavStateService } from '../../nav-state/nav-state.service';
import { IdentityMenuComponent } from '../../identity-menu/identity-menu.component';
import { MainSearchComponent } from '../../main-search/main-search.component';

/**
 * A single Marketplace listing's detail page -- price, condition, location,
 * full description, a save/heart action, and a "contact seller" mock
 * message form (mirrors ServiceDetailComponent's feedback-form pattern:
 * prototype only, nothing is actually sent anywhere).
 */
@Component({
  selector: 'app-marketplace-listing-detail',
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
    InlineAlertComponent,
    IdentityMenuComponent,
    MainSearchComponent,
  ],
  templateUrl: './marketplace-listing-detail.component.html',
  styleUrls: ['./marketplace-listing-detail.component.css']
})
export class MarketplaceListingDetailComponent implements OnInit, OnDestroy {
  protected navState = inject(NavStateService);
  private marketplaceService = inject(MarketplaceService);

  listing?: MarketplaceListing;

  contactMessage = '';
  contactSent = false;

  /** Set once the hotlinked photo fails to load, swapping in the icon fallback (see marketplacePhotoIcon). */
  photoFailed = false;

  private paramSubscription?: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.listing = this.marketplaceService.findById(params.get('id'));
      this.contactMessage = '';
      this.contactSent = false;
      this.photoFailed = false;
    });
  }

  get photoIcon(): string {
    return this.listing ? marketplacePhotoIcon(this.listing) : '';
  }

  onPhotoError(): void {
    this.photoFailed = true;
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

  get priceLabel(): string {
    return this.listing ? marketplacePriceLabel(this.listing) : '';
  }

  get postedLabel(): string {
    return this.listing ? marketplacePostedLabel(this.listing.postedDaysAgo) : '';
  }

  get saved(): boolean {
    return this.listing ? this.marketplaceService.isSaved(this.listing.id) : false;
  }

  toggleSaved(): void {
    if (this.listing) {
      this.marketplaceService.toggleSaved(this.listing.id);
    }
  }

  sendMessage(): void {
    if (!this.contactMessage.trim()) {
      return;
    }
    // Prototype only: nothing is sent anywhere yet, just acknowledged in the UI.
    this.contactSent = true;
    this.contactMessage = '';
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
