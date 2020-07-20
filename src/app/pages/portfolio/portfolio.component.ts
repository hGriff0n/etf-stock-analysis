import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

/*
Allows users to compare two different securities against each other

At the moment, this will only allow for etf comparisons as that is the principal
  goal of this project. Stock comparison will likely require a full rewrite as the
  "comparables" are not as easily reduced to a few values
*/

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    for (let plan of this.plan_options) {
      this.modifications[plan] = [];
    }
  }

  // Multiple plan support (deprecated for now)
  plan_options = [
    "Start New Plan",
    "Plan sds"
  ]
  selected_plan = "Start New Plan";
  changePlan(event) {
    console.log(event);
  }

  // git-style modifications
  modifications = {};
  addModification(event) {
    this.modifications[this.selected_plan].append(event);
  }

  // watchlist (todo)
  // TODO: Implement Watchlist (SND)

  // allocations
  // TODO: Collect from Userdata+Securitydata (FIRST)
  // TODO: Need a UI to set desired allocation of categories
  // TODO: Holdings need to be scrunched slightly
  // TODO: Need holding information on over
  // TODO: More room between categories for something
  categories = [
    "Earth/Energy", "Software", "ESG", "Hardware", "Biotech", "Dividends", "Bets", "Consumer", "Automated"
  ];
}


@Pipe({ name: 'evenodd' })
export class EvenOddPipe implements PipeTransform {
  transform(value:any[], filter:string) {
    if(!value || (filter !== 'even' && filter !== 'odd')) {
      return value;
    }
    return value.filter((item, idx) => filter === 'even' ? idx % 2 === 1 : idx % 2 === 0 );
  }
}
