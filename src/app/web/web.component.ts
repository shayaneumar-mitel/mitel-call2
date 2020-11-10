import { Component, OnInit } from '@angular/core';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';
import AuthService from '../services/AuthService';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.less']
})
export class WebComponent implements OnInit {
  msGraphClient: any;
  accessToken = null;
  messages = [];
  contactName = '';
  error = '';

  constructor() { }

  ngOnInit(): void {
    if (!AuthService.isLoggedIn()) {
      // Will redirect the browser and not return; will redirect back if successful
      AuthService.login(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All']);
    } else {
      this.msGraphClient = MicrosoftGraphClient.Client.init({
        authProvider: async (done) => {
          if (!this.accessToken) {
            // Might redirect the browser and not return; will redirect back if successful
            const token = await AuthService.getAccessToken(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All']);
            this.accessToken = token;
          }
          done(null, this.accessToken);
        }
      });
    }
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

  callhandler(event, phoneNumber): void {
    console.log(phoneNumber);
    window.location.href = 'tel://' + phoneNumber;
  }

}
