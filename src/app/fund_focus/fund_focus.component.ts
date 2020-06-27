import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
export class FundFocusComponent implements OnInit, OnDestroy {
  // TODO: Enable utilizing subcomponents
  cards = [
    { title: 'Fund Title', cols: 15, rows: 4 },
    { title: 'Graphs', cols: 15, rows: 16 },
    { title: 'Ticker', cols: 7, rows: 3 },
    { title: 'Price', cols: 8, rows: 3 },
    { title: 'Stats', cols: 15, rows: 9 },
    { title: 'Unknown Other', cols: 30, rows: 12 }
  ];

  symbol: string;
  private route_sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route_sub = this.route.params.subscribe(params => {
      this.symbol = params['symbol']
      this.cards[0].title += " (" + this.symbol + ")";
    });
  }

  ngOnDestroy() {
    this.route_sub.unsubscribe();
  }
}
