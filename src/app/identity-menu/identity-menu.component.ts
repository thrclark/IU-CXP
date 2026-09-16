import { Component, HostListener, inject } from '@angular/core';

import { IconDirective } from 'espd-common/icon';

import { PersonaService } from '../persona/persona.service';
import { Persona, PersonaId } from '../persona/persona';

type IdentityPanelView = 'menu' | 'backdoor';

/**
 * The header's identity block (avatar) and its account panel.
 *
 * This replaces espd-header's built-in `[user]` avatar -- that one is just a
 * static display with no click behavior -- with a clickable identity block
 * that opens a panel. By default nobody is "signed in" (PersonaService.current
 * is null), so both the header and the panel show the generic anonymous
 * "Welcome! / Sign in" state alongside a menu of account-level links.
 *
 * "Backdoor user" is the prototype's stand-in for what will eventually be an
 * admin capability to preview the app as a specific user: it swaps the panel
 * to a "view prototype as" list (see PersonaService) where anyone previewing
 * the prototype can pick a persona -- an authenticated user, a first-year
 * student, a graduating student, faculty, or staff -- and have the identity
 * block and panel reflect that persona from then on.
 *
 * Drop this into the same `desktop-menu` / `mobile-menu` slots on
 * `<espd-header>` that used to carry the `[user]` input, and remove that
 * input so the library doesn't also render its own non-interactive avatar.
 */
@Component({
  selector: 'app-identity-menu',
  standalone: true,
  imports: [IconDirective],
  templateUrl: './identity-menu.component.html',
  styleUrls: ['./identity-menu.component.css'],
})
export class IdentityMenuComponent {
  protected persona = inject(PersonaService);

  open = false;
  view: IdentityPanelView = 'menu';

  get identityAriaLabel(): string {
    const current = this.persona.current;
    return current
      ? `Account menu -- viewing as ${current.displayName}, ${current.label}`
      : 'Account menu -- not signed in';
  }

  toggle(event: Event): void {
    event.stopPropagation();
    if (this.open) {
      this.closePanel();
    } else {
      this.open = true;
    }
  }

  showBackdoor(event: Event): void {
    event.stopPropagation();
    this.view = 'backdoor';
  }

  showMenu(event: Event): void {
    event.stopPropagation();
    this.view = 'menu';
  }

  choose(id: PersonaId): void {
    this.persona.setPersona(id);
    this.closePanel();
  }

  isActive(option: Persona): boolean {
    return option.id === this.persona.current?.id;
  }

  private closePanel(): void {
    this.open = false;
    this.view = 'menu';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closePanel();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.open && !(event.target as HTMLElement).closest('.identity-menu')) {
      this.closePanel();
    }
  }
}
