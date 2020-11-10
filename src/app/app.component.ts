import { Component, OnInit } from '@angular/core';

import * as microsoftTeams from '@microsoft/teams-js';
import { AuthService } from './services/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'MS Teams Dialer';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.init();
    microsoftTeams.initialize(window as any);
  }
}
