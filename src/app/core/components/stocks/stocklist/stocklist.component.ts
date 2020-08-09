import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { first } from 'rxjs/operators';
import { UserdataService, ReadOnlyDatabaseService } from '../../../services';
import { InPlaceEditorComponent } from '@syncfusion/ej2-angular-inplace-editor';
import { NumericTextBoxModel } from '@syncfusion/ej2-inputs';
import { Observable, BehaviorSubject } from 'rxjs';

// Container for HolderComponent that supports drag-and-drop stock movement and expansion
// Can be easily made more generic if needed in the future
@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.scss']
})
export class StocklistComponent implements OnInit {

  constructor(private userdata: UserdataService, private db: ReadOnlyDatabaseService) { }

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
      console.log(total);
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
    this.equity += event.equity
    this.weight = this.equity / this.total_value;
    this.change.emit(event);
  }

  enter(event) {
    this.equity += event.item.__ngContext__[8].equity;
    this.weight = this.equity / this.total_value;
  }

  exit(event) {
    this.equity -= event.item.__ngContext__[8].equity;
    this.weight = this.equity / this.total_value;
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
      this.change.emit({
        type: "set_theme",
        symbol: event.container.data[event.currentIndex].symbol,
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
      type: "set_allocation",
      theme: this.category,
      new_allocation: event.value,
    });
  }
}
