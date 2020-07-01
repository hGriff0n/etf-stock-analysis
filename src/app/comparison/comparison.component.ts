import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginsService } from '../core/services';

/*
Allows users to compare two different securities against each other

At the moment, this will only allow for etf comparisons as that is the principal
  goal of this project. Stock comparison will likely require a full rewrite as the
  "comparables" are not as easily reduced to a few values
*/

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

  constructor(private plugins: PluginsService, private route: ActivatedRoute) {}

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
