import { Component, OnInit, Pipe, PipeTransform, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadOnlyDatabaseService, UserdataService } from '../../core/services';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

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
  constructor(private user: UserdataService, private db: ReadOnlyDatabaseService, public dialog: MatDialog) { }
  ngOnInit() {
    this.categories = Object.keys(this.db.values["themes"]);
    for (let symbol of this.db.values["watchlist"]) {
      this.watchlist.push({ symbol: symbol });
    }
  }

  // scorecard?
  // TODO: Hook up processors to actually update the values
  // TODO: Improve styling of values/labels
  // TODO: Introduce UI styling elements
    // multiple "pages", maybe in a carousel
  // TODO: Move into scorecard component
  scorecard = [
    {
      name: "Allocation",
      value: 1
    },
    {
      name: "Expense Ratio",
      value: 2
    },
    {
      name: "Dividend Yield",
      value: 3
    },
    {
      name: "Carbon Load",
      value: 4
    },
    {
      name: "ESG",
      value: 5
    },
    {
      name: "Geography",
      value: 6
    }
  ];
  colorScheme = {
    domain: ['#cdb17e', '#19212a', '#716859', '#8c9496', '#463f38', '#8a8c94']
  };
  scorecardLabelFormatting(c): string {
    return `${c.label}`
  }
  scorecardValueFormatting(c): string {
    return c.value.toLocaleString()
  }

  // git-style modifications
  // TODO: Enable "undo" behavior, at least theoretically
  modifications = [];
  addModification(event) {
    // Technically, we receive init events throughout the execution
    // However, for modification tracking they're only relevant at the start
    if (event.type == "init") {
      if (this.modifications.length == 0) {
        this.modifications[0] = {
          type: "initial_state",
          holdings: {}
        }

      }

      if (this.modifications.length == 1) {
        if (!(event.category in this.modifications[0].holdings)) {
          this.modifications[0].holdings[event.category] = [];
        }

        this.modifications[0].holdings[event.category].push({
          symbol: event.symbol,
          equity: event.equity,
          shares: event.held
        });
      }

    } else {
      this.modifications.push(event);
    }
  }

  // fund tracking
  // TODO: Implement add external (ie. GOOG) dialog
  // TODO: Need to split sold equity by broker
    // Need to figure out UI for representing this
  brokerages = ["Robinhood"];
  fract_shares = 0;
  funds = {
    added: 0,
    sold: 0,
    spent: 0,
    available: 0,
  }
  openAllocateFunds() {
    const dialogRef = this.dialog.open(AllocateFundsDialog, {
      width: '300px',
      data: { added_funds: this.funds.added, total_available: this.funds.available, spent: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addModification({
        type: "add_funds",
        amount: result.added_funds,
        old_amount: this.funds.added
      });

      this.funds.added = result.added_funds;
      this.funds.available = this.funds.added + this.funds.sold - this.funds.spent;
    });
  }
  openAddExternal() {
    console.log(this.modifications);
    const dialogRef = this.dialog.open(AddExternalDialog, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The AddExternalDialog was closed');
      console.log(result);
    });
  }
  private recalculateFunds() {
    this.funds.sold = 0;
    this.funds.spent = 0;
    for (let symbol of Object.keys(this.transactions)) {
      if (this.transactions[symbol].delta < 0) {
        this.funds.sold += this.transactions[symbol].delta * this.transactions[symbol].price;
      } else {
        this.funds.spent += this.transactions[symbol].delta * this.transactions[symbol].price;
      }
    }
    this.funds.available = this.funds.added + this.funds.sold - this.funds.spent;
    console.log(this.funds);
  }

  // watchlist
  // TODO: Rework 'app-holding' to work in watchlist and in allocation
    // Will also likely want theming in watchlist (ie. sub-grouping)
    // Will also want to be able to set "desired %" on allocation sub-holdings
  watchlist: Array<Record<string, any>> = [];

  addToWatchlist(event) {
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      // TODO: Send "move to watchlist" event through change
    }
  }

  // allocations
  // TODO: Hook up context menu events to actually work on individual holdings/etc. (FST)
    // How to buy shares from non-owned?
  // TODO: Was the context menu issue because *I* wasn't stopping the event? (SND)
    // Or rather should I make a "context" service and have components register into it
  // TODO: Improve UI density in stocklist components
    // Holding information can be scrunched a little bit more
    // Add some security information on holding hover
    // Add some extra category information to each theme
    // Add ability to annotate categories/holdings with "investment thesis" and priority
  newCategory(event) {
    event.stopPropagation();
    this.categories = [...this.categories, "undefined"];
    this.addModification({
      type: "new_category"
    });
  }
  categories: Array<string>;
  equity: number = 0;
  private total_equity = new BehaviorSubject<number>(0);
  equity_observable$: Observable<number> = this.total_equity.asObservable();
  transactions: Record<string, Record<string, any>> = {};
  getHoldingsInCategory(category: string): Array<string> {
    return this.db.values["themes"][category]["securities"];
  }
  onHoldingEvent(event) {
    // init - adding symbol to theme (init and drop)
    // buy - add shares to symbol
    // sell - remove shares from symbol
    // set_theme - setting theme (also removing item from symbol)?
    // console.log(event);
    if (event.type == "init") {
      this.equity += event.equity;
      this.total_equity.next(this.equity);
    }
    if (event.type == "buy" || event.type == "sell") {
      this.equity += (event.shares - event.remove) * event.price;
      this.total_equity.next(this.equity);
      this.transactions[event.symbol] = {
        delta: event.shares,
        price: event.price
      }

      console.log(this.transactions);
      this.recalculateFunds();
    }

    this.addModification(event);
  }

  // search support
  // TODO: Implement fund detection algorithm for searching
  // TODO: Implement news integration
  // TODO: Can't drag GOOG into watchlist/allocations
  possible_funds = ["GOOG"];
  news_articles = [];
}


