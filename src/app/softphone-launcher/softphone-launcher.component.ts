import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as microsoftTeams from '@microsoft/teams-js';

@Component({
  selector: 'app-softphone-launcher',
  templateUrl: './softphone-launcher.component.html',
  styleUrls: ['./softphone-launcher.component.less']
})
export class SoftphoneLauncherComponent implements OnInit {

  constructor(private route: ActivatedRoute, private window: Window) { }

  ngOnInit(): void {
    microsoftTeams.initialize(this.window as any);
    microsoftTeams.getContext((context) => {
      if (context) {
        this.route.queryParams.subscribe(params => {
          this.window.location.href = 'tel://' + params.number;
        });
      }
    });
  }

}
