export interface CampusEvent {
  /** Stable identifier for the event, e.g. "fall-career-fair". */
  id: string;
  title: string;
  /** Event type shown as a small label, e.g. "Career", "Athletics". */
  category: string;
  /** Short display date, e.g. "Sept 11". */
  date: string;
  /** Display time (or time range), e.g. "10:00 AM–2:00 PM". */
  time: string;
  location: string;
  /** One line of additional context shown alongside the event. */
  description: string;
  /** IU campus codes (e.g. ['IUB', 'IUK']) this event is happening at. */
  campuses: string[];
}

/**
 * Mock campus events for prototype purposes -- not sourced from a real
 * events calendar. Standing in for a future campus events feed/API.
 */
export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: 'fall-career-fair',
    title: 'Fall Career Fair',
    category: 'Career',
    date: 'Sept 11',
    time: '10:00 AM–2:00 PM',
    location: 'Indiana Memorial Union — Alumni Hall',
    description: 'Meet recruiters from over 150 employers hiring for internships and full-time roles.',
    campuses: ['IUB'],
  },
  {
    id: 'grad-school-info-session',
    title: 'Graduate School Info Session',
    category: 'Academics',
    date: 'Sept 16',
    time: '3:00 PM',
    location: 'Wells Library, Room E174',
    description: 'Learn about application timelines, funding, and how to request letters of recommendation.',
    campuses: ['IUB', 'IUI'],
  },
  {
    id: 'womens-soccer-vs-purdue',
    title: "Women's Soccer vs. Purdue",
    category: 'Athletics',
    date: 'Sept 19',
    time: '7:00 PM',
    location: 'Bill Armstrong Stadium',
    description: 'Student tickets are free with a valid IU ID — gates open one hour before kickoff.',
    campuses: ['IUB'],
  },
  {
    id: 'sustainability-week-kickoff',
    title: 'Sustainability Week Kickoff',
    category: 'Student Life',
    date: 'Sept 22',
    time: '12:00–2:00 PM',
    location: 'Dunn Meadow',
    description: 'Food trucks, a campus clothing swap, and info tables from campus sustainability groups.',
    campuses: ['IUB'],
  },
  {
    id: 'homecoming-weekend-concert',
    title: 'Homecoming Weekend Concert',
    category: 'Arts & Culture',
    date: 'Oct 3',
    time: '7:00 PM',
    location: 'Assembly Hall',
    description: 'Free for students with a valid IU ID; doors open at 6:00 PM.',
    campuses: ['IUB', 'IUI', 'IUE', 'IUK', 'IUN', 'IUS', 'IUSB', 'IUFW', 'IUC'],
  },
  {
    id: 'multicultural-student-showcase',
    title: 'Multicultural Student Showcase',
    category: 'Student Life',
    date: 'Oct 9',
    time: '6:00 PM',
    location: 'Neal-Marshall Black Culture Center',
    description: 'An evening of performances and food celebrating student cultural organizations.',
    campuses: ['IUB'],
  },
];
