import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Best Tutorial
// https://hoshcoding.com/courses/1/angular-material-grid-list

// Also good
// https://ej2.syncfusion.com/angular/documentation/dashboard-layout/panels/position-sizing-of-panels/

// TODO: What is the "matches" argument?
@Component({
  selector: 'fund-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit, OnDestroy {
  // TODO: Enable utilizing subcomponents
  cards = [
    { title: 'Base Fund', cols: 11, rows: 4 },
    { title: 'Empty', cols: 8, rows: 4 },
    { title: 'Compare Fund', cols: 11, rows: 4 },
    { title: 'Graphical Comp', cols: 30, rows: 7 },
    { title: 'Details Comp', cols: 30, rows: 10 },
  ];

  base: string;
  replace: string;
  private route_sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route_sub = this.route.params.subscribe(params => {
      this.base = params['base']
      this.replace = params['replace']
      this.cards[0].title += " (" + this.base + ")";
      this.cards[2].title += " (" + this.replace + ")";
    });
  }

  ngOnDestroy() {
    this.route_sub.unsubscribe();
  }
}
