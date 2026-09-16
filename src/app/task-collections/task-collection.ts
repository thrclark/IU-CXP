/**
 * A curated bundle of existing services grouped around a role or moment in
 * the calendar — modeled after one.iu's "task collections," which surface a
 * handful of relevant tasks together instead of making someone search for
 * each one individually.
 *
 * Collections don't duplicate service data; they just reference existing
 * `CampusService` records by slug (see `task-collection-directory.ts`).
 */
export type TaskCollectionKind = 'role' | 'seasonal';

export interface TaskCollection {
  /** URL-friendly identifier used for routing, e.g. "new-employee-checklist". */
  slug: string;
  title: string;
  /** Whether this collection is tied to a role/status or to a point in the calendar. */
  kind: TaskCollectionKind;
  /**
   * Short line explaining why this collection is being surfaced, e.g.
   * "Curated for new employees" or "Active Aug 18 – Sept 5". Shown under
   * the title so the "why am I seeing this" question is answered immediately.
   */
  eyebrow: string;
  /** One or two sentences shown on the collection's own detail page. */
  description: string;
  /** espd icon name used where a single-icon identity would be needed (kept for reference; cards use a mosaic of member-task icons instead). */
  icon: string;
  /** Slugs of the CampusService records that make up this collection, in display order. */
  serviceSlugs: string[];
}
