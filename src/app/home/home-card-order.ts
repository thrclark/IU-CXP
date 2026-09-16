/**
 * A single card slot in the Home screen's "My Home" grid, in whatever order
 * the user has dragged it to. Two kinds of card live in that grid: the
 * fixed set of "widget" cards (My Classes, Kuali Time, ePTO, ...) built
 * straight into the Home template, and the variable set of small service
 * cards the user has pinned to Home elsewhere in the app (see HomeService).
 * Both kinds share one ordering so they can be freely interleaved.
 */
export type WidgetId =
  | 'my-classes'
  | 'upcoming-dates'
  | 'campus-events'
  | 'kuali-time'
  | 'epto'
  | 'your-paycheck'
  | 'recent-notifications';

export interface WidgetCardRef {
  kind: 'widget';
  id: WidgetId;
}

export interface ServiceCardRef {
  kind: 'service';
  /** Slug of the pinned CampusService this card represents (see HomeService). */
  slug: string;
}

export type CardRef = WidgetCardRef | ServiceCardRef;

/** Default order widget cards appear in the first time the app loads. */
export const DEFAULT_WIDGET_ORDER: WidgetId[] = [
  'my-classes',
  'upcoming-dates',
  'campus-events',
  'kuali-time',
  'epto',
  'your-paycheck',
  'recent-notifications',
];
