import { Component } from '@angular/core';

// Best Tutorial
// https://hoshcoding.com/courses/1/angular-material-grid-list

// Also good
// https://ej2.syncfusion.com/angular/documentation/dashboard-layout/panels/position-sizing-of-panels/

// TODO: What is the "matches" argument?
@Component({
  selector: 'fund-focus',
  templateUrl: './fund_focus.component.html',
  styleUrls: ['./fund_focus.component.scss']
})
export class FundFocusComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = [
    { title: 'Fund Title', cols: 15, rows: 4 },
    { title: 'Graphs', cols: 15, rows: 16 },
    { title: 'Ticker', cols: 7.5, rows: 3 },
    { title: 'Price', cols: 7.5, rows: 3 },
    { title: 'Stats', cols: 15, rows: 9 },
    { title: 'Unknown Other', cols: 30, rows: 12 }
  ];
}
