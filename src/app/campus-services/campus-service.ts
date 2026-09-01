export interface SupportLink {
  /** Text shown for the link, e.g. "Contact the Registrar". */
  label: string;
  /** Where the link goes. Opens in a new tab. */
  url: string;
}

export interface CampusService {
  /** URL-friendly identifier used for routing, e.g. "one-iu-registration". */
  slug: string;
  title: string;
  category: string;
  /** Short description shown on the dashboard card. */
  description: string;
  /** Longer description shown on the service's dedicated detail page. */
  extendedDescription: string;
  /** Image shown in the identity swatch, relative to /public. */
  imageIcon: string;
  /** Where the service launches. Opens in a new window/tab. */
  launchUrl: string;
  /** IU campus codes (e.g. ['IUB', 'IUK']) this service is available at. */
  campuses: string[];
  /** Help resources shown on the detail page. */
  supportLinks: SupportLink[];
}

export const CAMPUS_SERVICES: CampusService[] = [
  {
    slug: 'one-iu-registration',
    title: 'One.IU Registration',
    category: 'Enrollment',
    description: 'Search, browse, and enroll in courses for the upcoming term from a single dashboard.',
    extendedDescription: 'One.IU Registration is the central hub for planning and enrolling in coursework across your IU career. From here you can search the course catalog, check seat availability in real time, register or drop classes during your assigned time ticket, and view holds that may be blocking enrollment. Registration windows open based on earned credit hours, so check your time ticket in advance and meet with your academic advisor before the window opens if you have questions about your course plan.',
    imageIcon: 'task-icons/citi-training.png',
    launchUrl: 'https://one.iu.edu',
    campuses: ['IUB', 'IUI', 'IUK'],
    supportLinks: [
      { label: 'Office of the Registrar', url: 'https://registrar.iu.edu' },
      { label: 'How to resolve a registration hold', url: 'https://kb.iu.edu' },
      { label: 'Contact the UITS Support Center', url: 'https://uits.iu.edu/contact' },
    ],
  },
  {
    slug: 'canvas',
    title: 'Canvas by Instructure',
    category: 'Learning',
    description: 'Access course materials, assignments, grades, and discussions for all of your enrolled classes.',
    extendedDescription: 'Canvas is IU\'s learning management system, used to deliver course content, collect assignments, host discussions, and post grades. Every course you\'re enrolled in appears automatically on your Canvas dashboard once the instructor publishes it. Canvas is available at every IU campus, and mobile apps are available for iOS and Android so you can keep up with coursework on the go.',
    imageIcon: 'task-icons/signpost.png',
    launchUrl: 'https://canvas.iu.edu',
    campuses: ['IUB', 'IUI', 'IUE', 'IUK', 'IUN', 'IUS', 'IUSB', 'IUFW', 'IUC'],
    supportLinks: [
      { label: 'Canvas Help Center', url: 'https://kb.iu.edu/d/bcqt' },
      { label: 'Request a Canvas course merge', url: 'https://kb.iu.edu' },
      { label: 'Contact the UITS Support Center', url: 'https://uits.iu.edu/contact' },
    ],
  },
  {
    slug: 'duo-two-step-login',
    title: 'Two-Step Login (Duo)',
    category: 'IT Services',
    description: 'Manage your Duo devices and backup methods to keep secure access to IU systems.',
    extendedDescription: 'Two-Step Login, powered by Duo, adds a second layer of security to your IU account on top of your passphrase. From the Duo management portal you can add or remove devices, generate one-time bypass codes, and set a default authentication method. If your primary device is lost, damaged, or replaced, add a backup method right away to avoid being locked out of IU services such as email, Canvas, and One.IU.',
    imageIcon: 'task-icons/academic-calendar.png',
    launchUrl: 'https://uits.iu.edu/2fa',
    campuses: ['IUB', 'IUI'],
    supportLinks: [
      { label: 'About Two-Step Login', url: 'https://kb.iu.edu/d/aiuy' },
      { label: 'Recover access with a bypass code', url: 'https://kb.iu.edu' },
      { label: 'Contact the UITS Support Center', url: 'https://uits.iu.edu/contact' },
    ],
  },
  {
    slug: 'health-center-portal',
    title: 'IU Health Center Portal',
    category: 'Health & Wellness',
    description: 'Schedule appointments, view immunization records, and message campus health providers.',
    extendedDescription: 'The Health Center Portal lets you schedule and manage appointments with campus health providers, view your immunization history, request prescription refills, and securely message your care team. This service is currently available to students on the Bloomington campus; students at other campuses should contact their local student health partner for equivalent services.',
    imageIcon: 'task-icons/remote-work.png',
    launchUrl: '#',
    campuses: ['IUB'],
    supportLinks: [
      { label: 'IU Health Center', url: 'https://healthcenter.indiana.edu' },
      { label: 'Immunization requirements', url: 'https://healthcenter.indiana.edu' },
    ],
  },
  {
    slug: 'handshake',
    title: 'Handshake',
    category: 'Career Services',
    description: 'Browse internships and full-time openings, and register for on-campus recruiting events.',
    extendedDescription: 'Handshake connects you with employers recruiting IU students for internships, co-ops, and full-time roles. Build your profile, upload a resume, browse and apply to postings, and register for career fairs and employer information sessions. Employers post positions year-round, and career coaches are available to review your resume and Handshake profile before you apply.',
    imageIcon: 'task-icons/canvas.png',
    launchUrl: 'https://iu.joinhandshake.com',
    campuses: ['IUB', 'IUI', 'IUE', 'IUK', 'IUN', 'IUS', 'IUSB'],
    supportLinks: [
      { label: 'Career Development Center', url: 'https://careers.indiana.edu' },
      { label: 'Schedule a resume review', url: 'https://careers.indiana.edu' },
    ],
  },
  {
    slug: 'bursar-billing',
    title: 'Bursar Account & Billing',
    category: 'Finance',
    description: 'View your student account balance, make a payment, or set up a payment plan.',
    extendedDescription: 'The Bursar Account & Billing service shows your current student account balance, itemized charges and payments, and upcoming due dates. From here you can make a one-time payment, enroll in a monthly payment plan, and grant a parent or authorized user access to view and pay your bill.',
    imageIcon: 'task-icons/kuali-time.png',
    launchUrl: '#',
    campuses: ['IUI', 'IUC'],
    supportLinks: [
      { label: 'Office of the Bursar', url: 'https://bursar.iu.edu' },
      { label: 'Set up a payment plan', url: 'https://bursar.iu.edu' },
    ],
  },
];

export function findCampusServiceBySlug(slug: string | null | undefined): CampusService | undefined {
  return slug ? CAMPUS_SERVICES.find(service => service.slug === slug) : undefined;
}
