import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginsService, SecuritydataService } from '../../core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
Allows users to compare two different securities against each other

At the moment, this will only allow for etf comparisons as that is the principal
  goal of this project. Stock comparison will likely require a full rewrite as the
  "comparables" are not as easily reduced to a few values
*/

@Component({
  selector: 'fund-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit, OnDestroy {
  // TODO: Enable utilizing subcomponents
  cards = [
    { title: 'Base Fund', cols: 15, rows: 4 },
    { title: 'Compare Fund', cols: 15, rows: 4 },
    { title: 'Graphical Comp', cols: 30, rows: 7 },
    { title: 'Details Comp', cols: 30, rows: 10 },
  ];

  base: string;
  replace: string;
  base_fund: Fund;
  comp_fund: Fund;
  private route_sub: any;

  constructor(private plugins: PluginsService, private route: ActivatedRoute, private data: SecuritydataService) { }

  test(event) {
    console.log(event);
  }

  ngOnInit() {
    this.route_sub = this.route.params.subscribe(params => {
      this.base = params['base'];
      this.base_fund = new Fund(this.base, this.data);

      this.replace = params['replace'];
      this.comp_fund = new Fund(this.replace, this.data);

      this.cards[0].title += " (" + this.base + ")";
      this.cards[2].title += " (" + this.replace + ")";
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

class Fund {
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

  constructor(symbol: string, private data: SecuritydataService) {
    let company = this.data.company(symbol);
    this.fund_name = company.pipe(map(s => s['companyName']));
    this.description = company.pipe(map(s => s['description']));
    this.url = company.pipe(map(s => s['website']));

    let quote = this.data.quote(symbol);
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
  }
}
