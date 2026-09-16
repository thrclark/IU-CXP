import { Injectable } from '@angular/core';

import {
  CODES_CHARGED_TO_PTO_BALANCE,
  CURRENT_MONTH_ID,
  JAN_1_CARRYOVER_HOURS,
  LeaveCode,
  MONTHLY_ACCRUAL_HOURS,
  MonthlyCalendar,
  SEED_MONTHLY_CALENDARS,
  SICK_BALANCE_HOURS,
  TimeOffEntry,
} from './epto';
import { formatDayLabel, isoMonth } from '../shared/date-format';

export interface AddDatesInput {
  /** ISO date (YYYY-MM-DD), from a native date input. */
  startDate: string;
  /** ISO date (YYYY-MM-DD), from a native date input. */
  endDate: string;
  code: LeaveCode;
  hoursPerDay: number;
  description?: string;
}

/**
 * Prototype-only ePTO service. State (this month's entries, submission
 * status) lives in memory for the session, same as the rest of this app's
 * mock services -- there's no real HRMS integration behind it.
 */
@Injectable({ providedIn: 'root' })
export class EptoService {
  private calendars: MonthlyCalendar[] = SEED_MONTHLY_CALENDARS.map(calendar => ({
    ...calendar,
    entries: [...calendar.entries],
  }));

  /** All monthly calendars, oldest first. */
  get monthlyCalendars(): MonthlyCalendar[] {
    return [...this.calendars].sort((a, b) => a.id.localeCompare(b.id));
  }

  get currentMonth(): MonthlyCalendar {
    const month = this.calendars.find(calendar => calendar.id === CURRENT_MONTH_ID);
    if (!month) {
      throw new Error(`No seed calendar for the current month (${CURRENT_MONTH_ID})`);
    }
    return month;
  }

  /**
   * Logs one entry per calendar day in the given range (inclusive). Only
   * valid while the current month hasn't been submitted yet, and only for
   * dates that actually fall within the current month -- ePTO's real
   * Monthly Calendar only ever has the current month open for entry.
   */
  addDates(input: AddDatesInput): TimeOffEntry[] {
    const month = this.currentMonth;
    if (month.status !== 'Not Submitted') {
      return [];
    }
    if (!input.startDate || !input.endDate || input.endDate < input.startDate) {
      return [];
    }

    const added: TimeOffEntry[] = [];
    const cursor = new Date(`${input.startDate}T00:00:00`);
    const end = new Date(`${input.endDate}T00:00:00`);

    while (cursor <= end) {
      if (isoMonth(cursor) === CURRENT_MONTH_ID) {
        const year = cursor.getFullYear();
        const monthNum = (cursor.getMonth() + 1).toString().padStart(2, '0');
        const day = cursor.getDate().toString().padStart(2, '0');
        added.push({
          id: `eo-${year}${monthNum}${day}-${Date.now()}-${added.length}`,
          date: `${year}-${monthNum}-${day}`,
          dayLabel: formatDayLabel(cursor),
          code: input.code,
          hours: input.hoursPerDay,
          description: input.description?.trim() || undefined,
        });
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    if (added.length) {
      month.entries = [...month.entries, ...added].sort((a, b) => a.date.localeCompare(b.date));
    }
    return added;
  }

  /** Removes an entry from the current month, only while it hasn't been submitted yet. */
  removeEntry(entryId: string): void {
    const month = this.currentMonth;
    if (month.status !== 'Not Submitted') {
      return;
    }
    month.entries = month.entries.filter(entry => entry.id !== entryId);
  }

  /** Submits the current month for supervisor approval. IU requires this every month, whether or not any time off was taken. */
  submitCurrentMonth(): void {
    const month = this.currentMonth;
    if (month.status === 'Not Submitted') {
      month.status = 'Submitted';
    }
  }

  /** Hours accrued so far this year, based on fully-completed months (the current, in-progress month hasn't posted yet). */
  get ytdEarnedHours(): number {
    const currentMonthNumber = Number(CURRENT_MONTH_ID.split('-')[1]);
    const monthsCompleted = Math.max(0, currentMonthNumber - 1);
    return monthsCompleted * MONTHLY_ACCRUAL_HOURS;
  }

  /** PTO hours used so far this year, counting only months that have finished routing through approval. */
  get ytdApprovedUsageHours(): number {
    return this.calendars
      .filter(calendar => calendar.status === 'Approved')
      .flatMap(calendar => calendar.entries)
      .filter(entry => CODES_CHARGED_TO_PTO_BALANCE.has(entry.code))
      .reduce((total, entry) => total + entry.hours, 0);
  }

  /** Jan. 1 Carryover + YTD Earned - YTD Approved Usage -- the PTO balance as of the last processed month. */
  get accruedBalanceHours(): number {
    return JAN_1_CARRYOVER_HOURS + this.ytdEarnedHours - this.ytdApprovedUsageHours;
  }

  /** What the balance would be at year end if no further PTO is used -- full year's accrual, same approved usage as today. */
  get projectedYearEndBalanceHours(): number {
    return JAN_1_CARRYOVER_HOURS + (12 * MONTHLY_ACCRUAL_HOURS) - this.ytdApprovedUsageHours;
  }

  readonly carryoverHours = JAN_1_CARRYOVER_HOURS;
  readonly monthlyAccrualHours = MONTHLY_ACCRUAL_HOURS;
  readonly sickBalanceHours = SICK_BALANCE_HOURS;
}
