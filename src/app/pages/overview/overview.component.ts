import { Component, OnInit } from '@angular/core';
import { PluginsService, UserdataService } from '../../core/services';
import { Observable, of, defer, from, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

/*
Home page for the user

Various "at-a-glance" pieces of information are shown to the user to give them
  a sense of how their portfolio is operating. Either via a set of graphs displaying
  portfolio allocations, a set of user-configured metrics measuring porfolio "fitness",
  or a list of the raw holdings the user has
*/

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

  search_results: Object;
  searchTerm$ = new Subject<string>();

  constructor(private plugins: PluginsService, private userdata: UserdataService, private router: Router/*, private search: SearchService*/) {
    this.holdings = this.plugins.getHoldings()
      // TODO: This should probably be (mostly) done in the plugins
      // Could have cache and recalculate when any "brokerage" link changes
      .pipe(map(data => {
        let holding_cache = {};
        console.log(data);

        for (let symbol of Object.keys(data)) {
            holding_cache[symbol] = { price: '', quantity: 0, equity: '', type: '', name: '' };
            for (let plugin in data[symbol]) {
              holding_cache[symbol].quantity += parseFloat(data[symbol][plugin].quantity);
              if (!holding_cache[symbol].type) {
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

    // this.search.search(this.searchTerm$)
    //   .subscribe(results => { this.search_results = results; });

    // TODO: This should be dynamic
    // this.scores = this.userdata.scores;
    // this.scores = this.userdata.scores;
  }

  // TODO: Move to a separate "Brokerage" service
  holdings: Observable<Record<string, any>>;
  scores: Observable<Record<string, any>>;

  ngOnInit() {
    // this.holdings = this.get_holdings();
  }

  // options for the chart
  timeline = true;
  colorScheme = {
    domain: ['#cdb17e', '#19212a', '#716859', '#8c9496', '#463f38', '#8a8c94']
  };

  //pie
  showLabels = true;
  // data goes here
public single =[
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
