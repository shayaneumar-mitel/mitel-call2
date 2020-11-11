import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import * as microsoftTeams from '@microsoft/teams-js';

@Component({
  selector: 'app-dialer',
  templateUrl: './dialer.component.html',
  styleUrls: ['./dialer.component.less']
})
export class DialerComponent implements OnInit {
  number = '';
  window: Window;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
    this.number = '';
  }

  ngOnInit(): void {
    microsoftTeams.initialize(this.window as any);
  }

  addDigit(digit: string): void {
    this.number += digit;
  }

  removeLastDigit(): void {
    this.number = this.number.slice(0, -1);
  }

  dialNumber(): void {

    microsoftTeams.getContext((context) => {
      if (context) {
        if (context.hostClientType === 'web') {
          microsoftTeams.authentication.authenticate({
            url: window.location.origin + `#/softphonelauncher?number=${this.number}`,
            width: 600,
            height: 535
          });
        } else {
          this.window.location.href = `tel://${this.number}`;
        }
      }
    });
  }
}
