/** An academic term a calendar date belongs to, e.g. "Fall 2026". */
export type Semester = string;

export interface AcademicCalendarDate {
  /** Stable identifier, e.g. "fall-2026-labor-day". */
  id: string;
  /** What's happening, e.g. "Labor Day — no classes". */
  title: string;
  /** Short display date, e.g. "Sept 7" or "Oct 3–5". */
  dateDisplay: string;
  /**
   * Sortable/filterable ISO date (YYYY-MM-DD). For a date range, this is the
   * start date — good enough for chronological ordering in a prototype.
   */
  sortKey: string;
  /** Academic term this date belongs to, e.g. "Fall 2026". */
  semester: Semester;
  /** IU campus codes (e.g. ['IUB', 'IUK']) this date applies to. */
  campuses: string[];
}

/** All nine IU system campuses — used for dates that apply university-wide. */
const ALL_CAMPUSES = ['IUB', 'IUI', 'IUE', 'IUK', 'IUN', 'IUS', 'IUSB', 'IUFW', 'IUC'];

/**
 * Mock academic calendar for prototype purposes -- not sourced from a real
 * registrar feed. Spans two semesters so the semester filter on the full
 * Academic Calendar page has something to switch between, and mixes in a
 * few campus-specific dates (Homecoming, Commencement) so the campus filter
 * does too.
 */
export const ACADEMIC_CALENDAR_DATES: AcademicCalendarDate[] = [
  {
    id: 'fall-2026-classes-begin',
    title: 'Fall classes begin',
    dateDisplay: 'Aug 24',
    sortKey: '2026-08-24',
    semester: 'Fall 2026',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'fall-2026-labor-day',
    title: 'Labor Day — no classes',
    dateDisplay: 'Sept 7',
    sortKey: '2026-09-07',
    semester: 'Fall 2026',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'fall-2026-drop-deadline',
    title: 'Last day to drop a full-semester class without a W',
    dateDisplay: 'Sept 14',
    sortKey: '2026-09-14',
    semester: 'Fall 2026',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'fall-2026-homecoming',
    title: 'Homecoming Weekend',
    dateDisplay: 'Oct 3–5',
    sortKey: '2026-10-03',
    semester: 'Fall 2026',
    campuses: ['IUB'],
  },
  {
    id: 'fall-2026-fall-break',
    title: 'Fall Break — no classes',
    dateDisplay: 'Oct 17–18',
    sortKey: '2026-10-17',
    semester: 'Fall 2026',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'fall-2026-thanksgiving-break',
    title: 'Thanksgiving Break — no classes',
    dateDisplay: 'Nov 26–28',
    sortKey: '2026-11-26',
    semester: 'Fall 2026',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'fall-2026-finals-week',
    title: 'Fall final exams',
    dateDisplay: 'Dec 7–11',
    sortKey: '2026-12-07',
    semester: 'Fall 2026',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'fall-2026-winter-commencement',
    title: 'Winter Commencement',
    dateDisplay: 'Dec 12',
    sortKey: '2026-12-12',
    semester: 'Fall 2026',
    campuses: ['IUB'],
  },
  {
    id: 'spring-2027-classes-begin',
    title: 'Spring classes begin',
    dateDisplay: 'Jan 11',
    sortKey: '2027-01-11',
    semester: 'Spring 2027',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'spring-2027-mlk-day',
    title: 'Martin Luther King Jr. Day — no classes',
    dateDisplay: 'Jan 18',
    sortKey: '2027-01-18',
    semester: 'Spring 2027',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'spring-2027-drop-deadline',
    title: 'Last day to drop a full-semester class without a W',
    dateDisplay: 'Feb 8',
    sortKey: '2027-02-08',
    semester: 'Spring 2027',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'spring-2027-spring-break',
    title: 'Spring Break — no classes',
    dateDisplay: 'Mar 15–19',
    sortKey: '2027-03-15',
    semester: 'Spring 2027',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'spring-2027-honors-convocation',
    title: 'Honors Convocation',
    dateDisplay: 'Apr 2',
    sortKey: '2027-04-02',
    semester: 'Spring 2027',
    campuses: ['IUB'],
  },
  {
    id: 'spring-2027-classes-end',
    title: 'Last day of spring classes',
    dateDisplay: 'May 1',
    sortKey: '2027-05-01',
    semester: 'Spring 2027',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'spring-2027-finals-week',
    title: 'Spring final exams',
    dateDisplay: 'May 3–7',
    sortKey: '2027-05-03',
    semester: 'Spring 2027',
    campuses: ALL_CAMPUSES,
  },
  {
    id: 'spring-2027-commencement',
    title: 'Spring Commencement',
    dateDisplay: 'May 8',
    sortKey: '2027-05-08',
    semester: 'Spring 2027',
    campuses: ['IUB'],
  },
];
