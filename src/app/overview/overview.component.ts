import { Component } from '@angular/core';

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
    { title: 'News', cols: 23, rows: 6 },
    { title: 'Graphs', cols: 23, rows: 18 }
  ];
}
