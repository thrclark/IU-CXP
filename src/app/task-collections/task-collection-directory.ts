import { TaskCollection } from './task-collection';

/**
 * Example task collections for the prototype. In production these would
 * likely be authored by service owners/UITS staff (role-based collections)
 * or scheduled around the academic calendar (seasonal collections), rather
 * than hard-coded here.
 */
export const TASK_COLLECTIONS: TaskCollection[] = [
  {
    slug: 'new-employee-checklist',
    title: 'New Employee Checklist',
    kind: 'role',
    eyebrow: 'Curated for new employees',
    description: 'The tasks most new IU employees need in their first weeks — getting into HR and payroll systems, verifying eligibility to work, securing your account, and picking up your ID.',
    icon: 'rvt-user',
    serviceSlugs: [
      'hrms',
      'i-9-e-verify-login',
      'new-employee-activity-guide',
      'duo-two-step-login',
      'benefit-details',
      'paycheck-direct-deposit',
      'fidelity-netbenefits',
      'university-id',
    ],
  },
  {
    slug: 'new-student-essentials',
    title: 'New Student Essentials',
    kind: 'role',
    eyebrow: 'Curated for new students',
    description: 'Everything a new student needs to get set up before classes start: registration, coursework, account security, housing, and your student ID.',
    icon: 'rvt-user',
    serviceSlugs: [
      'one-iu-registration',
      'canvas',
      'create-my-first-iu-account',
      'orientation-checklist',
      'duo-two-step-login',
      'student-central',
      'health-center-portal',
      'housing',
      'university-id',
    ],
  },
  {
    slug: 'start-of-semester',
    title: 'Start of Semester',
    kind: 'seasonal',
    eyebrow: 'Active Aug 18 – Sept 5',
    description: 'Time-sensitive tasks for the first weeks of the term — finishing registration, squaring away your bill, getting a parking permit, and grabbing your textbooks.',
    icon: 'rvt-calendar',
    serviceSlugs: [
      'one-iu-registration',
      'class-registration',
      'bursar-billing',
      'parking-permit',
      'iu-bookstore',
      'academic-calendar',
    ],
  },
  {
    slug: 'finals-week',
    title: 'Finals Week',
    kind: 'seasonal',
    eyebrow: 'Active Dec 8 – Dec 19',
    description: 'What matters as the semester wraps up: exam dates and syllabi, course evaluations, a quiet place to study, and the records you\'ll want once grades post.',
    icon: 'rvt-calendar',
    serviceSlugs: [
      'academic-calendar',
      'view-syllabi',
      'online-course-questionnaires',
      'library-catalog',
      'university-library-study-room-reservation',
      'view-grades',
      'view-unofficial-transcript',
      'etranscript-request-recent-students',
    ],
  },
];

export function findCollectionBySlug(slug: string | null | undefined): TaskCollection | undefined {
  return slug ? TASK_COLLECTIONS.find(collection => collection.slug === slug) : undefined;
}
