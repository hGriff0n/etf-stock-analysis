import { Component, Output } from '@angular/core';
import { PluginsService } from '../core/services';

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

  // TODO: Load all holdings
  // TODO: Replace holdings title with search bar
  // TODO: Rework organization of elements
    // Add "expansion" behavior to see holdings per-brokerage
    // SYMBOL (name)     $equity  [page]
    //   robinhood: #shares  cost basis
  test_holdings = {
    'MSFT': { quantity: 10, name: 'Microsoft', type: 'stock', price: 43.52, equity: 435.2 },
    'GOOG': { quantity: 10, name: 'Alphabet', type: 'stock', price: 352.4, equity: 3524 },
    'F': { quantity: 10, name: 'Ford', type: 'stock', price: 5.234, equity: 52.34 },
  }

  constructor(private plugins: PluginsService) {}

  // TODO: Move to a separate "Brokerage" service
  holdings() {
    let holdings = this.plugins.getHoldings();
    let holding_cache = {};
    for (let symbol in holdings) {
      holding_cache[symbol] = { price: 0, quantity: 0, equity: 0, type: '', name: '' };
      for (let plugin in holdings[symbol]) {
        console.log(holdings[symbol][plugin])
        holding_cache[symbol].quantity += parseFloat(holdings[symbol][plugin]['quantity']);

        if (!(holding_cache[symbol].type)) {
          holding_cache[symbol].type = holdings[symbol][plugin]['type'];
          holding_cache[symbol].name = holdings[symbol][plugin]['name'];
          holding_cache[symbol].price = parseFloat(holdings[symbol][plugin]['price']);
        }
      }
      holding_cache[symbol].equity = holding_cache[symbol].price * holding_cache[symbol].quantity;
    }
    return holding_cache;
  }
}
