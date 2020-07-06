import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginsService, SecuritydataService, UserdataService } from '../core/services';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

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
  NEW_THEME_SELECTOR_VALUE = '___new_theme___';

  // TODO: Enable utilizing subcomponents
  cards = [
    { title: 'Fund Title', cols: 15, rows: 4 },
    { title: 'Graphs', cols: 15, rows: 16 },
    { title: 'Ticker', cols: 13, rows: 3 },
    { title: 'Price', cols: 2, rows: 3 },
    { title: 'Stats', cols: 15, rows: 9 },
    { title: 'Unknown Other', cols: 30, rows: 12 }
  ];

  symbol: string;
  private route_sub: any;

  constructor(private plugins: PluginsService, private route: ActivatedRoute, private data: SecuritydataService, private user: UserdataService) {
    // TODO: This needs to be a multi-way communication
    this.themes = this.user.themes();
    console.log(this.themes);
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // Tagging functionality
  themes: string[];
  selected_theme: string;
  setTheme(event) {
    console.log(event.value);
    if (event.value == this.NEW_THEME_SELECTOR_VALUE) {
      // MatDialog
      return;
    }

    this.selected_theme = event.value;
  }

  is_etf_fund: Observable<boolean>;

  // Title card
  fund_name: Observable<string>;
  description: Observable<string>;
  url: Observable<string>;

  // Price card
  quote: Observable<Record<string, any>>;
  price: Observable<number>;
  day_change: Observable<number>;
  year_change: Observable<number>;
  bid_price: Observable<number>;
  bid_quantity: Observable<number>;
  ask_price: Observable<number>;
  ask_quantity: Observable<number>;

  //
  pe_ratio: Observable<number>;
  volume: Observable<number>;
  avg_volume: Observable<number>;

  ngOnInit() {
    this.route_sub = this.route.params.subscribe(params => {
      this.symbol = params['symbol'];

      let company = this.data.company(this.symbol);
      this.fund_name = company.pipe(map(s => s['companyName']));
      this.description = company.pipe(map(s => s['description']));
      this.is_etf_fund = company.pipe(map(s => s['issueType'] == 'et'));
      this.url = company.pipe(map(s => s['website']));

      let quote = this.data.quote(this.symbol);
      // This isn't running????
      this.price = quote.pipe(map(s => {
        console.log(s);
        return s['latestPrice'];
      }));
      this.day_change = quote.pipe(map(s => s['changePercent']));
      this.year_change = quote.pipe(map(s => s['ytdPercent']));
      this.price = quote.pipe(map(s => s['volume']));
      this.avg_volume = quote.pipe(map(s => s['avgTotalVolume']));
      this.bid_price = quote.pipe(map(s => s['iexBidPrice']));
      this.bid_quantity = quote.pipe(map(s => s['iexBidSize']));
      this.ask_price = quote.pipe(map(s => s['iexAskPrice']));
      this.ask_quantity = quote.pipe(map(s => s['iexAskSize']));
    });
  }

  ngOnDestroy() {
    this.route_sub.unsubscribe();
  }
}
