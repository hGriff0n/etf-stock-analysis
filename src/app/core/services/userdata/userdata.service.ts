import { Injectable } from '@angular/core';
import { PluginsService } from '../plugins/plugins.service';
// import { RobinhoodService } from '../securitydata/robinhood/robinhood.service';
import { Observable, of, defer, from, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
// import { RobinhoodService } from '../securitydata/robinhood/robinhood.service';

/*
Service to track and provide user data and statistics to various components
 */

const desired_sectors = {
  'software': 0,
  'dividends': 0,
  'biotech': 0,
  'bets': 0,
  'consumer': 0,
  'hardware': 0,
  'earth/energy': 0,
  'esg': 0,
}

const configured_metrics = {
  fit: 0,
  expenses: 0,
  brokerage: 0,
  dividends: 0,
  concentration: 0,
}

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  // TODO: RobinhoodService doesn't work with typescript yet
    // Everything from algotrader will have the same issue
  constructor(private plugins: PluginsService, private config: ConfigService) {
    this.holdings = this.plugins.getHoldings();
  }

  getHoldings(symbol: string): Observable<Record<string, any>> {
    return this.holdings.pipe(map(holdings => {
      if (holdings[symbol]) {
        return holdings[symbol];
      }

      return {};
    }));
  }

  holdings: Observable<Record<string, any>>;
}
