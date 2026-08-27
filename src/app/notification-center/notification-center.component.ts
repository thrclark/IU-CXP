import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeaderModule } from 'espd-common/header';
import { ShellModule } from 'espd-common/layout/shell';
import { SidenavModule } from 'espd-common/sidenav';
import { FooterComponent } from 'espd-common/footer';
import { IconDirective } from 'espd-common/icon';

interface NotificationItem {
  timestamp: string;
  department: string;
  title: string;
  description: string;
  fullDescription: string;
  linkText: string;
  linkUrl: string;
  type: 'urgent' | 'standard';
  pinned: boolean;
}

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [RouterLink, HeaderModule, ShellModule, SidenavModule, FooterComponent, IconDirective],
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent {
  notifications: NotificationItem[] = [
    {
      timestamp: 'Aug 27, 2026, 9:15 AM',
      department: 'Office of the Registrar',
      title: 'Registration opens Monday',
      description: 'Spring semester registration begins next Monday. Be sure to meet with your advisor before enrolling.',
      fullDescription: 'Registration for the Spring 2027 semester officially opens on Monday, September 1st, at 8:00 AM. All students are encouraged to review their degree audit and confirm their course plan with their academic advisor before their registration time ticket opens. Priority registration windows are assigned based on earned credit hours and will be visible in One.IU starting this Friday. If you have a registration hold on your account, resolve it as soon as possible to avoid delays.',
      linkText: 'Go to registration',
      linkUrl: '#',
      type: 'urgent',
      pinned: true,
    },
    {
      timestamp: 'Aug 26, 2026, 1:40 PM',
      department: 'Career Development Center',
      title: 'Career Fair starts Thursday at 10am',
      description: 'Meet with over 50 employers in the Union Building from 10am to 2pm.',
      fullDescription: 'Join more than 50 employers from across the region for the Fall Career Fair, taking place Thursday from 10:00 AM to 2:00 PM in the Indiana Memorial Union, Alumni Hall. Bring several copies of your resume and dress in business casual attire. Representatives will be recruiting for full-time positions, internships, and co-ops across a wide range of industries, including technology, healthcare, finance, and education. Career coaches will also be on-site to review resumes on the spot.',
      linkText: 'View event details',
      linkUrl: '#',
      type: 'standard',
      pinned: false,
    },
    {
      timestamp: 'Aug 25, 2026, 4:05 PM',
      department: 'Academic Advising',
      title: 'Your advisor added a new contact note',
      description: 'A summary of your most recent advising appointment is now available to review.',
      fullDescription: 'Your academic advisor, James Allen, has added a note following your most recent advising appointment on November 15th. The note includes a summary of the courses discussed, a recommended plan for next semester\'s registration, and a reminder to confirm your minor declaration paperwork before the end of the term. Please review the note in the advising portal and reach out if you have questions or would like to schedule a follow-up appointment.',
      linkText: 'Read the note',
      linkUrl: '#',
      type: 'urgent',
      pinned: false,
    },
    {
      timestamp: 'Aug 24, 2026, 11:00 AM',
      department: 'Alumni Association',
      title: 'Homecoming Weekend schedule posted',
      description: 'The full schedule of events for Homecoming Weekend, October 3 through 5, is now available.',
      fullDescription: 'The full Homecoming Weekend schedule is now live, covering all events from October 3rd through October 5th. Highlights include the alumni tailgate on Saturday morning, the Homecoming parade down Kirkwood Avenue, the football game against Purdue at 3:30 PM, and the class reunion receptions held Friday evening. A detailed map and shuttle schedule are available on the alumni website to help you plan your weekend.',
      linkText: 'View schedule',
      linkUrl: '#',
      type: 'standard',
      pinned: true,
    },
    {
      timestamp: 'Aug 22, 2026, 8:30 AM',
      department: 'Office of Student Financial Aid',
      title: 'Financial aid deadline extended',
      description: 'The deadline to submit outstanding financial aid documents has been extended to September 1st.',
      fullDescription: 'The deadline to submit outstanding financial aid documentation has been extended from August 25th to September 1st due to a processing delay affecting several student accounts. Students with missing verification documents, tax transcripts, or dependency override requests should submit them through the Financial Aid document upload portal as soon as possible. Awards cannot be finalized until all required documents are received and reviewed.',
      linkText: 'Submit documents',
      linkUrl: '#',
      type: 'standard',
      pinned: false,
    },
  ];

  selectedNotification: NotificationItem | null = null;
  pinnedOnly = false;

  get visibleNotifications(): NotificationItem[] {
    return this.pinnedOnly ? this.notifications.filter(notification => notification.pinned) : this.notifications;
  }

  openNotification(notification: NotificationItem): void {
    this.selectedNotification = notification;
  }

  closeNotification(): void {
    this.selectedNotification = null;
  }

  togglePin(notification: NotificationItem, event: Event): void {
    event.stopPropagation();
    notification.pinned = !notification.pinned;
  }

  removeNotification(notification: NotificationItem, event: Event): void {
    event.stopPropagation();
    this.notifications = this.notifications.filter(n => n !== notification);
  }

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

  // --- Notification bell prototype ---
  notificationsOpen = false;

  toggleNotifications(event: Event): void {
    event.stopPropagation();
    this.notificationsOpen = !this.notificationsOpen;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.notificationsOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.notificationsOpen && !(event.target as HTMLElement).closest('.notification-menu')) {
      this.notificationsOpen = false;
    }
  }
}
