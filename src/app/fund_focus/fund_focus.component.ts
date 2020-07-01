import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginsService } from '../core/services';

/*
Viewing portal to get information about a specific security

In particular, various graphs and statistics about the security will be presented to the user
  along with ui interactions to compare/purchase the funds in supported brokerages. The specific
  elements and information will be somewhat specialized based on whether the security is a
  stock or an etf. One example is the display of etf constituent information
 */

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

  constructor(private plugins: PluginsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route_sub = this.route.params.subscribe(params => {
      this.symbol = params['symbol']
      this.cards[0].title = this.symbol;
    });
  }

  ngOnDestroy() {
    this.route_sub.unsubscribe();
  }
}
