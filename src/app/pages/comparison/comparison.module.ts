
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDividerModule } from '@angular/material/divider';
import { InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';

import { ComparisonComponent } from './comparison.component';

@NgModule({
  declarations: [
    ComparisonComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    NgxChartsModule,
    MatTabsModule,
    MatDividerModule,
    InPlaceEditorModule
  ],
  exports: [
    ComparisonComponent
  ]
})
export class ComparisonModule { }
