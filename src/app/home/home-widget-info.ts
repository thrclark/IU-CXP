import { WidgetId } from './home-card-order';

/**
 * "More information" content for each of the 7 widget cards on the Home
 * screen's "My Home" grid, shown on their dedicated /home/widgets/:id
 * detail page. Distinct from the pinned-service catalog in
 * campus-services/ -- these widgets are custom-built features of this app
 * rather than external One.IU services, so they get their own light data
 * model instead of being shoehorned into CampusService.
 */
export interface HomeWidgetInfo {
  id: WidgetId;
  title: string;
  icon: string;
  category: string;
  /** Short summary shown at the top of the detail page. */
  summary: string;
  /** A few sentences explaining what the widget shows and where its data comes from. */
  details: string[];
  /** Route to the widget's own full feature page. */
  openRoute: string;
  /** Label for the button that links to openRoute. */
  openLabel: string;
}

export const HOME_WIDGET_INFO: HomeWidgetInfo[] = [
  {
    id: 'my-classes',
    title: 'My Classes',
    icon: 'rvt-calendar',
    category: 'Academics',
    summary: "A quick look at today's class schedule, drawn from your current-term enrollment.",
    details: [
      "Lists today's meeting times, course numbers, and building locations in chronological order.",
      'Reflects your One.IU Registration enrollment for the current term. If a class is missing, confirm you\'re registered for it and check back after registration processes overnight.',
      'The widget only shows a few classes at a time -- open My Classes for your full weekly schedule, finals times, and past terms.',
    ],
    openRoute: '/events-calendars/my-classes',
    openLabel: 'Open My Classes',
  },
  {
    id: 'upcoming-dates',
    title: 'Upcoming Dates',
    icon: 'rvt-flag',
    category: 'University Calendar',
    summary: 'A short preview of the next important dates on the university academic calendar.',
    details: [
      'Surfaces the next few entries from the Academic Calendar -- things like registration windows, add/drop deadlines, and breaks.',
      'These dates are university-wide and the same for every viewer; they aren\'t personalized to your enrollment the way My Classes is.',
      'Open the Academic Calendar for the complete list of dates across the full term.',
    ],
    openRoute: '/events-calendars/academic-calendar',
    openLabel: 'Open Academic Calendar',
  },
  {
    id: 'campus-events',
    title: 'Campus Events',
    icon: 'rvt-calendar',
    category: 'Campus Life',
    summary: 'A rotating sample of upcoming events happening across IU campuses.',
    details: [
      'Shows a handful of upcoming campus events with their date, time, and location, skipping ones that have already passed.',
      'Events come from across the IU system, so not every event listed here will be at your home campus.',
      'Open Campus Events to browse and filter the full events calendar.',
    ],
    openRoute: '/events-calendars/campus-events',
    openLabel: 'Open Campus Events',
  },
  {
    id: 'kuali-time',
    title: 'Kuali Time',
    icon: 'rvt-clock',
    category: 'Employee Center',
    summary: 'Your current clocked-in status and today\'s running timer, from Kuali Time.',
    details: [
      'Shows whether you\'re currently clocked in or out, and the assignment you\'re clocked in under.',
      'While clocked in, the timer counts up live so you can see elapsed time at a glance without opening Kuali Time.',
      'Open Kuali Time to clock in or out, review recent entries, or submit your timesheet.',
    ],
    openRoute: '/employee-center/kuali-time',
    openLabel: 'Open Kuali Time',
  },
  {
    id: 'epto',
    title: 'ePTO',
    icon: 'rvt-calendar',
    category: 'Employee Center',
    summary: 'Your accrued paid time off balance and this month\'s ePTO submission status.',
    details: [
      'Displays your current accrued PTO balance in hours, along with whether this month\'s ePTO has been submitted or approved.',
      'The balance always reflects the same itemized entries shown on the full ePTO page -- nothing here is a separate, hand-kept total.',
      'Open ePTO to log time off, review past months, and see a detailed breakdown of accruals and usage.',
    ],
    openRoute: '/employee-center/epto',
    openLabel: 'Open ePTO',
  },
  {
    id: 'your-paycheck',
    title: 'Your Paycheck',
    icon: 'rvt-credit-card',
    category: 'Employee Center',
    summary: 'Your most recent net pay amount, from Your Paycheck.',
    details: [
      'Shows the net pay and pay period label from your most recently issued paycheck.',
      'Net pay is calculated the same way it is on the full pay stub: gross earnings minus before-tax deductions, after-tax deductions, and taxes.',
      'Open Your Paycheck for the full pay stub, including earnings, deductions, taxes, and year-to-date totals.',
    ],
    openRoute: '/employee-center/your-paycheck',
    openLabel: 'View Pay Stub',
  },
  {
    id: 'recent-notifications',
    title: 'Recent Notifications',
    icon: 'rvt-bell',
    category: 'Notifications',
    summary: 'Your most recent notifications from across the app, at a glance.',
    details: [
      'Lists a few of your most recent notifications, most recent first, including registration, career, and advising alerts.',
      'This is the same notification feed shown in the bell menu in the header -- nothing shown here is widget-specific.',
      'Open Notification Center to see the full history and manage your notification settings.',
    ],
    openRoute: '/notifications',
    openLabel: 'View All Notifications',
  },
];

export function findHomeWidgetInfo(id: string | null | undefined): HomeWidgetInfo | undefined {
  return id ? HOME_WIDGET_INFO.find(widget => widget.id === id) : undefined;
}
