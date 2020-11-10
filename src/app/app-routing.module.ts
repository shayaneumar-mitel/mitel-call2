import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialerComponent } from './dialer/dialer.component';
import { TabComponent } from './tab/tab.component';
import { TeamsAuthPopupComponent } from './teams-auth-popup/teams-auth-popup.component';
import { WebComponent } from './web/web.component';

const routes: Routes = [

  { path: 'dialer', component: DialerComponent },
  { path: 'teamsauthpopup', component: TeamsAuthPopupComponent },
  { path: 'tab', component: TabComponent },
  { path: 'web', component: WebComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
