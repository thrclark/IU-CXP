import { Injectable } from '@angular/core';

import { findPersona, Persona, PersonaId, PERSONAS } from './persona';

const STORAGE_KEY = 'iu-cxp.persona';

/**
 * Prototype-only "view as" persona switcher.
 *
 * By default nobody is signed in -- `current` is null, and the identity
 * block shows the generic "Welcome! / Sign in" state. The "Backdoor user"
 * entry in that panel (see IdentityMenuComponent) is a prototype-only way
 * to preview the app as one of a handful of demo personas -- an
 * authenticated user, a first-year student, a graduating student, faculty,
 * and staff -- without needing real accounts for each. The choice is
 * remembered in this browser (localStorage) so it survives a refresh, but
 * it never leaves the browser -- there's no backend concept of persona
 * here, and no real sign-in behind the "Sign in" button.
 *
 * This is the foundation piece: today it only drives the identity block and
 * switcher panel. Pages can read `personaService.current` to tailor content
 * per persona as that work happens.
 */
@Injectable({ providedIn: 'root' })
export class PersonaService {
  private currentId: PersonaId | null = this.readStoredId();

  /** All personas the backdoor switcher can offer, in display order. */
  get personas(): Persona[] {
    return PERSONAS;
  }

  /** The persona currently being viewed as via the backdoor, or null if nobody's been picked (the default "not signed in" state). */
  get current(): Persona | null {
    return this.currentId ? findPersona(this.currentId) : null;
  }

  /** Switch to a different persona and remember the choice in this browser. */
  setPersona(id: PersonaId): void {
    this.currentId = id;
    this.writeStoredId(id);
  }

  private readStoredId(): PersonaId | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return PERSONAS.some(persona => persona.id === stored) ? (stored as PersonaId) : null;
    } catch {
      // Private browsing / storage disabled -- fall back to signed out.
      return null;
    }
  }

  private writeStoredId(id: PersonaId): void {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Ignore -- persona switching still works for the rest of the session.
    }
  }
}
