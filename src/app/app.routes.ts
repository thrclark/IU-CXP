import { Routes } from '@angular/router';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { NotificationCenterComponent } from './notification-center/notification-center.component';

export const routes: Routes = [
  { path: '', component: HelloWorldComponent },
  { path: 'notifications', component: NotificationCenterComponent },
];
