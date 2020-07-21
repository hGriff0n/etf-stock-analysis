
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { OverviewComponent } from './overview.component';
import { StocksModule } from '../../core/components/stocks/stocks.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    BrowserAnimationsModule,
  ],
  exports: [
    OverviewComponent
  ]
})
export class OverviewModule { }
