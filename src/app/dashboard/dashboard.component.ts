import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// Best Tutorial
// https://hoshcoding.com/courses/1/angular-material-grid-list

// Also good
// https://ej2.syncfusion.com/angular/documentation/dashboard-layout/panels/position-sizing-of-panels/

// TODO: What is the "matches" argument?
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      // If the screen is too small to show all cards (smaller than handset)
      // Then this will return a single column of cards (ie. mobile viewing)
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      // Otherwise returns the "desktop" viewing
      // TODO: Remove this as unnecessary (keep note in case I want to add it in later)
      // https://stackoverflow.com/questions/61449662/what-does-angular-materials-dashboard-schematic-boilerplate-code-do
      return [
        { title: 'Overview', cols: 9, rows: 4 },
        { title: 'Scoring', cols: 14, rows: 4 },
        { title: 'Holdings', cols: 7, rows: 28 },
        { title: 'News', cols: 22, rows: 6 },
        { title: 'Graphs', cols: 22, rows: 18 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
