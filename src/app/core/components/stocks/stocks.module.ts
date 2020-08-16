
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';

import { StockHoldingComponent, HoldingContextMenu } from './holding/holding.component';
import { StocklistComponent, StocklistContextMenu } from './stocklist/stocklist.component';
import { BrokerComponent, BrokerContextMenu } from './broker/broker.component';

@NgModule({
  declarations: [
    StockHoldingComponent,
    StocklistComponent,
    BrokerComponent,
    StocklistContextMenu,
    HoldingContextMenu,
    BrokerContextMenu
  ],
  imports: [
    BrowserAnimationsModule,
    MatExpansionModule,
    MatListModule,
    InPlaceEditorModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatDialogModule,
    MatCardModule,
  ],
  entryComponents: [
    StocklistContextMenu,
    HoldingContextMenu,
    BrokerContextMenu
  ],
  exports: [
    StockHoldingComponent,
    StocklistComponent,
    HoldingContextMenu,
    BrokerContextMenu
  ]
})
export class StocksModule { }
