import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconDirective } from 'espd-common/icon';

import { MarketplaceListing, marketplacePhotoIcon, marketplacePostedLabel, marketplacePriceLabel } from '../marketplace-listing';

/**
 * A single listing's grid-cell card on the Marketplace browse view --
 * same footprint as app-task-card, but tailored to a classifieds-style
 * listing: a real photo (see marketplacePhotoUrl -- this prototype has no
 * photo upload, so a hotlinked photograph stands in for one), price,
 * category, condition, location/posted-date meta, and a save (heart)
 * action that's scoped to the Marketplace's own saved list rather than
 * "pinned to Home".
 */
@Component({
  selector: 'app-marketplace-listing-card',
  standalone: true,
  imports: [IconDirective, RouterLink],
  templateUrl: './marketplace-listing-card.component.html',
  styleUrls: ['./marketplace-listing-card.component.css']
})
export class MarketplaceListingCardComponent {
  @Input({ required: true }) listing!: MarketplaceListing;
  /** Whether this listing is currently on the user's saved list. */
  @Input() saved = false;
  /** Emitted when the save/heart button is activated. */
  @Output() saveToggle = new EventEmitter<void>();

  /** Set once the hotlinked photo fails to load, swapping in the icon fallback (see marketplacePhotoIcon). */
  photoFailed = false;

  get photoIcon(): string {
    return marketplacePhotoIcon(this.listing);
  }

  onPhotoError(): void {
    this.photoFailed = true;
  }

  get priceLabel(): string {
    return marketplacePriceLabel(this.listing);
  }

  get postedLabel(): string {
    return marketplacePostedLabel(this.listing.postedDaysAgo);
  }
}
