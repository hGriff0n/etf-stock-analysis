import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// Container for HolderComponent that supports drag-and-drop stock movement and expansion
// Can be easily made more generic if needed in the future
@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.scss']
})
export class StocklistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.sub_holdings = this.holdings[this.category];
    if (!this.sub_holdings) {
      this.sub_holdings = [];
    }
  }

  // TODO: Move to observables/integrate with security/user-data
  @Input()
  category: string = "Earth & Energy";

  // TODO: Eventually this data will be pushed "up" from the sub-components
  holdings = {
    "Earth & Energy": [
      {
        symbol: "F",
        name: "Ford",
        held: 5,
        price: 24.53
      },
      {
        symbol: "SDG",
        name: "Sustainable",
        held: 7,
        price: 22.11
      },
      {
        symbol: "KRMA",
        name: "Karma",
        held: 3,
        price: 10
      },
      {
        symbol: "F",
        name: "Ford",
        held: 5,
        price: 24.53
      },
      {
        symbol: "SDG",
        name: "Sustainable",
        held: 7,
        price: 22.11
      },
      {
        symbol: "KRMA",
        name: "Karma",
        held: 3,
        price: 10
      },
      {
        symbol: "F",
        name: "Ford",
        held: 5,
        price: 24.53
      },
      {
        symbol: "SDG",
        name: "Sustainable",
        held: 7,
        price: 22.11
      },
      {
        symbol: "KRMA",
        name: "Karma",
        held: 3,
        price: 10
      }
    ],
    "Software": [
      {
        symbol: "GOOG",
        name: "Alphabet",
        held: 4,
        price: 100
      },
      {
        symbol: "QTUM",
        name: "Quantum ETF",
        held: 10,
        price: 30,
      },
      {
        symbol: "BEP",
        name: "Brookfield Energy",
        held: 4,
        price: 40
      }
    ]
  }
  sub_holdings: Array<Record<string, any>>;

  equity: number = 0;
  weight: number = 0;
  // TODO: How to calculate for styling
  initial_equity: number = 0;

  @Output()
  change: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

  onChange(event) {
    this.equity += event.delta
    // TODO: Send "change holdings" event through `change
  }

  enter(event) {
    this.equity += event.item.__ngContext__[8].equity;
  }
  exit(event) {
    this.equity -= event.item.__ngContext__[8].equity;
  }

  drop(event) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.exit(event);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      // TODO: Send "move to theme" event through change
    }
  }

}
