/**
 * The set of demo personas the "view as" switcher can impersonate.
 *
 * This is a prototype-only concept: there is no real authentication in this
 * app, so "authenticated" just means the default signed-in view with no
 * persona-specific slant applied. The rest stand in for the audiences this
 * tool is being designed for, so stakeholders can see how the experience
 * might read for each one as persona-aware content gets built out.
 */
export type PersonaId = 'authenticated' | 'first-year' | 'graduating' | 'faculty' | 'staff';

export interface Persona {
  id: PersonaId;
  /** Username shown in the header's identity block, e.g. "thrclark". */
  username: string;
  /** Short role label shown in the identity block and switcher, e.g. "Faculty Member". */
  label: string;
  /** One-line description shown under the label in the switcher panel. */
  description: string;
  /** Real name shown in the expanded switcher panel, e.g. "Tom Clark". */
  displayName: string;
  /** Two-letter initials shown in the avatar circle. */
  initials: string;
}

export const PERSONAS: Persona[] = [
  {
    id: 'authenticated',
    username: 'thrclark',
    label: 'Authenticated User',
    description: 'Default signed-in view, with no persona-specific customization applied.',
    displayName: 'Tom Clark',
    initials: 'TC',
  },
  {
    id: 'first-year',
    username: 'arivera',
    label: 'First-Year Student',
    description: 'New to campus and early in their degree -- orientation, first classes, getting settled.',
    displayName: 'Alex Rivera',
    initials: 'AR',
  },
  {
    id: 'graduating',
    username: 'jblake',
    label: 'Graduating Student',
    description: 'In their final year -- graduation requirements, commencement, and next-step planning.',
    displayName: 'Jordan Blake',
    initials: 'JB',
  },
  {
    id: 'faculty',
    username: 'mchen',
    label: 'Faculty Member',
    description: 'Teaches courses and advises students -- class rosters, research, and instructional tools.',
    displayName: 'Dr. Maria Chen',
    initials: 'MC',
  },
  {
    id: 'staff',
    username: 'spatel',
    label: 'Staff Member',
    description: 'Works in a campus office or department -- HR, payroll, and day-to-day operations tools.',
    displayName: 'Sam Patel',
    initials: 'SP',
  },
];

export const DEFAULT_PERSONA_ID: PersonaId = 'authenticated';

export function findPersona(id: PersonaId | string | null | undefined): Persona {
  return PERSONAS.find(persona => persona.id === id) ?? PERSONAS[0];
}
