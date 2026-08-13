import { Component } from '@angular/core';

import { ButtonComponent } from 'espd-common/button';
import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { AdminHeaderModule } from 'espd-common/admin-header';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [ButtonComponent, HeaderModule, ShellModule, SidenavModule, AdminHeaderModule, FooterComponent, IconDirective], // <-- Added AdminHeaderModule to fix NG8001 for <espd-admin-header>
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent {

  // --- This is the "state" (the data) ---
  message: string = 'Hello, Angular World!';

  // --- This is the logic ---
  constructor() { }

  updateMessage() {
    this.message = 'You clicked the button!';
  }
}
