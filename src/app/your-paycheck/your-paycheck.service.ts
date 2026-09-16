import { Injectable } from '@angular/core';

import { CURRENT_PAYCHECK_ID, PAYCHECKS, Paycheck, PayLine } from './your-paycheck';

/**
 * Prototype-only "Your Paycheck" service, mirroring how Kuali Time and ePTO
 * hold their seed state -- everything lives in memory for the session, with
 * no backend behind it. Pay-period totals (gross, deductions, taxes, net
 * pay) and year-to-date figures are computed here rather than stored on the
 * seed data, so they always reconcile with the itemized lines shown on the
 * page.
 */
@Injectable({ providedIn: 'root' })
export class YourPaycheckService {
  private records: Paycheck[] = PAYCHECKS;

  /** All stubs, most recently issued first. */
  get paychecks(): Paycheck[] {
    return [...this.records].sort((a, b) => b.payDate.localeCompare(a.payDate));
  }

  selectedPaycheckId: string = CURRENT_PAYCHECK_ID;

  get selectedPaycheck(): Paycheck {
    const found = this.records.find(paycheck => paycheck.id === this.selectedPaycheckId);
    if (!found) {
      throw new Error(`No paycheck found for id ${this.selectedPaycheckId}`);
    }
    return found;
  }

  selectPaycheck(id: string): void {
    this.selectedPaycheckId = id;
  }

  private sum(lines: PayLine[]): number {
    return lines.reduce((total, line) => total + line.amount, 0);
  }

  totalGross(paycheck: Paycheck): number {
    return this.sum(paycheck.earnings);
  }

  totalBeforeTaxDeductions(paycheck: Paycheck): number {
    return this.sum(paycheck.beforeTaxDeductions);
  }

  totalAfterTaxDeductions(paycheck: Paycheck): number {
    return this.sum(paycheck.afterTaxDeductions);
  }

  /** Before-tax + after-tax deductions combined. */
  totalDeductions(paycheck: Paycheck): number {
    return this.totalBeforeTaxDeductions(paycheck) + this.totalAfterTaxDeductions(paycheck);
  }

  /** Gross pay minus before-tax deductions -- the base federal/state income tax is withheld against. */
  fedTaxableGross(paycheck: Paycheck): number {
    return this.totalGross(paycheck) - this.totalBeforeTaxDeductions(paycheck);
  }

  totalTaxes(paycheck: Paycheck): number {
    return this.sum(paycheck.taxes);
  }

  netPay(paycheck: Paycheck): number {
    return this.totalGross(paycheck) - this.totalTaxes(paycheck) - this.totalDeductions(paycheck);
  }

  /**
   * How many months of the calendar year this stub's pay date falls within
   * -- e.g. August is month 8. Pay is flat month to month for this
   * employee, so year-to-date is just this month's figure times that count.
   */
  private ytdMultiplier(paycheck: Paycheck): number {
    return Number(paycheck.payDate.split('-')[1]);
  }

  ytd(amount: number, paycheck: Paycheck): number {
    return amount * this.ytdMultiplier(paycheck);
  }

  ytdTotalGross(paycheck: Paycheck): number {
    return this.ytd(this.totalGross(paycheck), paycheck);
  }

  ytdTotalDeductions(paycheck: Paycheck): number {
    return this.ytd(this.totalDeductions(paycheck), paycheck);
  }

  ytdTotalTaxes(paycheck: Paycheck): number {
    return this.ytd(this.totalTaxes(paycheck), paycheck);
  }

  ytdNetPay(paycheck: Paycheck): number {
    return this.ytd(this.netPay(paycheck), paycheck);
  }
}
