import { Component, OnInit } from '@angular/core';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';
import { TeamsAuthService } from '../services/TeamsAuthService';
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
  error = '';
  contactName = '';

  constructor(private teamsAuthService: TeamsAuthService, private window: Window) { }

  ngOnInit(): void {

    this.msGraphClient = MicrosoftGraphClient.Client.init({
      authProvider: async (done) => {
        if (!this.accessToken) {
          const token = await this.teamsAuthService
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
      .filter(`startswith(displayName,'${this.contactName}')`)
      .get(async (error, rawMessages, rawResponse) => {
        if (!error) {
          this.messages = rawMessages.value;
        } else {
          this.error = error;
        }
      });
  }

  callhandler(event: any, phoneNumber: string): void {
    microsoftTeams.getContext((context) => {
      if (context) {
        if (context.hostClientType === 'web') {
          microsoftTeams.authentication.authenticate({
            url: window.location.origin + '#/softphonelauncher?number=' + phoneNumber,
            width: 600,
            height: 535
          });
        } else {
          this.window.location.href = 'tel://' + phoneNumber;
        }
      }
    });
  }

}
