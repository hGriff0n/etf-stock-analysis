import { Injectable } from '@angular/core';
import { PluginsService } from '../plugins/plugins.service';
import { Observable, of, defer, from, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private plugins: PluginsService) {
    this.holdings = plugins.getHoldings();
    this.fit = this.holdings
      .pipe(map((holdings: Record<string, any>) => {
          return Object.keys(holdings).reduce((s, h) => {
            if (!(holdings[h]['robinhood']['sector'] in s)) {
              s[holdings[h]['robinhood']['sector']] = 0;
            }
            s[holdings[h]['robinhood']['sector']] += parseFloat(holdings[h]['robinhood']['equity']);
            return s;
          }, {})
      }))
      .pipe(map((sectors: Record<string, number>) => {
        let sum: number = Object.values(sectors).reduce((a: number, b: number) => a + b, 0);
        return Object.keys(sectors)
          .reduce((s, k: string) => {
            if (desired_sectors[k] == undefined) {
              console.log("Ignoring sector " + k + " as the expectations are undefined");
              return s;
            }
            return s + Math.abs(sectors[k] / sum - desired_sectors[k]);
          }, 0);
      }));
    this.scores = forkJoin([of(configured_metrics), this.fit])
      .pipe(map((results: [Record<string, any>, number]) => {
        results[0]['fit'] = results[1];
        return results[0];
      }));
  }

  private fit: Observable<number>;

  holdings: Observable<Record<string, any>>;
  scores: Observable<Record<string, any>>;
}
