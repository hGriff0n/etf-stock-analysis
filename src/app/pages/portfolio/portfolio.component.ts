import { Component, OnInit, Pipe, PipeTransform, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadOnlyDatabaseService, UserdataService } from '../../core/services';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { of, Observable, BehaviorSubject } from 'rxjs';

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
  // TODO: Find something for remaing two "header" boxes
  constructor(private user: UserdataService, private db: ReadOnlyDatabaseService, public dialog: MatDialog) { }
  ngOnInit() {
    for (let plan of this.plan_options) {
      this.modifications[plan] = [];
    }
    this.categories = Object.keys(this.db.values["themes"]);
    for (let symbol of this.db.values["watchlist"]) {
      this.watchlist.push({ symbol: symbol });
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
  // TODO: Moving holdings should sell everything
  // TODO: How to differentiate changing themes from init?
  modifications = {};
  addModification(event) {
    this.modifications[this.selected_plan].append(event);
  }

  // fund tracking
  // TODO: Implement fund allocation dialog
  // TODO: Implement add external (ie. GOOG) dialog
  brokerages = [ "Robinhood" ];
  avail_funds = 0;
  fract_shares = 0;
  total_spent = 0;
  openAllocateFunds() {
    const dialogRef = this.dialog.open(AllocateFundsDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The AllocateFundsDialog was closed");
      console.log(result);
    });
  }
  openAddExternal() {
    const dialogRef = this.dialog.open(AddExternalDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The AddExternalDialog was closed');
      console.log(result);
    });
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
  // TODO: Add interaction buttons to allocation/holding components (ie. set allocation/etc.)
    // Integrate with event system
  // TODO: Improve UI density in stocklist components
    // Holding information can be scrunched a little bit more
    // Add some security information on holding hover
    // Add some extra category information to each theme
  // TODO: Add context menu support for moving holdings
  categories: Array<string>;
  equity: number = 0;
  private total_equity = new BehaviorSubject<number>(0);
  equity_observable$: Observable<number> = this.total_equity.asObservable();
  getHoldingsInCategory(category: string): Array<string> {
    return this.db.values["themes"][category]["securities"];
  }
  onHoldingEvent(event) {
    // init - adding symbol to theme (init and drop)
    // buy - add shares to symbol
    // sell - remove shares from symbol
    // set_theme - setting theme (also removing item from symbol)?
    console.log(event);
    if (event.type == "init") {
      this.equity += event.equity;
      console.log("Placing " + this.equity);
      this.total_equity.next(this.equity);
    }
  }

  // search support
  // TODO: Implement fund detection algorithm
  // TODO: Implement news integration
  possible_funds = ["GOOG"];
  news_articles = [];
}


@Pipe({ name: 'ternary' })
export class TernaryFilterPipe implements PipeTransform {
  transform(value:any[], filter: number) {
    if (!value || filter > 2 || filter < 0) {
      return value;
    }

    return value.filter((item, idx) => idx % 3 == filter);
  }
}

export interface AllocateFundsData {}

@Component({
  selector: 'porfolio-allocate-funds-dialog',
  templateUrl: './allocate_funds_dialog.html'
})
export class AllocateFundsDialog {
  constructor(
    public dialogRef: MatDialogRef<AllocateFundsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AllocateFundsData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface AddExternalData {}

@Component({
  selector: 'porfolio-add-external-dialog',
  templateUrl: './add_external_dialog.html'
})
export class AddExternalDialog {
  constructor(
    public dialogRef: MatDialogRef<AddExternalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddExternalData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
