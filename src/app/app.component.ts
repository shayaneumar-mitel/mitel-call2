import { Component, Inject, OnInit } from '@angular/core';

import * as microsoftTeams from '@microsoft/teams-js';
import { AuthService } from './services/AuthService';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'MS Teams Dialer';
  window: Window;

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  ngOnInit(): void {
    this.authService.init();
    microsoftTeams.initialize(window as any);
  }
}
