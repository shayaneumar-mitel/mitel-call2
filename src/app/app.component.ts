import { Component, OnInit } from '@angular/core';
import AuthService from './services/AuthService';
import * as microsoftTeams from '@microsoft/teams-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'test';

  ngOnInit(): void {
    AuthService.init();
    microsoftTeams.initialize(window as any);
  }
}
