
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { DrawerRailModule } from 'angular-material-rail-drawer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavPanelComponent } from './navpanel.component';

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
    MatButtonModule
  ],
  exports: [
      NavPanelComponent
  ]
})
export class NavPanelModule { }
