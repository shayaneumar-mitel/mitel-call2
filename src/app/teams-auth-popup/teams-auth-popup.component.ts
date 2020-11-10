import { Component, OnInit } from '@angular/core';
import AuthService from '../services/AuthService';
import * as microsoftTeams from '@microsoft/teams-js';

@Component({
  selector: 'app-teams-auth-popup',
  templateUrl: './teams-auth-popup.component.html',
  styleUrls: ['./teams-auth-popup.component.less']
})
export class TeamsAuthPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    microsoftTeams.initialize(window as any);
    microsoftTeams.getContext((context) => {
      if (context) {
        // If here we have a Teams context. Ensure we're logged in
        // and then request the access token.
        if (!AuthService.isLoggedIn()) {
          AuthService.login(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All']);
          // This call won't return - catch it on the redirect
        } else {
          AuthService.getAccessTokenEx(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All'])
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
    if (!AuthService.isLoggedIn()) {
      AuthService.login(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All']);
      // This call won't return - catch it on the redirect
    } else {
      AuthService.getAccessTokenEx(['User.Read', 'User.ReadBasic.All', 'Directory.Read.All'])
        .then(({ username, accessToken, expiresOn }) => {
          if (accessToken) {
            const response = JSON.stringify({ username, accessToken, expiresOn })
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
