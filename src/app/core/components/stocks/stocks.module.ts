
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';

import { StockHoldingComponent } from './holding/holding.component';
import { StocklistComponent } from './stocklist/stocklist.component';
import { BrokerComponent } from './broker/broker.component';

@NgModule({
  declarations: [
    StockHoldingComponent,
    StocklistComponent,
    BrokerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatExpansionModule,
    MatListModule,
    InPlaceEditorModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule
  ],
  exports: [
    StockHoldingComponent,
    StocklistComponent
  ]
})
export class StocksModule { }
