import { Injectable } from '@angular/core';

import { AcademicCalendarDate, ACADEMIC_CALENDAR_DATES, Semester } from './academic-calendar-date';

/** Sentinel meaning "don't filter on this dimension." */
export type FilterValue = string | 'all';

/**
 * Mock academic calendar service. Prototype-only: data is a static,
 * in-memory list (see academic-calendar-date.ts) standing in for a future
 * registrar feed/API. Both the compact "Upcoming Dates" widget on Home and
 * the full, filterable Academic Calendar page read from this one service so
 * they never drift out of sync with each other.
 */
@Injectable({ providedIn: 'root' })
export class AcademicCalendarService {
  private readonly dates: AcademicCalendarDate[] = [...ACADEMIC_CALENDAR_DATES]
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  /** Every date, chronological. */
  get allDates(): AcademicCalendarDate[] {
    return [...this.dates];
  }

  /** Semesters represented in the data, in chronological order. */
  get semesters(): Semester[] {
    const seen = new Set<Semester>();
    for (const date of this.dates) {
      seen.add(date.semester);
    }
    return [...seen];
  }

  /**
   * The next `limit` dates on or after `referenceDate`, soonest first. Used
   * by the compact Home widget, which only has room for a handful of items
   * and shouldn't show ones that have already passed.
   */
  upcomingDates(limit: number, referenceDate: Date = new Date()): AcademicCalendarDate[] {
    const today = referenceDate.toISOString().slice(0, 10);
    return this.dates.filter(date => date.sortKey >= today).slice(0, limit);
  }

  /**
   * Dates matching both filters. Pass 'all' (or omit) to leave a dimension
   * unrestricted -- this is what backs the semester/campus dropdowns on the
   * full Academic Calendar page.
   */
  filter(semester: FilterValue = 'all', campus: FilterValue = 'all'): AcademicCalendarDate[] {
    return this.dates.filter(date =>
      (semester === 'all' || date.semester === semester) &&
      (campus === 'all' || date.campuses.includes(campus)));
  }
}
