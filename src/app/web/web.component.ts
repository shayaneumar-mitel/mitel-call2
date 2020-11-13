import { Component, Inject, OnInit } from '@angular/core';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';
import { AuthService } from '../services/auth.service';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.less']
})
export class WebComponent implements OnInit {
  window: Window;
  msGraphClient: MicrosoftGraphClient.Client;
  accessToken = null;
  contacts = [];
  error = '';
  contactSearchField = new FormControl();

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // Will redirect the browser and not return; will redirect back if successful
      this.authService.login(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All']);
    } else {
      this.msGraphClient = MicrosoftGraphClient.Client.init({
        authProvider: async (done) => {
          if (!this.accessToken) {
            // Might redirect the browser and not return; will redirect back if successful
            const token = await this.authService.getAccessToken(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All']);
            this.accessToken = token;
          }
          done(null, this.accessToken);
        }
      });
    }

    this.contactSearchField.valueChanges
      .pipe(debounceTime(200),
        distinctUntilChanged(),
        switchMap((query) => this.getContacts(query))
      )
      .subscribe(() => { });
  }

  getContacts(contactName: string): any {
    this.msGraphClient
      .api('users')
      .filter(`startswith(displayName,'${contactName}')`)
      .get(async (error, rawMessages, rawResponse) => {
        if (!error) {
          this.contacts = rawMessages.value;
        } else {
          this.error = error.body;
        }
      });
  }

  callhandler(event, phoneNumber): void {
    console.log(phoneNumber);
    this.window.location.href = 'tel://' + phoneNumber;
  }

}
