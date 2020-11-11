import { Component, Inject, OnInit } from '@angular/core';
import * as microsoftTeams from '@microsoft/teams-js';
import { AuthService } from '../services/AuthService';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-teams-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.less']
})
export class AuthPopupComponent implements OnInit {
  window: Window;

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  ngOnInit(): void {
    microsoftTeams.initialize(this.window as any);
    microsoftTeams.getContext((context) => {
      if (context) {
        // If here we have a Teams context. Ensure we're logged in
        // and then request the access token.
        if (!this.authService.isLoggedIn()) {
          this.authService.login(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All']);
          // This call won't return - catch it on the redirect
        } else {
          this.authService.getAccessTokenEx(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All'])
            .then(({ username, accessToken, expiresOn }) => {
              if (accessToken) {
                const response = JSON.stringify({ username, accessToken, expiresOn });
                microsoftTeams.authentication.notifySuccess(response);
              } else {
                microsoftTeams.authentication.notifyFailure('Unexpected failure - null token received');
              }
            })
            .catch((error) => {
              console.log(error);
              microsoftTeams.authentication.notifyFailure(error);
            });
        }
      }
    });

    // // If here we have a Teams context. Ensure we're logged in
    // // and then request the access token.
    if (!this.authService.isLoggedIn()) {
      this.authService.login(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All']);
      // This call won't return - catch it on the redirect
    } else {
      this.authService.getAccessTokenEx(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All'])
        .then(({ username, accessToken, expiresOn }) => {
          if (accessToken) {
            const response = JSON.stringify({ username, accessToken, expiresOn });
            microsoftTeams.authentication.notifySuccess(response);
          } else {
            microsoftTeams.authentication.notifyFailure('Unexpected failure - null token received');
          }
        })
        .catch((error) => {
          console.log(error);
          microsoftTeams.authentication.notifyFailure(error);
        });
    }
  }

}
