import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPopupComponent } from './auth-popup/auth-popup.component';
import { TabComponent } from './tab/tab.component';
import { WebComponent } from './web/web.component';
import { DialerComponent } from './dialer/dialer.component';
import { FormsModule } from '@angular/forms';
import { SoftphoneLauncherComponent } from './softphone-launcher/softphone-launcher.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPopupComponent,
    TabComponent,
    WebComponent,
    DialerComponent,
    SoftphoneLauncherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
