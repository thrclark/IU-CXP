import { Injectable, inject } from '@angular/core';

import { TaskCollection } from '../task-collections/task-collection';
import { TaskCollectionsService } from '../task-collections/task-collections.service';

/**
 * Tracks which task collections the user has pinned to "My Home" from
 * search results. Mirrors HomeService's pinned-services list, but kept
 * separate since collections and individual services are distinct records
 * (see TaskCollection vs CampusService).
 *
 * Prototype-only: state lives in memory for the session and isn't
 * persisted anywhere.
 */
@Injectable({ providedIn: 'root' })
export class HomeCollectionsService {
  private collectionsService = inject(TaskCollectionsService);

  private slugs: string[] = [];

  /** Full collection records for everything currently pinned to Home, in pin order. */
  get homeCollections(): TaskCollection[] {
    return this.slugs
      .map(slug => this.collectionsService.findBySlug(slug))
      .filter((collection): collection is TaskCollection => !!collection);
  }

  isOnHome(slug: string): boolean {
    return this.slugs.includes(slug);
  }

  add(slug: string): void {
    if (!this.slugs.includes(slug)) {
      this.slugs = [...this.slugs, slug];
    }
  }

  remove(slug: string): void {
    this.slugs = this.slugs.filter(existing => existing !== slug);
  }

  toggle(slug: string): void {
    if (this.isOnHome(slug)) {
      this.remove(slug);
    } else {
      this.add(slug);
    }
  }
}
