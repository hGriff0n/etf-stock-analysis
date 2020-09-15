import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO: Construct test data
// Component which displays score information, grading portfolio (and maybe security?)
@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {

  constructor() { }

  @Input()
  size = 3;

  // TODO: How to incorporate color scheme?
  // colorScheme = {
    // domain: ['#cdb17e', '#19212a', '#716859', '#8c9496', '#463f38', '#8a8c94']
  // };
  ngOnInit() {
    this.data = this.testData
      .pipe(map(data => data.splice(0, this.size)));
  }

  data: Observable<Array<Record<string, any>>>;
  sub: any;

  testData = of([
    {
      "name": "Allocation",
      "value": "A",
    },
    {
      "name": "Brokerage Split",
      "value": "C-",
    },
    {
      "name": "Ann Dividends",
      "value": 36745,
    },
    {
      "name": "Expense Ratio",
      "value": 36240,
    },
    {
      "name": "Carbon Load",
      "value": 33000,
    },
    {
      "name": "Diversity",
      "value": "Italian",
    }
  ]);

}

// ngx-pie-grid
// ngx-number-cards
// ngx-gauge
