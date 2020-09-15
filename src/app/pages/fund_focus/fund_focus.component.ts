import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PluginsService, SecuritydataService, UserdataService } from '../../core/services';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { News } from 'node-iex-cloud/lib/types';
import { MatDialog } from '@angular/material/dialog';
import { SwitchFundDialog } from '../../core/components/funddesc/funddesc.component';

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

  changeFund() {
    const dialogRef = this.dialog.open(SwitchFundDialog, {
      width: '300px',
      data: { fund: this.symbol }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.fund != this.symbol) {
        console.log(`Navigating to ${result.fund}`);
        this.router.navigate([`/fund-focus/${result.fund}`]);
      }
      console.log(result.fund);
    });
  }

  symbol: string;
  private route_sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private data: SecuritydataService, private user: UserdataService, public dialog: MatDialog) {
    // TODO: This needs to be a multi-way communication
    // this.themes = this.user.themes;
    this.themes = [];
    // console.log(this.themes);
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // Tagging functionality
  themes: string[];
  selected_theme: string;
  setTheme(event) {
    if (event.value == this.NEW_THEME_SELECTOR_VALUE) {
      // MatDialog
      return;
    }

    this.selected_theme = event.value;
  }

  is_etf_fund: Observable<boolean>;

  // TODO: Turn into a "fund" object? (to do all of this setup automatically)
  // Title card
  fund_name: Observable<string>;
  description: Observable<string>;
  url: Observable<string>;

  // Price card
  quote: Observable<Record<string, any>>;
  price: Observable<number>;
  day_change: Observable<string>;
  day_change_pct: Observable<string>;
  year_change: Observable<string>;
  bid_price: Observable<number>;
  bid_quantity: Observable<number>;
  ask_price: Observable<number>;
  ask_quantity: Observable<number>;

  //
  pe_ratio: Observable<number>;
  volume: Observable<number>;
  avg_volume: Observable<number>;
  // industry
  // sector

  // DIVIDENDS (10)
  // amount
  // recordDate

  // EARNINGS (1000)
  // actualEPS / consensusEPS / fiscalPeriod
  // yearAgo / yearAgoChangePct

  // ADV STATS (paid only)
  // EBITDA
  // beta
  // currentDebt / grossProfit
  // debtToEquity / revenuePerEmployee
  // profitMargin
  // pegRatio
  // putCallRatio
  // priceToBook / priceToSales
  // enterpriseValueToRevenue

  // To randomize cards, need to make a new type that has a news subobject, plus row/col
  news: Observable<News[]>;

  stats_table = [
    { stat: 'P/E Ratio', value: 0 },
    { stat: 'Volume', value: 1 },
    { stat: 'Industry', value: 'Telecommunications Equipment' },
    { stat: 'Sector', value: 'Electronic Technology' },
    { stat: 'Latest Dividend', value: '$0.02 on Feb 24th, 2019' }
  ]

  displayed_columns = ['symbol', 'name', 'weight']
  constituents = [
    { ticker: 'VVV', name: 'VVV Corp', weight: '5' },
    { ticker: 'AAA', name: 'AAA Corp', weight: '4' },
    { ticker: 'BBB', name: 'BBB Corp', weight: '8' },
    { ticker: 'CCC', name: 'CCC Corp', weight: '5' },
  ]


  ngOnInit() {
    this.route_sub = this.route.params.subscribe(params => {
      this.symbol = params['symbol'];

      let company = this.data.company(this.symbol);
      this.fund_name = company.pipe(map(s => s['companyName']));
      this.description = company.pipe(map(s => s['description']));
      this.is_etf_fund = company.pipe(map(s => s['issueType'] == 'et' || s['issueType'] == 'te'));
      this.url = company.pipe(map(s => s['website']));

      let quote = this.data.quote(this.symbol);
      this.price = quote.pipe(map(s => s['latestPrice']));
      this.day_change = quote.pipe(map(s => s['change'].toFixed(2)));
      this.day_change_pct = quote.pipe(map(s => (s['changePercent'] * 100).toFixed(2)));
      this.year_change = quote.pipe(map(s => (s['ytdPercent'] || 0).toFixed(2)));
      this.volume = quote.pipe(map(s => s['volume']));
      this.avg_volume = quote.pipe(map(s => s['avgTotalVolume']));
      this.bid_price = quote.pipe(map(s => s['iexBidPrice']));
      this.bid_quantity = quote.pipe(map(s => s['iexBidSize']));
      this.ask_price = quote.pipe(map(s => s['iexAskPrice']));
      this.ask_quantity = quote.pipe(map(s => s['iexAskSize']));

      this.news = this.data.news(this.symbol, 10);
    });
  }

  ngOnDestroy() {
    this.route_sub.unsubscribe();
  }

  // options for the chart
  timeline = true;
  colorScheme = {
    domain: ['#cdb17e', '#19212a', '#716859', '#8c9496', '#463f38', '#8a8c94']
  };
  //pie
  showLabels = true;
  // data goes here
  public single = [
    {
      "name": "Germany",
      "value": 40632,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "United States",
      "value": 50000,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "France",
      "value": 36745,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "United Kingdom",
      "value": 36240,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "Spain",
      "value": 33000,
      "extra": {
        "code": "es"
      }
    },
    {
      "name": "Italy",
      "value": 35800,
      "extra": {
        "code": "it"
      }
    }
  ];
}
