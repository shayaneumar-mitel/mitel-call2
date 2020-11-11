import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as microsoftTeams from '@microsoft/teams-js';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-softphone-launcher',
  templateUrl: './softphone-launcher.component.html',
  styleUrls: ['./softphone-launcher.component.less']
})
export class SoftphoneLauncherComponent implements OnInit {
  window: Window;

  constructor(private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

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
