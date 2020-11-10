import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialerComponent } from './dialer/dialer.component';
import { SoftphoneLauncherComponent } from './softphone-launcher/softphone-launcher.component';
import { TabComponent } from './tab/tab.component';
import { AuthPopupComponent } from './auth-popup/auth-popup.component';
import { WebComponent } from './web/web.component';

const routes: Routes = [

  { path: 'dialer', component: DialerComponent },
  { path: 'teamsauthpopup', component: AuthPopupComponent },
  { path: 'tab', component: TabComponent },
  { path: 'web', component: WebComponent },
  { path: 'softphonelauncher', component: SoftphoneLauncherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
