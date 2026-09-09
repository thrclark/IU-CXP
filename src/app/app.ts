import { Component, inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { MessageService } from "espd-common/i18n";
import { SettingService } from "espd-common/setting";
import { MODULE_NAME } from 'espd-common/config';

import { AssistantWidgetComponent } from './assistant/assistant-widget/assistant-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AssistantWidgetComponent],
  providers: [

  ],

  templateUrl: './app.html', // This line points to your HTML file
  styleUrls: ['./app.css']
})
export class AppComponent {
  private messageService = inject(MessageService);
  private settingService = inject(SettingService);
  constructor () {
    this.settingService.init(MODULE_NAME);
    this.messageService.init(MODULE_NAME);
  }
}
