import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialerComponent } from './dialer/dialer.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { TabComponent } from './tab/tab.component';
import { TeamsAuthPopupComponent } from './teams-auth-popup/teams-auth-popup.component';
import { WebComponent } from './web/web.component';

const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: 'dialer', component: DialerComponent },
  { path: 'teamsauthpopup', component: TeamsAuthPopupComponent },
  { path: 'tab', component: TabComponent },
  { path: 'web', component: WebComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
