import { Injectable } from '@angular/core';

import { MarketplaceCategory, MarketplaceListing } from './marketplace-listing';
import { MARKETPLACE_LISTINGS } from './marketplace-directory';

/** Fields needed to post a new listing; the service fills in the id and posted date. */
export interface NewMarketplaceListing {
  title: string;
  category: MarketplaceCategory;
  price: number | null;
  condition?: string;
  description: string;
  photoUrl: string;
  location: string;
  sellerName: string;
  sellerEmail: string;
}

let nextPostedId = 1;

/**
 * Prototype-only, in-memory IU Marketplace store -- mirrors the pattern used
 * by HomeService/TaskCollectionsService elsewhere in this app. Listings
 * posted this session live alongside the seed directory for the rest of the
 * session; nothing is persisted to a backend, and a page refresh resets to
 * the seed set. Saved (favorited) listings are tracked separately from
 * "pinned to Home" -- saving a listing here is a marketplace-scoped watch
 * list, the same way IU Classifieds lets you keep an eye on a posting
 * without it becoming a task on your dashboard.
 */
@Injectable({ providedIn: 'root' })
export class MarketplaceService {
  private listings: MarketplaceListing[] = [...MARKETPLACE_LISTINGS];
  private savedIds = new Set<string>();

  /** All listings, newest first. */
  get allListings(): MarketplaceListing[] {
    return [...this.listings].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  }

  /** Listings the user has saved, newest first. */
  get savedListings(): MarketplaceListing[] {
    return this.allListings.filter(listing => this.savedIds.has(listing.id));
  }

  findById(id: string | null | undefined): MarketplaceListing | undefined {
    return id ? this.listings.find(listing => listing.id === id) : undefined;
  }

  isSaved(id: string): boolean {
    return this.savedIds.has(id);
  }

  toggleSaved(id: string): void {
    if (this.savedIds.has(id)) {
      this.savedIds.delete(id);
    } else {
      this.savedIds.add(id);
    }
  }

  /** Posts a new listing to the top of the feed and returns it (so the caller can navigate to its detail page). */
  add(input: NewMarketplaceListing): MarketplaceListing {
    const listing: MarketplaceListing = {
      ...input,
      id: `posted-${Date.now()}-${nextPostedId++}`,
      postedDaysAgo: 0,
    };
    this.listings = [listing, ...this.listings];
    return listing;
  }
}
