/**
 * Small date-formatting helpers shared by the prototype's mock time/leave
 * services (Kuali Time, ePTO, ...) so entries read consistently across
 * features no matter which service built them.
 */

const MONTH_ABBREVIATIONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAY_ABBREVIATIONS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** e.g. "Wed, Sept 16". */
export function formatDayLabel(date: Date): string {
  return `${WEEKDAY_ABBREVIATIONS[date.getDay()]}, ${MONTH_ABBREVIATIONS[date.getMonth()]} ${date.getDate()}`;
}

/** e.g. "September 2026" -- used for month-level headings/labels. */
export function formatMonthLabel(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

/** Sortable/filterable ISO date (YYYY-MM-DD) in local time (never shifts a day via UTC conversion). */
export function isoDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** The "YYYY-MM" prefix of an ISO date -- handy for grouping entries by month. */
export function isoMonth(date: Date): string {
  return isoDate(date).slice(0, 7);
}
