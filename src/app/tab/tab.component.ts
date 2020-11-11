import { Component, Inject, OnInit } from '@angular/core';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';
import { TeamsAuthService } from '../services/TeamsAuthService';
import * as microsoftTeams from '@microsoft/teams-js';
import { DOCUMENT } from '@angular/common';

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
  window: Window;

  constructor(private teamsAuthService: TeamsAuthService, @Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

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
