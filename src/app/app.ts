// 1. Add this import statement at the top
import { HelloWorldComponent } from './hello-world/hello-world.component';

import { Component, inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router'; // Yours might have this
import { MessageService } from "espd-common/i18n";
import { SettingService } from "espd-common/setting";
import { MODULE_NAME } from 'espd-common/config';

@Component({
  selector: 'app-root',
  standalone: true,

  // 2. Add HelloWorldComponent to the 'imports' array
  imports: [HelloWorldComponent], // Add it to this list
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
