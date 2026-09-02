import { Routes } from '@angular/router';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
import { MapsPageComponent } from './maps-page/maps-page.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';

export const routes: Routes = [
  { path: '', component: HelloWorldComponent },
  { path: 'dashboard', component: HelloWorldComponent },
  { path: 'notifications', component: NotificationCenterComponent },
  { path: 'services/:slug', component: ServiceDetailComponent },
  { path: 'notifications/settings/general', component: PlaceholderPageComponent, data: { title: 'General Settings', icon: 'rvt-gear' } },
  { path: 'notifications/settings/notifications', component: PlaceholderPageComponent, data: { title: 'Notification Settings', icon: 'rvt-gear' } },
  { path: 'announcements', component: PlaceholderPageComponent, data: { title: 'Announcements', icon: 'rvt-megaphone' } },
  { path: 'events-calendars', component: PlaceholderPageComponent, data: { title: 'Events & Calendars', icon: 'rvt-calendar' } },
  { path: 'directory', component: PlaceholderPageComponent, data: { title: 'Directory', icon: 'address-book' } },
  { path: 'maps', component: MapsPageComponent },
];
