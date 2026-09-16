/**
 * One of the (possibly several) jobs an employee clocks time against.
 * Kuali Time's real "Clock Assignment" dropdown exists for exactly this --
 * many IU staff hold more than one paid position at once.
 */
export interface Assignment {
  id: string;
  /** Job title for this position, e.g. "Payroll Coordinator". */
  label: string;
  /** Department/work area this position belongs to, e.g. "University Payroll". */
  department: string;
}

/**
 * Kuali Time earn codes. RGH/OVT/VAC/SCK are the real IU codes (see the
 * Kuali Time Complete User Guide); PER stands in for personal/PTO hours.
 */
export type EarnCode = 'RGH' | 'OVT' | 'VAC' | 'SCK' | 'PER';

export const EARN_CODE_LABELS: Record<EarnCode, string> = {
  RGH: 'Regular Hours',
  OVT: 'Overtime',
  VAC: 'Vacation',
  SCK: 'Sick',
  PER: 'Personal Time Off',
};

/** Where a logged entry stands in the real Kuali Time approval chain. */
export type EntryStatus = 'Saved' | 'Enroute' | 'Final';

export interface TimeEntry {
  id: string;
  /** Sortable ISO date (YYYY-MM-DD) the entry falls on. */
  date: string;
  /** Display date, e.g. "Mon, Sept 7". */
  dayLabel: string;
  assignmentId: string;
  earnCode: EarnCode;
  hours: number;
  status: EntryStatus;
  /** Clock in/out display times, only set for clock-entry (not manual/leave) rows. */
  clockIn?: string;
  clockOut?: string;
  /** Optional note, e.g. from a missed-punch report. */
  note?: string;
}

export interface PayPeriod {
  id: string;
  /** Display label, e.g. "Sept 6 – Sept 19, 2026". */
  label: string;
  /** Sortable ISO start date. */
  startDate: string;
  /** Sortable ISO end date (inclusive). */
  endDate: string;
}

export interface LeaveBalance {
  code: EarnCode;
  label: string;
  /** Current balance, in hours. */
  balanceHours: number;
  /** Hours accrued per pay period, or 0 for leave types that aren't accrued biweekly. */
  accrualPerPeriodHours: number;
}

export const ASSIGNMENTS: Assignment[] = [
  { id: 'payroll-coordinator', label: 'Payroll Coordinator', department: 'University Payroll' },
  { id: 'event-staff', label: 'Event Staff', department: 'IU Auditorium' },
];

export const DEFAULT_ASSIGNMENT_ID = ASSIGNMENTS[0].id;

export const PAY_PERIODS: PayPeriod[] = [
  { id: 'pp-2026-08-09', label: 'Aug 9 – Aug 22, 2026', startDate: '2026-08-09', endDate: '2026-08-22' },
  { id: 'pp-2026-08-23', label: 'Aug 23 – Sept 5, 2026', startDate: '2026-08-23', endDate: '2026-09-05' },
  { id: 'pp-2026-09-06', label: 'Sept 6 – Sept 19, 2026', startDate: '2026-09-06', endDate: '2026-09-19' },
];

export const CURRENT_PAY_PERIOD_ID = 'pp-2026-09-06';

/**
 * Seed time entries for the two closed pay periods plus this-period-so-far
 * (through yesterday). Today itself is left unlogged on purpose -- clocking
 * in/out on the Clock tab is what adds today's entry, so the prototype
 * demonstrates the full loop instead of shipping with today already filled in.
 */
