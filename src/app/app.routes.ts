import { Routes } from '@angular/router';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';

export const routes: Routes = [
  { path: '', component: HelloWorldComponent },
  { path: 'dashboard', component: HelloWorldComponent },
  { path: 'notifications', component: NotificationCenterComponent },
  { path: 'announcements', component: PlaceholderPageComponent, data: { title: 'Announcements', icon: 'rvt-megaphone' } },
  { path: 'events-calendars', component: PlaceholderPageComponent, data: { title: 'Events & Calendars', icon: 'rvt-calendar' } },
  { path: 'directory', component: PlaceholderPageComponent, data: { title: 'Directory', icon: 'address-book' } },
  { path: 'maps', component: PlaceholderPageComponent, data: { title: 'Maps', icon: 'rvt-map-pin' } },
];
