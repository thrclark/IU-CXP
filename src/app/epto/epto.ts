/**
 * ePTO leave codes. PTO/SCK/HOL/HON mirror IU's real "BASIC" codes; OTH
 * stands in for the real system's "Advanced" tab (FMLA, jury duty, unpaid
 * absence, and similar less-common categories), collapsed into one code
 * here to keep the prototype's Add Dates form simple.
 */
export type LeaveCode = 'PTO' | 'SCK' | 'HOL' | 'HON' | 'OTH';

export const LEAVE_CODE_LABELS: Record<LeaveCode, string> = {
  PTO: 'Paid Time Off',
  SCK: 'Sick',
  HOL: 'Holiday',
  HON: 'Honorary',
  OTH: 'Other',
};

/**
 * Only PTO usage counts against the accrued PTO balance -- Holiday and
 * Honorary are IU-observed paid days that don't draw down an employee's
 * own accrual, and Sick draws from the separate sick leave account instead.
 */
export const CODES_CHARGED_TO_PTO_BALANCE: ReadonlySet<LeaveCode> = new Set(['PTO']);

/** Real ePTO document statuses (see IU's ePTO employee/supervisor guides). */
export type DocumentStatus = 'Not Submitted' | 'Submitted' | 'Approved';

export interface TimeOffEntry {
  id: string;
  /** Sortable ISO date (YYYY-MM-DD). */
  date: string;
  /** Display date, e.g. "Mon, Sept 7". */
  dayLabel: string;
  code: LeaveCode;
  hours: number;
  description?: string;
}

export interface MonthlyCalendar {
  /** "YYYY-MM". */
  id: string;
  /** Display label, e.g. "September 2026". */
  label: string;
  status: DocumentStatus;
  entries: TimeOffEntry[];
}

export const CURRENT_MONTH_ID = '2026-09';

/**
 * Seed monthly calendars for the prototype. June through August are
 * already processed (Approved); September -- the current month -- is
 * Not Submitted, with a couple of entries already logged, so the Add
 * Dates form and Submit action both have something real to build on.
 * Holiday dates line up with the ones already used on the Academic
 * Calendar page so the two features don't disagree with each other.
 */
export const SEED_MONTHLY_CALENDARS: MonthlyCalendar[] = [
  {
    id: '2026-06',
    label: 'June 2026',
    status: 'Approved',
    entries: [
      { id: 'eo-0619', date: '2026-06-19', dayLabel: 'Fri, Jun 19', code: 'HOL', hours: 8, description: 'Juneteenth National Freedom Day' },
    ],
  },
  {
    id: '2026-07',
    label: 'July 2026',
    status: 'Approved',
    entries: [
      { id: 'eo-0703', date: '2026-07-03', dayLabel: 'Fri, Jul 3', code: 'HOL', hours: 8, description: 'Independence Day (observed)' },
      { id: 'eo-0720', date: '2026-07-20', dayLabel: 'Mon, Jul 20', code: 'PTO', hours: 8, description: 'Family vacation' },
    ],
  },
  {
    id: '2026-08',
    label: 'August 2026',
    status: 'Approved',
    entries: [
      { id: 'eo-0814', date: '2026-08-14', dayLabel: 'Fri, Aug 14', code: 'PTO', hours: 8, description: 'Long weekend' },
    ],
  },
  {
    id: CURRENT_MONTH_ID,
    label: 'September 2026',
    status: 'Not Submitted',
    entries: [
      { id: 'eo-0903', date: '2026-09-03', dayLabel: 'Thu, Sept 3', code: 'PTO', hours: 8, description: 'Personal day' },
      { id: 'eo-0907', date: '2026-09-07', dayLabel: 'Mon, Sept 7', code: 'HOL', hours: 8, description: 'Labor Day' },
    ],
  },
];

/** Full-time exempt staff accrue 20 hrs/month until their 5th anniversary, then 24. This prototype's employee is pre-5-year. */
export const MONTHLY_ACCRUAL_HOURS = 20;

/** The balance carried into this calendar year from the prior year (capped at one year's accrual under IU policy). */
export const JAN_1_CARRYOVER_HOURS = 32;

/** Separate sick leave account balance -- partly funded by unused-PTO conversion, tracked independently of the PTO accrual above. */
export const SICK_BALANCE_HOURS = 64;
