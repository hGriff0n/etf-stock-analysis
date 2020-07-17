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
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
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
      "name": "Spain",
      "value": 33000,
    },
    {
      "name": "Italy",
      "value": "Italian",
    }
  ]);

}

// ngx-pie-grid
// ngx-number-cards
// ngx-gauge
