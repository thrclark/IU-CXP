import { Injectable } from '@angular/core';

import {
  ASSIGNMENTS,
  Assignment,
  CURRENT_PAY_PERIOD_ID,
  DEFAULT_ASSIGNMENT_ID,
  LEAVE_BALANCES,
  LeaveBalance,
  PAY_PERIODS,
  PayPeriod,
  SEED_TIME_ENTRIES,
  TimeEntry,
} from './kuali-time';

const MONTH_ABBREVIATIONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const WEEKDAY_ABBREVIATIONS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDayLabel(date: Date): string {
  return `${WEEKDAY_ABBREVIATIONS[date.getDay()]}, ${MONTH_ABBREVIATIONS[date.getMonth()]} ${date.getDate()}`;
}

function formatClockTime(date: Date): string {
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = date.getHours() >= 12 ? 'PM' : 'AM';
  const hours12 = date.getHours() % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
}

/** Nearest quarter hour, matching how Kuali Time rounds clocked time -- never rounds down to zero. */
function roundToQuarterHour(hours: number): number {
  return Math.max(Math.round(hours * 4) / 4, 0.25);
}

function isoDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface MissedPunchInput {
  assignmentId: string;
  /** ISO date (YYYY-MM-DD), from a native date input. */
  date: string;
  /** 24-hour "HH:MM", from a native time input. */
  timeIn: string;
  /** 24-hour "HH:MM", from a native time input. */
  timeOut: string;
  note?: string;
}

/**
 * Prototype-only Kuali Time service. State (clock status, logged entries)
 * lives in memory for the session, same as the rest of this app's mock
 * services -- there's no real timekeeping backend behind it.
 */
@Injectable({ providedIn: 'root' })
export class KualiTimeService {
  private entries: TimeEntry[] = [...SEED_TIME_ENTRIES];

  readonly assignments: Assignment[] = ASSIGNMENTS;
  readonly payPeriods: PayPeriod[] = PAY_PERIODS;
  readonly leaveBalances: LeaveBalance[] = LEAVE_BALANCES;

  selectedAssignmentId: string = DEFAULT_ASSIGNMENT_ID;
  selectedPayPeriodId: string = CURRENT_PAY_PERIOD_ID;

  private clockedInAssignmentId: string | null = null;
  private clockedInAt: Date | null = null;

  get isClockedIn(): boolean {
    return this.clockedInAt !== null;
  }

  /** When the current clock-in session started, or null if clocked out. */
  get clockedInSince(): Date | null {
    return this.clockedInAt;
  }

  /** Which assignment the current clock-in session is running against. */
  get activeAssignmentId(): string | null {
    return this.clockedInAssignmentId;
  }

  clockIn(assignmentId: string): void {
    if (this.isClockedIn) {
      return;
    }
    this.clockedInAssignmentId = assignmentId;
    this.clockedInAt = new Date();
  }

  /** Clocks out, rounds the elapsed time to the nearest quarter hour, and logs it as a new Regular Hours entry for today. */
  clockOut(): TimeEntry | null {
    if (!this.clockedInAt || !this.clockedInAssignmentId) {
      return null;
    }
    const clockInAt = this.clockedInAt;
    const clockOutAt = new Date();
    const hours = roundToQuarterHour((clockOutAt.getTime() - clockInAt.getTime()) / 3_600_000);

    const entry: TimeEntry = {
      id: `clock-${clockOutAt.getTime()}`,
      date: isoDate(clockInAt),
      dayLabel: formatDayLabel(clockInAt),
      assignmentId: this.clockedInAssignmentId,
      earnCode: 'RGH',
      hours,
      status: 'Saved',
      clockIn: formatClockTime(clockInAt),
      clockOut: formatClockTime(clockOutAt),
    };

    this.entries = [...this.entries, entry];
    this.clockedInAssignmentId = null;
    this.clockedInAt = null;
    return entry;
  }

  /** Logs a manual entry for a past punch the clock missed, same as Kuali Time's "Missed Punch" report. */
  reportMissedPunch(input: MissedPunchInput): TimeEntry {
    const clockInAt = new Date(`${input.date}T${input.timeIn}:00`);
    const clockOutAt = new Date(`${input.date}T${input.timeOut}:00`);
    const hours = roundToQuarterHour((clockOutAt.getTime() - clockInAt.getTime()) / 3_600_000);

    const entry: TimeEntry = {
      id: `missed-${Date.now()}`,
      date: input.date,
      dayLabel: formatDayLabel(clockInAt),
      assignmentId: input.assignmentId,
      earnCode: 'RGH',
      hours,
      status: 'Saved',
      clockIn: formatClockTime(clockInAt),
      clockOut: formatClockTime(clockOutAt),
      note: input.note?.trim() || 'Reported as a missed punch',
    };

    this.entries = [...this.entries, entry];
    return entry;
  }

  entriesForPeriod(payPeriodId: string): TimeEntry[] {
    const period = this.payPeriods.find(p => p.id === payPeriodId);
    if (!period) {
      return [];
    }
    return this.entries
      .filter(entry => entry.date >= period.startDate && entry.date <= period.endDate)
      .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  }

  totalHoursForPeriod(payPeriodId: string): number {
    return this.entriesForPeriod(payPeriodId).reduce((total, entry) => total + entry.hours, 0);
  }

  assignmentLabel(assignmentId: string): string {
    return this.assignments.find(assignment => assignment.id === assignmentId)?.label ?? assignmentId;
  }
}
