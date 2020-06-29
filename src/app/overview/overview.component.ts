import { Component, OnInit } from '@angular/core';
import { PluginsService } from '../core/services';
import { Observable, of, defer, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  // TODO: Might want to support mobile in future (or ay least dynamic sizing)
  cards = [
    { title: 'Overview', cols: 9, rows: 4 },
    { title: 'Scoring', cols: 14, rows: 4 },
    { title: 'Holdings', cols: 7, rows: 28 },
    { title: 'News', cols: 23, rows: 6 },
    { title: 'Graphs', cols: 23, rows: 18 }
  ];

  // TODO: Rework organization of elements
  // Add "expansion" behavior to see holdings per-brokerage
  // SYMBOL (name)     $equity  [page]
  //   robinhood: #shares  cost basis
  constructor(private plugins: PluginsService) {
    this.holdings = this.plugins.getHoldings()
      .pipe(map(data => {
        let holding_cache = {};
        for (let symbol in data) {
          holding_cache[symbol] = { price: '', quantity: 0, equity: '', type: '', name: '' };
          for (let plugin in data[symbol]) {
            holding_cache[symbol].quantity += parseFloat(data[symbol][plugin]['quantity']);
            if (!(holding_cache[symbol].type)) {
              holding_cache[symbol].type = data[symbol][plugin]['type'];
              holding_cache[symbol].name = data[symbol][plugin]['name'];
              holding_cache[symbol].price = parseFloat(data[symbol][plugin]['price']);
            }
          }

          holding_cache[symbol].equity = (holding_cache[symbol].price * holding_cache[symbol].quantity).toFixed(2);
          holding_cache[symbol].price = holding_cache[symbol].price.toFixed(2);
          holding_cache[symbol].quantity = holding_cache[symbol].quantity.toFixed(2);
        }

        return holding_cache;
      }));
  }

  // TODO: Move to a separate "Brokerage" service
  holdings: Observable<Record<string, any>>;

  ngOnInit() {
    // this.holdings = this.get_holdings();
  }
}
