import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FundFocusComponent} from './fund_focus/fund_focus.component';
import {OverviewComponent} from './overview/overview.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'fund-focus', component: FundFocusComponent },
  { path: 'dash', component: DashboardComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
