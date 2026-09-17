/**
 * A single item, sublet, gig, or service posted to the IU Marketplace --
 * modeled after IU Classifieds (OneStart Classifieds), the university's
 * long-running community board for buying, selling, and trading between
 * students and employees. This is a prototype: everything here lives in
 * memory for the session (see MarketplaceService) rather than a backend.
 */
export type MarketplaceCategory =
  | 'For Sale'
  | 'Textbooks & Supplies'
  | 'Housing & Sublets'
  | 'Jobs & Gigs'
  | 'Services'
  | 'Free Stuff';

/** Every category a listing can belong to, in the order shown in the category filter. */
export const MARKETPLACE_CATEGORIES: MarketplaceCategory[] = [
  'For Sale',
  'Textbooks & Supplies',
  'Housing & Sublets',
  'Jobs & Gigs',
  'Services',
  'Free Stuff',
];

/**
 * Default photo seed for a category, used when a listing doesn't specify
 * its own (see marketplacePhotoUrl for how a seed becomes a photo URL).
 */
export const MARKETPLACE_CATEGORY_PHOTO_SEEDS: Record<MarketplaceCategory, string> = {
  'For Sale': 'for-sale',
  'Textbooks & Supplies': 'textbooks',
  'Housing & Sublets': 'apartment',
  'Jobs & Gigs': 'job',
  'Services': 'service',
  'Free Stuff': 'giveaway',
};

/**
 * Builds a hotlinked photo URL for a listing -- a real, always-loading
 * photograph rather than a bundled asset, since this environment can't
 * reach the open web to download and vet real photo files into the repo.
 * Picsum Photos serves from its own fixed catalog of real photographs,
 * keyed by an arbitrary seed string, and always returns a valid image for
 * any seed -- unlike a tag-matching service, there's no keyword to 404 on.
 * The tradeoff is the photo isn't guaranteed to depict the seed's literal
 * subject, only to be a genuine photograph; pick a distinct seed per
 * listing (its id works well) so the grid doesn't repeat the same photo
 * everywhere. The hotlink can still fail outright when the network itself
 * is unreachable (a locked-down campus network, an offline demo), which is
 * what marketplacePhotoIcon below is for.
 */
export function marketplacePhotoUrl(seed: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/480/320`;
}

/**
 * Per-category icon shown in place of a listing's photo when the hotlinked
 * photo fails to load. Drawn from the icon font already loaded for the
 * rest of the app (see IconDirective / espdIcon), so the fallback costs
 * nothing extra to ship and never goes stale like a bundled placeholder
 * image would. A listing can point to a closer-fitting icon of its own via
 * `photoIcon`; anything without one just uses its category's icon.
 */
export const MARKETPLACE_CATEGORY_ICONS: Record<MarketplaceCategory, string> = {
  'For Sale': 'bag-shopping',
  'Textbooks & Supplies': 'book',
  'Housing & Sublets': 'building',
  'Jobs & Gigs': 'briefcase',
  'Services': 'toolbox',
  'Free Stuff': 'box-open',
};

/** Resolves which icon to show for a listing's photo fallback. */
export function marketplacePhotoIcon(listing: Pick<MarketplaceListing, 'category' | 'photoIcon'>): string {
  return listing.photoIcon ?? MARKETPLACE_CATEGORY_ICONS[listing.category];
}

export interface MarketplaceListing {
  /** URL-friendly identifier used for routing, e.g. "mini-fridge". */
  id: string;
  title: string;
  category: MarketplaceCategory;
  /** Listing price in dollars. 0 means free; null means "contact for price" (typical for Jobs & Gigs and some Services). */
  price: number | null;
  /** Item condition, shown for physical goods (For Sale, Textbooks & Supplies, Free Stuff). Omitted for Housing, Jobs & Gigs, and Services. */
  condition?: string;
  description: string;
  /** Photo shown on the card and detail page -- a hotlinked real photograph (see marketplacePhotoUrl), since this prototype has no real photo upload. */
  photoUrl: string;
  /** Icon shown instead of `photoUrl` if the hotlinked photo fails to load (see marketplacePhotoIcon). Omit to just use the category's icon. */
  photoIcon?: string;
  /** Where the listing is based, e.g. a campus plus neighborhood or building. */
  location: string;
  sellerName: string;
  sellerEmail: string;
  /** How many days ago this was posted. Drives both the relative display label and newest-first sorting. */
  postedDaysAgo: number;
}

/** Human-readable price, e.g. "$120", "Free", or "Contact for price". */
export function marketplacePriceLabel(listing: Pick<MarketplaceListing, 'price'>): string {
  if (listing.price === null) {
    return 'Contact for price';
  }
  if (listing.price === 0) {
    return 'Free';
  }
  return `$${listing.price.toLocaleString()}`;
}

/** Human-readable "posted X ago" label from a day count. */
export function marketplacePostedLabel(daysAgo: number): string {
  if (daysAgo <= 0) {
    return 'Posted today';
  }
  if (daysAgo === 1) {
    return 'Posted yesterday';
  }
  return `Posted ${daysAgo} days ago`;
}
