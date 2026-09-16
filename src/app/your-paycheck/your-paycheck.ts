/**
 * A single line item on a pay stub -- one earning, deduction, or tax
 * withholding. `amount` is this pay period's figure; year-to-date totals
 * are derived (see YourPaycheckService.ytd), not stored, so they always
 * reconcile with the monthly figure instead of risking drift.
 */
export interface PayLine {
  code: string;
  label: string;
  amount: number;
}

/** One account a paycheck's net pay is distributed to via direct deposit. */
export interface NetPayAccount {
  label: string;
  /** Last 4 digits of the account number, e.g. "4821". */
  last4: string;
}

/**
 * One monthly pay stub, matching the fields IU's real "View Paychecks
 * Online" (One.IU Employee Center > Payroll and Tax) shows: pay period
 * dates, itemized earnings, before-tax and after-tax deductions, itemized
 * tax withholding, and a net pay distribution (direct deposit) section.
 *
 * This prototype models a monthly-paid exempt staff member -- same pay
 * frequency and current period (September 2026) as the ePTO feature --
 * paid on the last business day of the month, so the most recent posted
 * stub is August's (September's hasn't been issued yet).
 */
export interface Paycheck {
  id: string;
  /** Display label, e.g. "August 2026". */
  label: string;
  /** Sortable ISO date, first day of the pay period. */
  payBeginDate: string;
  /** Sortable ISO date, last day of the pay period. */
  payEndDate: string;
  /** Sortable ISO date this stub was issued -- the month's last business day. */
  payDate: string;
  earnings: PayLine[];
  beforeTaxDeductions: PayLine[];
  afterTaxDeductions: PayLine[];
  taxes: PayLine[];
  netPayDistribution: NetPayAccount[];
}

/** Most recently issued stub -- shown by default when the page loads. */
export const CURRENT_PAYCHECK_ID = '2026-08';

/**
 * This employee's pay is flat month to month (no raises or one-time
 * payments modeled), so every stub carries the same line items -- true to
 * how a real steady-salary employee's stub reads the same each month.
 */
const EARNINGS: PayLine[] = [
  { code: 'REG', label: 'Regular Pay', amount: 5000.00 },
];

/**
 * IU Tax Deferred Account Plan (403(b)) is an employee-elected supplemental
 * retirement contribution via TIAA -- pre-tax for federal/state income tax,
 * but still subject to Social Security and Medicare (see
 * YourPaycheckService.ficaWageBase). The base IU Retirement Plan and PERF
 * pension are fully employer-funded and don't appear as an employee
 * deduction at all.
 */
const BEFORE_TAX_DEDUCTIONS: PayLine[] = [
  { code: 'MED', label: 'Anthem PPO $500 Deductible Plan', amount: 180.00 },
  { code: '403B', label: 'IU Tax Deferred Account Plan (403(b)) -- TIAA', amount: 150.00 },
];

const AFTER_TAX_DEDUCTIONS: PayLine[] = [];

const TAXES: PayLine[] = [
  { code: 'FED', label: 'Federal Income Tax', amount: 560.40 },
  { code: 'IN', label: 'Indiana State Income Tax', amount: 142.44 },
  { code: 'MONROE', label: 'Monroe County Income Tax', amount: 95.00 },
  { code: 'SS', label: 'Social Security', amount: 298.84 },
  { code: 'MEDI', label: 'Medicare', amount: 69.89 },
];

const NET_PAY_DISTRIBUTION: NetPayAccount[] = [
  { label: 'Checking -- Balance of Net Pay', last4: '4821' },
];

function paycheck(id: string, label: string, payBeginDate: string, payEndDate: string, payDate: string): Paycheck {
  return {
    id,
    label,
    payBeginDate,
    payEndDate,
    payDate,
    earnings: EARNINGS,
    beforeTaxDeductions: BEFORE_TAX_DEDUCTIONS,
    afterTaxDeductions: AFTER_TAX_DEDUCTIONS,
    taxes: TAXES,
    netPayDistribution: NET_PAY_DISTRIBUTION,
  };
}

/** Most recent first. */
export const PAYCHECKS: Paycheck[] = [
  paycheck('2026-08', 'August 2026', '2026-08-01', '2026-08-31', '2026-08-31'),
  paycheck('2026-07', 'July 2026', '2026-07-01', '2026-07-31', '2026-07-31'),
  paycheck('2026-06', 'June 2026', '2026-06-01', '2026-06-30', '2026-06-30'),
  paycheck('2026-05', 'May 2026', '2026-05-01', '2026-05-31', '2026-05-29'),
  paycheck('2026-04', 'April 2026', '2026-04-01', '2026-04-30', '2026-04-30'),
];
