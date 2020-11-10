import { Component, OnInit } from '@angular/core';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';
import TeamsAuthService from '../services/TeamsAuthService';
import * as microsoftTeams from '@microsoft/teams-js';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less']
})
export class TabComponent implements OnInit {
  msGraphClient: any;
  accessToken = null;
  messages = [];
  name = '';
  error = '';

  constructor() { }

  ngOnInit(): void {

    this.msGraphClient = MicrosoftGraphClient.Client.init({
      authProvider: async (done) => {
        if (!this.accessToken) {
          const token = await TeamsAuthService
            .getAccessToken(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All'],
              microsoftTeams);
          this.accessToken = token;
        }
        done(null, this.accessToken);
      }
    });
  }

  getContacts(event): void {
    this.msGraphClient
      .api('users')
      .filter(`startswith(displayName,'${this.name}')`)
      .get(async (error, rawMessages, rawResponse) => {
        if (!error) {
          this.messages = rawMessages.value;
        } else {
          this.error = error;
        }
      });
  }

}
