import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig as EspdAppConfig } from 'espd-common/config';
import { EspdCommonModule } from 'espd-common/core';
import { SettingService as EspdSettingService } from 'espd-common/setting';
import { Injectable } from '@angular/core';
import { MessageService } from 'espd-common/i18n';

import { routes } from './app.routes';

const applicationConfig: EspdAppConfig = new EspdAppConfig();
applicationConfig.messagePath = '/messages.json';
applicationConfig.settingsPath = '/settings.json';
applicationConfig.enableRoutePageTitles = false;


@Injectable()
export class SettingService extends EspdSettingService {

  initializeSettings(_module: string): void {
    /* no-op */
  }
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    CommonModule,
    provideHttpClient(),
    provideAnimations(),
    { provide: EspdAppConfig, useValue: applicationConfig },
    { provide: EspdSettingService, useClass: SettingService },
    MessageService

  ]
};
