import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

import { CardComponent } from '../card/card.component';

interface NotificationItem {
  icon: string;
  title: string;
  time: string;
}

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [RouterLink, HeaderModule, ShellModule, SidenavModule, FooterComponent, IconDirective, CardComponent],
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent {
  notifications: NotificationItem[] = [
    { icon: 'rvt-megaphone', title: 'Registration opens Monday', time: '2 hours ago' },
    { icon: 'rvt-calendar', title: 'Career Fair starts Thursday at 10am', time: 'Yesterday' },
    { icon: 'address-book', title: 'Your advisor added a new contact note', time: '2 days ago' },
    { icon: 'rvt-calendar', title: 'Homecoming Weekend schedule posted', time: '3 days ago' },
    { icon: 'rvt-megaphone', title: 'Financial aid deadline extended', time: '5 days ago' },
  ];

  footerHtml = `
    <footer class="rbt-footer mt-auto">
      <img src="https://sd-prd-images.s3.amazonaws.com/prd/test-uisapp2/20150702T0521168403962_trident-small.png" alt="Indiana University" width="20" height="25" class="mr-3">
      <ul class="rbt-footer-aux-links">
        <li class="rbt-footer-aux-item"><a href="https://accessibility.iu.edu/assistance/" rel="nofollow">Accessibility </a></li>
        <li class="rbt-footer-aux-item"><a href="https://espd.apps.iu.edu/privacyStatement.html" rel="nofollow">Privacy Notice</a></li>
        <li class="rbt-footer-aux-item"><a href="https://www.iu.edu/copyright/index.html" rel="nofollow">Copyright</a> © 2026 The Trustees of <a href="https://www.iu.edu" rel="nofollow"> Indiana University </a></li>
      </ul>
    </footer>
  `;
}
