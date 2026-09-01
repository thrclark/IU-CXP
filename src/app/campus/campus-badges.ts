export interface CampusBadge {
  /** Unique key, for *ngFor/@for tracking. */
  key: string;
  /** Text shown on the badge itself. */
  label: string;
  /** Full name shown as a tooltip / read to assistive tech. */
  title: string;
}

/** Short codes IU uses for its system campuses, mapped to their full names. */
export const CAMPUS_NAMES: Record<string, string> = {
  IUB: 'IU Bloomington',
  IUI: 'IU Indianapolis',
  IUE: 'IU East',
  IUK: 'IU Kokomo',
  IUN: 'IU Northwest',
  IUS: 'IU Southeast',
  IUSB: 'IU South Bend',
  IUFW: 'IU Fort Wayne',
  IUC: 'IU Columbus',
};

export const ALL_CAMPUS_CODES = Object.keys(CAMPUS_NAMES);

/**
 * Turns a list of IU campus codes into the badges a card or detail page should
 * render, collapsing to a single "All Campuses" pill once every known campus
 * is represented instead of listing each one out individually.
 */
export function resolveCampusBadges(campuses: string[]): CampusBadge[] {
  const codes = Array.from(new Set(campuses.map(code => code.toUpperCase())));

  const coversAllCampuses = ALL_CAMPUS_CODES.length > 0
    && ALL_CAMPUS_CODES.every(code => codes.includes(code));

  if (coversAllCampuses) {
    return [{ key: 'ALL', label: 'All Campuses', title: 'Available at every IU campus' }];
  }

  return codes.map(code => ({
    key: code,
    label: code,
    title: CAMPUS_NAMES[code] ?? code,
  }));
}
