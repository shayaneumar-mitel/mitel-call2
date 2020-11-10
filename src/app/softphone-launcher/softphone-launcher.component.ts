import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as microsoftTeams from '@microsoft/teams-js';

@Component({
  selector: 'app-softphone-launcher',
  templateUrl: './softphone-launcher.component.html',
  styleUrls: ['./softphone-launcher.component.less']
})
export class SoftphoneLauncherComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    microsoftTeams.initialize(window as any);
    microsoftTeams.getContext((context) => {
      if (context) {
        this.route.queryParams.subscribe(params => {
          window.location.href = 'tel://' + params.number;
        });
      }
    });
  }

}
