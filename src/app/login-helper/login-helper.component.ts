import { Component, OnInit } from '@angular/core';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';
import { TeamsAuthService } from '../services/teams-auth.service';
import * as microsoftTeams from '@microsoft/teams-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-helper',
  templateUrl: './login-helper.component.html',
  styleUrls: ['./login-helper.component.less']
})
export class LoginHelperComponent implements OnInit {
  msGraphClient: MicrosoftGraphClient.Client;
  accessToken = null;

  constructor(private teamsAuthService: TeamsAuthService, private router: Router) { }

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
        this.router.navigate(['tab']);
      }
    });
  }

  getContacts(contactName: string): any {
    this.msGraphClient
      .api('me')
      .get();
  }
}
