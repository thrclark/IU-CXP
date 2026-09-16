import { Injectable } from '@angular/core';

import { ALL_CAMPUS_CODES, CAMPUS_NAMES } from './campus-badges';

export const ALL_CAMPUSES = 'ALL' as const;

/** A single choice in the campus switcher: either "All Campuses" or one system campus. */
export interface CampusOption {
  code: string;
  label: string;
}

/**
 * App-wide "which campus am I on" preference, shown and changeable from the
 * header on every view (see CampusSelectorComponent). This is a prototype-only,
 * in-memory preference -- there's no per-user persistence or backend behind
 * it, and for now it doesn't drive any feature's data filtering on its own
 * (Academic Calendar and Campus Events keep their own local filters).
 */
@Injectable({ providedIn: 'root' })
export class CampusSelectionService {
  /** Every choice the switcher offers, "All Campuses" first. */
  readonly options: CampusOption[] = [
    { code: ALL_CAMPUSES, label: 'All Campuses' },
    ...ALL_CAMPUS_CODES.map(code => ({ code, label: CAMPUS_NAMES[code] })),
  ];

  private selectedCode: string = ALL_CAMPUSES;

  get current(): string {
    return this.selectedCode;
  }

  get isAllCampuses(): boolean {
    return this.selectedCode === ALL_CAMPUSES;
  }

  /** Label for the currently-selected campus, e.g. "All Campuses" or "IU Bloomington". */
  get currentLabel(): string {
    return this.options.find(option => option.code === this.selectedCode)?.label ?? 'All Campuses';
  }

  setCampus(code: string): void {
    if (this.options.some(option => option.code === code)) {
      this.selectedCode = code;
    }
  }
}