@Pipe({ name: 'ternary' })
export class TernaryFilterPipe implements PipeTransform {
  transform(value: any[], filter: number) {
    if (!value || filter > 2 || filter < 0) {
      return value;
    }

    return value.filter((item, idx) => idx % 3 == filter);
  }
}

export interface AllocateFundsData {
  added_funds: number;
  total_available: number;
  spent: Record<string, number>;
}

// TODO: Add displays of division/etc.
@Component({
  selector: 'porfolio-allocate-funds-dialog',
  templateUrl: './allocate_funds_dialog.html'
})
export class AllocateFundsDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AllocateFundsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AllocateFundsData) { }

  ngOnInit() {
    let spent_funds = 0;
    this.graph_data = [];
    for (let broker of Object.keys(this.data.spent)) {
      this.graph_data.push({
        "name": broker,
        "value": this.data.spent[broker]
      });
      spent_funds += this.data.spent[broker];
    }
    if (spent_funds < this.data.total_available) {
      this.graph_data.push({
        "name": "unspent",
        "value": this.data.total_available - spent_funds
      });
    }
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data));
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  changeFunds() {
    console.log(this.data.added_funds);
  }

  colorScheme = {
    domain: ['#cdb17e', '#19212a', '#716859', '#8c9496', '#463f38', '#8a8c94']
  };
  showLabels = true;

  graph_data: Record<string, any>[] = [{ "name": "robinhood", "value": 150 }, { "name": "schwab", "value": 250 }, { "name": "unspent", "value": 27.5 }];
  update$ = new Subject<any>();
}

export interface AddExternalData { }

@Component({
  selector: 'porfolio-add-external-dialog',
  templateUrl: './add_external_dialog.html'
})
export class AddExternalDialog {
  constructor(
    public dialogRef: MatDialogRef<AddExternalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddExternalData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
