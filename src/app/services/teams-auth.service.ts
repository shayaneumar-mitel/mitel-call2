
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';


// TeamsAuthService is a singleton so it can retain the user's
// state independent of React state. This module exports the single
// instance of the service rather than the service class; just use it,
// don't new it up.
@Injectable({
  providedIn: 'root',
})
export class TeamsAuthService {
  authState: any;
  window: Window;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;

    this.authState = {
      username: null,
      accessToken: null,
      expiresOn: Date.now()
    };
  }

  // Determine if someone is logged in
  isLoggedIn(): boolean {
    return Date.now() < this.authState.expiresOn;
  }

  // Get the logged in user name or null if not logged in
  getUsername(): string {
    return this.authState.username;
  }

  // Call this to get an access token
  getAccessToken(scopes, microsoftTeams): Promise<void> {

    return new Promise((resolve, reject) => {
      microsoftTeams.authentication.authenticate({
        url: window.location.origin + '/#/teamsauthpopup',
        width: 600,
        height: 535,
        successCallback: (response) => {
          const { username, accessToken, expiresOn } =
            JSON.parse(response);
          this.authState = { username, accessToken, expiresOn };
          resolve(accessToken);
        },
        failureCallback: (reason) => {
          reject(reason);
        }
      });

    });

  }
}
