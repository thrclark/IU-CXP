import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';
import { MapsPageComponent } from './maps-page/maps-page.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { AcademicCalendarComponent } from './academic-calendar/academic-calendar.component';
import { MyClassesComponent } from './my-classes/my-classes.component';
import { CampusEventsComponent } from './campus-events/campus-events.component';
import { KualiTimeComponent } from './kuali-time/kuali-time.component';
import { EptoComponent } from './epto/epto.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'notifications', component: NotificationCenterComponent },
  { path: 'services/:slug', component: ServiceDetailComponent },
  { path: 'collections/:slug', component: CollectionDetailComponent },
  { path: 'notifications/settings/general', component: PlaceholderPageComponent, data: { title: 'General Settings', icon: 'rvt-gear' } },
  { path: 'notifications/settings/notifications', component: PlaceholderPageComponent, data: { title: 'Notification Settings', icon: 'rvt-gear' } },
  { path: 'announcements', component: PlaceholderPageComponent, data: { title: 'Announcements', icon: 'rvt-megaphone' } },
  { path: 'events-calendars/my-classes', component: MyClassesComponent },
  { path: 'events-calendars/campus-events', component: CampusEventsComponent },
  { path: 'events-calendars/academic-calendar', component: AcademicCalendarComponent },
  { path: 'student-life/campus-dining', component: PlaceholderPageComponent, data: { title: 'Campus Dining', icon: 'rvt-star' } },
  { path: 'student-life/athletics', component: PlaceholderPageComponent, data: { title: 'Athletics', icon: 'rvt-flag' } },
  { path: 'student-life/residential-services', component: PlaceholderPageComponent, data: { title: 'Residential Services', icon: 'rvt-building' } },
  { path: 'employee-center/human-resources', component: PlaceholderPageComponent, data: { title: 'Human Resources', icon: 'rvt-user' } },
  { path: 'employee-center/kuali-time', component: KualiTimeComponent },
  { path: 'employee-center/epto', component: EptoComponent },
  { path: 'employee-center/your-paycheck', component: PlaceholderPageComponent, data: { title: 'Your Paycheck', icon: 'rvt-file' } },
  { path: 'student-life/marketplace', component: PlaceholderPageComponent, data: { title: 'IU Marketplace', icon: 'tag' } },
  { path: 'directory', component: PlaceholderPageComponent, data: { title: 'Directory', icon: 'address-book' } },
  { path: 'maps', component: MapsPageComponent },
];
