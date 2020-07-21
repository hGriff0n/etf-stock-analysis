
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

// import { SatPopoverModule } from '@ncstate/sat-popover';
import { PortfolioComponent, EvenOddPipe } from './portfolio.component';
import { StocksModule } from '../../core/components/stocks/stocks.module';

@NgModule({
  declarations: [
    PortfolioComponent, EvenOddPipe
  ],
  imports: [
    BrowserAnimationsModule,
    DragDropModule,
    StocksModule,
    MatSelectModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [
    PortfolioComponent
  ]
})
export class PortfolioModule { }
