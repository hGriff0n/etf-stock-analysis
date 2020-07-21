import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ReadOnlyDatabaseService, UserdataService } from '../../core/services';

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
  constructor(private user: UserdataService, private db: ReadOnlyDatabaseService) { }
  ngOnInit() {
    for (let plan of this.plan_options) {
      this.modifications[plan] = [];
    }
    this.categories = Object.keys(this.db.values["themes"]);
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

  // fund tracking
  brokerages = [ "Robinhood" ];
  avail_funds = 0;
  fract_shares = 0;

  // watchlist (todo)
  // TODO: Implement Watchlist (SND)

  // allocations
  // TODO: Collect from Userdata+Securitydata (FIRST)
  // TODO: Implement communication events in portfolio page
  // TODO: Need a UI to set desired allocation of categories
  // TODO: Holdings need to be scrunched slightly
  // TODO: Need holding information on over
  // TODO: More room between categories for something
  categories: Array<string>;
  equity: number = 0;
  getHoldingsInCategory(category: string): Array<string> {
    return this.db.values["themes"][category]["securities"];
  }
}


@Pipe({ name: 'evenodd' })
export class EvenOddPipe implements PipeTransform {
  transform(value:any[], filter: number) {
    if (!value || filter > 2 || filter < 0) {
      return value;
    }

    return value.filter((item, idx) => idx % 3 == filter);
  }
}