export const SEED_TIME_ENTRIES: TimeEntry[] = [
  // Pay period: Aug 9 – Aug 22, 2026 -- fully processed.
  { id: 'te-0810', date: '2026-08-10', dayLabel: 'Mon, Aug 10', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Final', clockIn: '8:58 AM', clockOut: '5:02 PM' },
  { id: 'te-0811', date: '2026-08-11', dayLabel: 'Tue, Aug 11', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Final', clockIn: '9:00 AM', clockOut: '5:00 PM' },
  { id: 'te-0812', date: '2026-08-12', dayLabel: 'Wed, Aug 12', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Final', clockIn: '8:55 AM', clockOut: '4:57 PM' },
  { id: 'te-0813', date: '2026-08-13', dayLabel: 'Thu, Aug 13', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Final', clockIn: '9:02 AM', clockOut: '5:05 PM' },
  { id: 'te-0814', date: '2026-08-14', dayLabel: 'Fri, Aug 14', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Final', clockIn: '8:59 AM', clockOut: '5:01 PM' },
  { id: 'te-0817', date: '2026-08-17', dayLabel: 'Mon, Aug 17', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Final', clockIn: '9:00 AM', clockOut: '5:00 PM' },
  { id: 'te-0818', date: '2026-08-18', dayLabel: 'Tue, Aug 18', assignmentId: 'payroll-coordinator', earnCode: 'VAC', hours: 8, status: 'Final', note: 'Planned day off' },
  { id: 'te-0819', date: '2026-08-19', dayLabel: 'Wed, Aug 19', assignmentId: 'event-staff', earnCode: 'RGH', hours: 6, status: 'Final', clockIn: '4:00 PM', clockOut: '10:00 PM' },
  { id: 'te-0820', date: '2026-08-20', dayLabel: 'Thu, Aug 20', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Final', clockIn: '8:57 AM', clockOut: '4:59 PM' },
  { id: 'te-0821', date: '2026-08-21', dayLabel: 'Fri, Aug 21', assignmentId: 'event-staff', earnCode: 'RGH', hours: 5, status: 'Final', clockIn: '5:00 PM', clockOut: '10:00 PM' },

  // Pay period: Aug 23 – Sept 5, 2026 -- submitted, still routing for approval.
  { id: 'te-0824', date: '2026-08-24', dayLabel: 'Mon, Aug 24', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Enroute', clockIn: '9:01 AM', clockOut: '5:03 PM' },
  { id: 'te-0825', date: '2026-08-25', dayLabel: 'Tue, Aug 25', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Enroute', clockIn: '8:59 AM', clockOut: '5:00 PM' },
  { id: 'te-0826', date: '2026-08-26', dayLabel: 'Wed, Aug 26', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Enroute', clockIn: '9:00 AM', clockOut: '5:00 PM' },
  { id: 'te-0827', date: '2026-08-27', dayLabel: 'Thu, Aug 27', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Enroute', clockIn: '8:56 AM', clockOut: '4:58 PM' },
  { id: 'te-0828', date: '2026-08-28', dayLabel: 'Fri, Aug 28', assignmentId: 'payroll-coordinator', earnCode: 'SCK', hours: 4, status: 'Enroute', note: 'Left half-day sick' },
  { id: 'te-0831', date: '2026-08-31', dayLabel: 'Mon, Aug 31', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Enroute', clockIn: '9:00 AM', clockOut: '5:01 PM' },
  { id: 'te-0901', date: '2026-09-01', dayLabel: 'Tue, Sept 1', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Enroute', clockIn: '8:58 AM', clockOut: '4:59 PM' },
  { id: 'te-0902', date: '2026-09-02', dayLabel: 'Wed, Sept 2', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 9, status: 'Enroute', clockIn: '8:59 AM', clockOut: '6:02 PM' },
  { id: 'te-0902-ovt', date: '2026-09-02', dayLabel: 'Wed, Sept 2', assignmentId: 'payroll-coordinator', earnCode: 'OVT', hours: 1, status: 'Enroute', note: 'Month-end close' },
  { id: 'te-0903', date: '2026-09-03', dayLabel: 'Thu, Sept 3', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Enroute', clockIn: '9:00 AM', clockOut: '5:00 PM' },
  { id: 'te-0904', date: '2026-09-04', dayLabel: 'Fri, Sept 4', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Enroute', clockIn: '8:57 AM', clockOut: '4:58 PM' },

  // Pay period: Sept 6 – Sept 19, 2026 -- current period, saved but not yet
  // submitted. Today (Sept 16) is intentionally not included here.
  { id: 'te-0907', date: '2026-09-07', dayLabel: 'Mon, Sept 7', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Saved', clockIn: '8:59 AM', clockOut: '5:01 PM' },
  { id: 'te-0908', date: '2026-09-08', dayLabel: 'Tue, Sept 8', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Saved', clockIn: '9:00 AM', clockOut: '5:00 PM' },
  { id: 'te-0909', date: '2026-09-09', dayLabel: 'Wed, Sept 9', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Saved', clockIn: '8:58 AM', clockOut: '4:59 PM' },
  { id: 'te-0910', date: '2026-09-10', dayLabel: 'Thu, Sept 10', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Saved', clockIn: '9:01 AM', clockOut: '5:03 PM' },
  { id: 'te-0911', date: '2026-09-11', dayLabel: 'Fri, Sept 11', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Saved', clockIn: '8:59 AM', clockOut: '5:00 PM' },
  { id: 'te-0914', date: '2026-09-14', dayLabel: 'Mon, Sept 14', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Saved', clockIn: '9:00 AM', clockOut: '5:00 PM' },
  { id: 'te-0915', date: '2026-09-15', dayLabel: 'Tue, Sept 15', assignmentId: 'payroll-coordinator', earnCode: 'RGH', hours: 8, status: 'Saved', clockIn: '8:57 AM', clockOut: '4:58 PM' },
];

/**
 * "H:MM:SS" elapsed between `since` and `now`, or null if `since` is null
 * (not currently clocked in). Shared between the Clock tab's timer and the
 * Home widget's compact timer so both read identically.
 */
export function formatElapsed(since: Date | null, now: Date): string | null {
  if (!since) {
    return null;
  }
  const totalSeconds = Math.max(0, Math.floor((now.getTime() - since.getTime()) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const LEAVE_BALANCES: LeaveBalance[] = [
  { code: 'VAC', label: 'Vacation', balanceHours: 42.5, accrualPerPeriodHours: 6.15 },
  { code: 'SCK', label: 'Sick', balanceHours: 96, accrualPerPeriodHours: 3.7 },
  { code: 'PER', label: 'Personal Time Off', balanceHours: 16, accrualPerPeriodHours: 0 },
];
