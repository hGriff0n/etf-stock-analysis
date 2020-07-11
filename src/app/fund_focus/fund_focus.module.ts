
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTabsModule } from '@angular/material/tabs';

import { FundFocusComponent } from './fund_focus.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    FundFocusComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    OverlayModule,
    NgxChartsModule,
    MatTabsModule,
  ],
  exports: [
    FundFocusComponent
  ]
})
export class FundFocusModule { }
