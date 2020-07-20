import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FundFocusComponent} from './pages/fund_focus/fund_focus.component';
import {OverviewComponent} from './pages/overview/overview.component';
import {ComparisonComponent} from './pages/comparison/comparison.component';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'fund-focus/:symbol', component: FundFocusComponent },
  { path: 'portfolio', component: PortfolioComponent },
  // NOTE: In practice, the page will have a search bar by default?
  { path: 'compare/:base/:replace', component: ComparisonComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
