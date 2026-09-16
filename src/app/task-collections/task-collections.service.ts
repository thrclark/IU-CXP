import { Injectable } from '@angular/core';

import { CampusService } from '../campus-services/campus-service';
import { findServiceBySlug } from '../campus-services/service-directory';
import { TaskCollection } from './task-collection';
import { TASK_COLLECTIONS, findCollectionBySlug } from './task-collection-directory';

/**
 * Tracks which curated task collections are currently shown on the "All
 * Services" page. Prototype-only: dismissal state lives in memory for the
 * session and isn't persisted anywhere. Unlike individual services,
 * collections aren't user-added — they're surfaced automatically (by role
 * or time of year) and can only be dismissed, not re-added, without a
 * page refresh.
 */
@Injectable({ providedIn: 'root' })
export class TaskCollectionsService {
  private dismissedSlugs = new Set<string>();

  /** All collections not currently dismissed, in catalog order. */
  get activeCollections(): TaskCollection[] {
    return TASK_COLLECTIONS.filter(collection => !this.dismissedSlugs.has(collection.slug));
  }

  findBySlug(slug: string | null | undefined): TaskCollection | undefined {
    return findCollectionBySlug(slug);
  }

  /** Resolves a collection's service slugs to full CampusService records, dropping any that don't resolve. */
  servicesFor(collection: TaskCollection): CampusService[] {
    return collection.serviceSlugs
      .map(slug => findServiceBySlug(slug))
      .filter((service): service is CampusService => !!service);
  }

  isDismissed(slug: string): boolean {
    return this.dismissedSlugs.has(slug);
  }

  dismiss(slug: string): void {
    this.dismissedSlugs = new Set(this.dismissedSlugs).add(slug);
  }
}
