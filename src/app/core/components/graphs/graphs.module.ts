
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { GraphHolderComponent, GraphComponent } from './graphs.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    GraphHolderComponent,
    GraphComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxChartsModule,
    MatTabsModule
  ],
  exports: [
    GraphHolderComponent,
    GraphComponent
  ]
})
export class GraphsModule { }
