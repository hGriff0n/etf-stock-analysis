import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// Best Tutorial
// https://hoshcoding.com/courses/1/angular-material-grid-list

// Also good
// https://ej2.syncfusion.com/angular/documentation/dashboard-layout/panels/position-sizing-of-panels/

// TODO: What is the "matches" argument?
@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  /** Based on the screen size, switch from standard to one column per row */
  // TODO: Might want to support mobile in future (or ay least dynamic sizing)
  cards = [
    { title: 'Overview', cols: 9, rows: 4 },
    { title: 'Scoring', cols: 14, rows: 4 },
    { title: 'Holdings', cols: 7, rows: 28 },
    { title: 'News', cols: 22, rows: 6 },
    { title: 'Graphs', cols: 22, rows: 18 }
  ];

  constructor(private breakpointObserver: BreakpointObserver) { }
}
