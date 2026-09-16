import { Injectable } from '@angular/core';

import { DEFAULT_PERSONA_ID, findPersona, Persona, PersonaId, PERSONAS } from './persona';

const STORAGE_KEY = 'iu-cxp.persona';

/**
 * Prototype-only "view as" persona switcher.
 *
 * Holds which demo persona the app is currently being viewed as, so a
 * hidden switcher (see IdentityMenuComponent) can let anyone previewing the
 * prototype flip between an authenticated user, a first-year student, a
 * graduating student, faculty, and staff without needing real accounts for
 * each. The choice is remembered in this browser (localStorage) so it
 * survives a refresh, but it never leaves the browser -- there's no backend
 * concept of persona here.
 *
 * This is the foundation piece: today it only drives the identity block and
 * switcher panel. Pages can read `personaService.current` to tailor content
 * per persona as that work happens.
 */
@Injectable({ providedIn: 'root' })
export class PersonaService {
  private currentId: PersonaId = this.readStoredId() ?? DEFAULT_PERSONA_ID;

  /** All personas the switcher can offer, in display order. */
  get personas(): Persona[] {
    return PERSONAS;
  }

  /** The persona currently being viewed as. */
  get current(): Persona {
    return findPersona(this.currentId);
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
      // Private browsing / storage disabled -- fall back to the default.
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
