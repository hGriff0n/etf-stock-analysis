
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DrawerRailModule } from 'angular-material-rail-drawer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavPanelComponent } from './navpanel.component';
import { AppRoutingModule } from '../app-routing.module';
import { InAppMenuLinkModule } from './page_link/page_link.module';

@NgModule({
  declarations: [
    NavPanelComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    DrawerRailModule,
    MatButtonModule,
    MatButtonToggleModule,
    AppRoutingModule,
    InAppMenuLinkModule,
  ],
  exports: [
      NavPanelComponent
  ]
})
export class NavPanelModule { }
