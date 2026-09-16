import { Component, HostListener, inject } from '@angular/core';

import { PersonaService } from '../persona/persona.service';
import { PersonaId } from '../persona/persona';

/**
 * The header's identity block (avatar + name) and its "view as" panel.
 *
 * This replaces espd-header's built-in `[user]` avatar -- that one is just a
 * static display with no click behavior -- with a clickable identity block
 * that opens a panel where anyone previewing the prototype can switch which
 * persona they're viewing it as (see PersonaService). It's a stand-in for
 * what will eventually be an admin capability to preview the app as a
 * specific user; for now it's a prototype-only "back door" available to
 * anyone.
 *
 * Drop this into the same `desktop-menu` / `mobile-menu` slots on
 * `<espd-header>` that used to carry the `[user]` input, and remove that
 * input so the library doesn't also render its own non-interactive avatar.
 */
@Component({
  selector: 'app-identity-menu',
  standalone: true,
  imports: [],
  templateUrl: './identity-menu.component.html',
  styleUrls: ['./identity-menu.component.css'],
})
export class IdentityMenuComponent {
  protected persona = inject(PersonaService);

  open = false;

  toggle(event: Event): void {
    event.stopPropagation();
    this.open = !this.open;
  }

  choose(id: PersonaId): void {
    this.persona.setPersona(id);
    this.open = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.open && !(event.target as HTMLElement).closest('.identity-menu')) {
      this.open = false;
    }
  }
}
