import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { first } from 'rxjs/operators';
import { UserdataService, ReadOnlyDatabaseService } from '../../../services';
import { InPlaceEditorComponent } from '@syncfusion/ej2-angular-inplace-editor';
import { NumericTextBoxModel, TextBoxModel } from '@syncfusion/ej2-inputs';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

// Container for HolderComponent that supports drag-and-drop stock movement and expansion
// Can be easily made more generic if needed in the future
@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.scss']
})
export class StocklistComponent implements OnInit {

  constructor(private userdata: UserdataService, private db: ReadOnlyDatabaseService, public dialog: MatDialog) { }

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
    });

    this.desired = this.db.values['themes'][this.category]["desired_allocation"];
    this.total_equity.subscribe(total => {
      this.total_value = total;
      this.weight = this.equity / this.total_value * 100;
    });
  }

  sub_holdings: Array<Record<string, any>>;

  @Input()
  category: string = "Earth & Energy";

  @Input()
  total_equity: BehaviorSubject<number>;
  desired: number = 0;

  equity: number = 0;
  private total_value: number = 0;
  weight: number = 0;

  @Output()
  change: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

  onChange(event) {
    if (event.type == "init") {
      this.equity += event.equity;
    } else {
      this.equity += event.delta * event.price;
    }
    this.weight = this.equity / this.total_value * 100;

    event["category"] = this.category;
    this.change.emit(event);
  }

  enter(event) {
    this.equity += event.item.__ngContext__[8].equity;
    this.weight = this.equity / this.total_value * 100;
  }

  exit(event) {
    this.equity -= event.item.__ngContext__[8].equity;
    this.weight = this.equity / this.total_value * 100;
  }

  drop(event) {
    // TODO: Moving from search is "technically" more complicated than this (fund could be in other theme already)
    if (event.previousContainer.element.nativeElement.classList.value.indexOf("search-results") != -1) {
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.change.emit({
        type: "set_theme",
        symbol: event.container.data[event.currentIndex].symbol,
        category: this.category
      });
      event.container.data[event.currentIndex] = { symbol: event.container.data[event.currentIndex] };

    } else if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.exit(event);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.change.emit({
        type: "set_theme",
        symbol: event.container.data[event.currentIndex].symbol,
        category: this.category
      });
    }
  }

  @ViewChild('numericTextBox')
  public numericTextBoxObj: InPlaceEditorComponent;

  public numericTextBoxModel: NumericTextBoxModel = {
    format: 'n2',
    placeholder: 'Shares',
    min: 0,
    showClearButton: false,
    showSpinButton: false,
    change: event => this.onAllocationChange(event),
  };

  onAllocationChange(event) {
    this.change.emit({
      type: "set_desired_weight",
      theme: this.category,
      new_allocation: event.value,
    });
  }

  @ViewChild('categoryTextBox')
  public categoryTextBoxObj: InPlaceEditorComponent;

  public categoryTextBoxModel: TextBoxModel = {
    change: event => this.setCategoryName(event),
  };

  setCategoryName(event) {
    this.change.emit({
      type: "set_category_name",
      old_name: this.category,
      new_name: event.value
    });
    this.category = event.value;
  }

  // TODO: These require a different data model, it's not possible in the current approach
  showContextMenu(event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(StocklistContextMenu, {
      width: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "Sort": {
          console.log("TODO: Sort");
          break;
        }
        case "Sell All": {
          console.log("TODO: Sell All");
          break;
        }
        case "Delete": {
          console.log("TODO: Delete");
          break;
        }
        default: {break;}
      }
      console.log("Stocklist Context Menu");
      console.log(result);
    })
  }
}


@Component({
  selector: 'stocklist_context_menu',
  templateUrl: './context_menu.html'
})
export class StocklistContextMenu {
  constructor(
    public dialogRef: MatDialogRef<StocklistContextMenu>) { }

  select(event) {
    this.dialogRef.close(event.srcElement.innerText);
  }

  stocklist_menu = [
    { text: "Sort" },
    { text: "Sell All" },
    { text: "Delete" }
  ];

}
