import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { first } from 'rxjs/operators';
import { UserdataService } from '../../../services';

// Container for HolderComponent that supports drag-and-drop stock movement and expansion
// Can be easily made more generic if needed in the future
@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.scss']
})
export class StocklistComponent implements OnInit {

  constructor(private userdata: UserdataService) { }

  ngOnInit(): void {
    // This will likely also go one level up (as it runs multiple times)
    // Though is there any actual extra "cost" in that?
    this.userdata.holdings.pipe(first()).subscribe(holdings => {
      this.sub_holdings = [];

      // TODO: The actual storage shouldn't need this hack
      let category = this.category.toLowerCase();
      for (let symbol of Object.keys(holdings)) {
        if (holdings[symbol]['robinhood']['sector'] == category) {
          this.sub_holdings.push({
            symbol: symbol
          })
        }
      }

      if (!this.sub_holdings) {
        this.sub_holdings = [];
      }
    });
  }

  @Input()
  category: string = "Earth & Energy";
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
